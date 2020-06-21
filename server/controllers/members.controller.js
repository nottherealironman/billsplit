const config = require('../config');
const Member = require('../models/MemberModel');
const User = require('../models/UserModel');
const Bill = require('../models/BillModel');

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
    const users = await Member.aggregate([
      {
          $match : { group_id : {$in: groupIds} }
      },
      {
        //right outer join
              $lookup : {
                from: 'users',
                localField: "user_id",
                foreignField: "_id",
                as: "user_info"
              }
      }
    ]);
    console.log(users);
    res.status(200).json(users);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch group');
  }
}

// Method to fetch specific member
/*module.exports.getOne = async (req, res) => {
  console.log(req.params.id)
  const member = await Member.find({'user_id':req.params.id});
  console.log(member);
  try{
    res.status(200).json(member);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch member');
  }
}*/

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
      // Send response if success
      res.status(201).json({
        user_id:data.user_id,
        group_id:data.group_id,
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
