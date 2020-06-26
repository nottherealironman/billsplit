const config = require('../config');
const Group = require('../models/GroupModel');
const Member = require('../models/MemberModel');
const Bill = require('../models/BillModel');

// Method to get groups where current user is a member
module.exports.getAll = async (req, res) => {
  // Get req.userId from header token
  const member = await Member.find({'user_id':req.userId});
  let groupIds = []; 
  for (let m of member){
    groupIds.push(m.group_id);
  }
  // Fetch groups which has current user as a member
  const groups = await Group.find({_id : {$in: groupIds}});
  
  try{
    res.status(200).json(groups);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch groups');
  }
}

// Method to fetch specific group
module.exports.getOne = async (req, res) => {
  console.log(req.params.id)
  const group = await Group.find({'_id':req.params.id});
  console.log(group);
  try{
    res.status(200).json(group);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch group');
  }
}

// Method to create new group
module.exports.create = async (req, res) => {
  const { name, description } = req.body;
  console.log(name, description);
  const userId = req.userId;
  const group = new Group({
      name, 
      description,
      owner_id:userId
  });
  try {
      const data = await group.save();
      /*Add the creator of group to the member collection also
      That means if I created a group then i would be the first member in it*/
      
      const member = new Member({user_id:userId, group_id:data._id});
      await member.save();
      // Send response if success
      res.status(200).json(data);
  } catch (error) {
      console.log(error);
      res.status(400).send('Failed to create group');
 }
};

// Method to update group
module.exports.update = async (req, res) => {
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
};

// Method to delete group
module.exports.delete = async (req, res) => {
  const group = await Group.findByIdAndDelete(req.params.id);
  // Delete member and bill if group is deleted
  await Member.deleteMany({'group_id':req.params.id});
  await Bill.deleteMany({'group_id':req.params.id});
  console.log(req.params.id);

  try{
    if(!group){
      res.status(404).send('No group found');
    }
    res.status(200).json({'msg': 'Deleted successfully'});
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch group');
  }
}
