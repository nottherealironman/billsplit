const config = require('../config');
const Bill = require('../models/BillModel');
const Member = require('../models/MemberModel');
const Group = require('../models/GroupModel');

// Method to get the summary of each group
module.exports.getGroupSummary = async (req, res) => {
  // Get req.userId from header token
  const member = await Member.find({'user_id':req.userId});
  let groupIds = []; 
  for (let m of member){
    groupIds.push(m.group_id);
  }
  try{
        const groups = await Bill.aggregate([
          {$match : {group_id : {$in : groupIds}}}, // Only match the groups in which user is a member
          {
            $lookup: {
              from: "groups",
              localField: "group_id",
              foreignField: "_id",
              as: "groups"
            }
          },
          {
            $unwind: "$groups"
          },
          {
            $group: {
              _id:"$groups._id",
              group_name: {
                $first: "$groups.name"
              },
              total :{
                $sum:'$amount'
               }
            }
          }
        ]);
    //}
    console.log(groups)
    res.status(200).json(groups);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch groups summary');
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
