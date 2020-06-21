const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  title: { 
  	type: String 
  },
  amount: { 
  	type: Number 
  },
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group"
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
}, { timestamps: true });

const Bill = mongoose.model("Bill", BillSchema);

module.exports = Bill;