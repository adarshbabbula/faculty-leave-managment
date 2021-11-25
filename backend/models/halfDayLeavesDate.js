const mongoose = require("mongoose");

const schema = mongoose.Schema;

const dateSchema = new schema({
  date: {
    type: String,
    required: true
  },
  halfDayLeaves: {
    type: [{
      type: schema.Types.ObjectId,
      ref: 'HalfDayLeave'
    }]
  },
});

module.exports = mongoose.model("HalfDayLeavesDate", dateSchema);
