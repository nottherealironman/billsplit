const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group"
  }
}, { timestamps: true });

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;