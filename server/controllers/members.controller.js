const config = require('../config');
const Member = require('../models/MemberModel');
const User = require('../models/UserModel');
const Bill = require('../models/BillModel');
const Group = require('../models/GroupModel');
var ObjectId = require('mongodb').ObjectID;

// Method to get members which are in same group as current user
module.exports.getAll = async (req, res) => {
  // Get req.userId from header token
  const member = await Member.find({'user_id':req.userId});
  let groupIds = []; 
  for (let m of member){
    groupIds.push(m.group_id);
  }
  
  try{
    // Fetch members info of groups having current user as a member
    const groups = await Member.aggregate([
      { "$match" : { group_id : {$in: groupIds} }}, // Only match the groups in which user is a member
      {
        $lookup: {
          "from": "groups",
          "localField": "group_id",
          "foreignField": "_id",
          as: "groups"
        }
      },
      {
        $lookup: {
          "from": "users",
          "localField": "user_id",
          "foreignField": "_id",
          as: "users"
        }
      },
      {
        $unwind: "$groups"
      },
      {
        $unwind: "$users"
      },
      {
        $group: {
          _id: "$groups._id",
          group_name: {
            $first: "$groups.name"
          },
          user_info: {
            $addToSet: {
              name: "$users.name",
              _id: "$users._id",
            }
          }
        }
      }
    ]);
    console.log(groups);
    res.status(200).json(groups);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch group');
  }
}

// Method to fetch specific member
module.exports.search = async (req, res) => {
  const { email, group_id } = req.body;
  console.log(email, group_id)
  
  try{
    const user = await User.aggregate([
      {
        "$match": {
          email: {
            $regex: email +'.*'
          }
        }
      },
      {
        $lookup: {
          from: "members",
          let: {
            user_id: "$_id"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: [
                        ObjectId(group_id),
                        "$group_id"
                      ]
                    },
                    {
                      $eq: [
                        "$$user_id",
                        "$user_id"
                      ]
                    }
                  ]
                }
              }
            }
          ],
          as: "members"
        }
      },
      { 
        // Specifying which fields to return
        $project : { 
            name: 1, 
            email : 1, 
            "members.group_id" : 1,
            "members.user_id" : 1  
          } 
        }
    ]);

    res.status(200).json(user);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('No user found with specified email');
  }
}

// Method to add new member
module.exports.create = async (req, res) => {
  const { user_id, group_id } = req.body;
  console.log(user_id, group_id);
  
  const memberExists = await Member.find({'user_id':user_id, 'group_id':group_id});
  
  if(memberExists.length > 0){
    return res.status(200).json({'msg': 'Member already exists in this group'});
  }

  const member = new Member({
      user_id, 
      group_id
  });
  try {
      const data = await member.save();
      const user = await User.findById(user_id);
      console.log("user",user.name)
      // Send response if success
      res.status(201).json({
        user_id:data.user_id,
        group_id:data.group_id,
        name: user.name,
        email: user.email
      });
    } catch (error) {
      console.log(error);
      res.status(400).send('Failed to create member');
    }
};

// Method to update member
/*module.exports.update = async (req, res) => {
  const { name, description } = req.body;
  console.log(name, description);
  
  const group = {
    name: name,
    description: description,
    updatedAt: Date.now(),
  };
  
  try {
    const upGroup = await Group.findByIdAndUpdate({'_id':req.params.id}, group, {new: true, useFindAndModify: false});
    // Send response if success
    res.status(200).json({
      name:upGroup.name,
      description:upGroup.description,
      groupId: upGroup.id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send('Failed to update group');
  }
};*/

// Method to delete member
module.exports.delete = async (req, res) => {
  const member = await Member.findByIdAndDelete(req.params.id);
  console.log(member.group_id);

  try{
    if(!member){
      return res.status(404).send({'msg': 'No member found'});
    }
    // Delete bill paid by that member if member is deleted
    await Bill.deleteMany({'member_id':req.params.id, 'group_id':member.group_id});
    res.status(200).json({'msg':'Member deleted successfully'});
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to delete member');
  }
}
