const config = require('../config');
const Bill = require('../models/BillModel');
const Member = require('../models/MemberModel');
const Group = require('../models/GroupModel');
var ObjectId = require('mongodb').ObjectID;

// Method to get the summary of each group expenses
module.exports.getExpenseSummary = async (req, res) => {
  // Get req.userId from header token
  const member = await Member.find({ 'user_id': req.userId });
  let groupIds = [];
  for (let m of member) {
    groupIds.push(m.group_id);
  }
  try {
    const groups = await Bill.aggregate([
      { $match: { group_id: { $in: groupIds } } }, // Only match the groups in which user is a member
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
          _id: "$groups._id",
          group_name: {
            $first: "$groups.name"
          },
          total: {
            $sum: '$amount'
          }
        }
      }
    ]);
    res.status(200).json(groups);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch groups summary');
  }
}

// Method to get expense details of particular group
module.exports.getExpenseDetails = async (req, res) => {
  //const members = await Member.find({ 'group_id': req.params.group_id });
  const members = await Member.aggregate([
    {
      "$match": {
        group_id: ObjectId(req.params.group_id)
      }
    },
    {
      $lookup: {
        from : 'users',
        localField: 'user_id',
        foreignField: '_id',
        as: 'users'
      }
    }, 
    { 
      $project : { 
          "users._id" : 1,
          "users.name" : 1  
        } 
      }
  ]);

  /* const members = await Member.aggregate([
    {
      "$match": {
        group_id: ObjectId(req.params.group_id)
      }
    },
    {
      $lookup: {
        from : 'users',
        localField: 'user_id',
        foreignField: '_id',
        as: 'users'
      }
    }, 
    {
      $lookup: {
        from : 'bills',
        localField: 'user_id',
        foreignField: 'user_id',
        as: 'bills'
      }
    }, 
    {
      $group: {
        _id: "$user_id",
        name: {
          $first: "$users.name"
        },
        amount: {
          $sum: '$bills.amount'
        }
      }
    }
  ]); */

  //console.log("members",members)
  
  try {
    var member_summary = [];
    for await (const member of members) {
      var mem = {};
      mem['id'] = member.users[0]._id;
      mem['name'] = member.users[0].name;
      mem['amount'] = 0;
      const bill = Bill.aggregate([
        {
          $match: { 
            $and: [
              {user_id: ObjectId(member.users[0]._id)},
              {group_id: ObjectId(req.params.group_id)},
            ]
          }
        },
        {
          $group: {
            _id: null,
            amount: {
              $sum: '$amount'
            }
          }
        }
      ]);
      
      for await (const b of bill) {
        mem['amount'] = b.amount;
      }
      console.log("amount",mem['amount'])
      member_summary.push(mem);
    }
    console.log("member_summary",member_summary)

    // Calculate average amount spent in a group
    var average = member_summary.reduce(function (a, b) {
      return a + b.amount;
    }, 0) / member_summary.length;

    var allowance = [];
    // Calculate amount that member would receive or have to give
    for await (const member of member_summary) {
      let share = (member.amount - average).toFixed(2);
      let obj = {
        'name': member.name,
        'spent': member.amount,
        'share': share
      };
      allowance.push(obj);
    }
    console.log(allowance);
    res.status(200).json(allowance);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch group expense details');
  }
}
