const mongoose = require("mongoose");

const schema = mongoose.Schema;

const leaveSchema = new schema({
  date: { type: String, required: true },
  requestee: {type: schema.Types.ObjectId,
  ref: 'Faculty'},
  // assignee: { type: String, required: false },
  reason: { type: String, required: false },
  status: { type: String, required: true },
  reasonForRejection: { type: String, required: false },
  type: { type: String, required: false}
});

module.exports = mongoose.model("Leave", leaveSchema);
