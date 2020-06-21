const config = require('../config');
const Bill = require('../models/BillModel');
const Member = require('../models/MemberModel');

// Method to get all bills
module.exports.getAll = async (req, res) => {
  const bills = await Bill.find();
  console.log(bills);
  try{
    res.status(200).json(bills);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch bill');
  }
}

// Method to get member of particular group
module.exports.getGroupMember = async (req, res) => {
  //console.log('hello')
  console.log(req.params.group_id)
  const group_members = await Member.find({'group_id':req.params.group_id});
  console.log(group_members);
  try{
    res.status(200).json(group_members);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch group members');
  }
}

// Method to add new bill
module.exports.add = async (req, res) => {
  const { title, amount, group_id, member_id } = req.body;
  console.log(title, amount, group_id, member_id);
  
  const bill = new Bill({
      title, amount, group_id, member_id
    });
    try {
      const data = await bill.save();
      // Send response if success
      res.status(200).json({
        title: data.title, 
        amount: data.amount, 
        group_id: data.group_id, 
        member_id: data.member_id,
        bill_id:data._id,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send('Failed to create bill');
    }
};

// Method to delete bill
module.exports.delete = async (req, res) => {
  const bill = await Bill.findByIdAndDelete(req.params.id);
  console.log(bill);

  try{
    if(!bill){
      res.status(404).send('No bill found');
    }
    res.status(200).json(bill);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch bill');
  }
}
