const config = require('../config');
const Bill = require('../models/BillModel');
const Member = require('../models/MemberModel');
const Group = require('../models/GroupModel');

// Method to get the summary of each group
module.exports.getGroupSummary = async (req, res) => {
  const groups = await Group.find();
  
  try{
      var group_summary = [];
      //groups.forEach(function (val, key) {
      for (const val of groups){
        var group = {};
        group['id'] = val._id;
        group['group_name'] = val.name;
        
        const bill = Bill.aggregate([
        {
          $match : { group_id: val._id }
        },
        {
          $group : {
             _id:null,
             total :{
              $sum:'$amount'
             }
          }
        }
        ]);
        group['total'] = 0;
        for await (const b of bill) {
          console.log(b.total);
          group['total'] = b.total;
        }
        
        group_summary.push(group);
    }
    res.status(200).json(group_summary);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch groups');
  }
}

// Method to get details of particular group
module.exports.getGroupDetails = async (req, res) => {
  const members = await Member.find({'group_id':req.params.group_id});
  try{
    var member_summary = [];
    for await (const member of members){
      var mem = {};
      mem['id'] = member._id;
      mem['name'] = member.name;
      mem['amount'] = 0;
      const bill = Bill.aggregate([
        {
          $match : { member_id: member._id }
        },
        {
          $group : {
             _id:null,
             amount :{
              $sum:'$amount'
             }
          }
        }
      ]);
      for await (const b of bill) {
        mem['amount'] = b.amount;
      }
      member_summary.push(mem);
    }
    // Calculate average amount spent in a group
    var average = member_summary.reduce(function(a, b){
      return a + b.amount;
    }, 0) / member_summary.length;

    var allowance = [];
    // Calculate amount that member would receive or have to give
    for await (const member of member_summary) {
      let amount = (member.amount - average).toFixed(2);
      let obj = {
        'name': member.name,
        'spent': member.amount,
        'share':amount
      };
      allowance.push(obj);
    }
    console.log(allowance);
    res.status(200).json(allowance);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch group members');
  }
}
