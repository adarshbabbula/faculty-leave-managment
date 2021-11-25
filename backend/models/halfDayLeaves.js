const mongoose = require("mongoose");

const schema = mongoose.Schema;

const leaveSchema = new schema({
  date: { type: String, required: true },
  from: { type: String, required: true},
  to: { type: String, required: true},
  faculty: {type: schema.Types.ObjectId,
          ref: 'Faculty'},
  reason: { type: String},
  status: { type: String, default: 'Pending'},
  reasonForRejection: { type: String, required: false },
});

module.exports = mongoose.model("HalfDayLeaves", leaveSchema);
