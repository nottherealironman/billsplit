const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
}, { timestamps: true });

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;