const config = require('../config');
const Bill = require('../models/BillModel');

// Method to get all bills
module.exports.getAll = async (req, res) => {
  
  try{
    const bills = await Bill.aggregate([
      {
        $lookup: {
          from: "groups",
          localField: "group_id",
          foreignField: "_id",
          as: "groups"
        }
      },
      {
        "$unwind": "$groups"
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "users"
        }
      },
      {
        "$unwind": "$users"
      },
      {
        $project: {
          _id:1,
          title: 1,
          amount: 1,
          "groups.name":1,
          "users.name":1,
          "users._id":1
        }
      }
    ]);
    console.log(bills);
    res.status(200).json(bills);
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch bill');
  }
}

// Method to add new bill
module.exports.add = async (req, res) => {
  const { title, amount, group_id, user_id } = req.body;
  console.log(title, amount, group_id, user_id);
  
    try {
      const newBill = new Bill({
        title, 
        amount, 
        group_id, 
        user_id
      });
      const data = await newBill.save();

      const bill = await Bill.aggregate([
        {
          "$match": {
            _id: data._id
          }
        },
        {
          $lookup: {
            from: "groups",
            localField: "group_id",
            foreignField: "_id",
            as: "groups"
          }
        },
        {
          "$unwind": "$groups"
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "users"
          }
        },
        {
          "$unwind": "$users"
        },
        {
          $project: {
            _id:1,
            title: 1,
            amount: 1,
            "groups.name":1,
            "users.name":1,
            "users._id":1
          }
        }
      ]);
      // Send response if success
      res.status(200).json(bill[0]);
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
    res.status(200).json({
      msg:'Bill successfully deleted!', 
      _id: bill.id});
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Failed to fetch bill');
  }
}
