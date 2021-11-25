const mongoose = require("mongoose");

const schema = mongoose.Schema;

const dateSchema = new schema({
  date: {
    type: String,
    required: true
  },
  leaves: {
    type: [{
      type: schema.Types.ObjectId,
      ref: 'Leave'
    }]
  },
  acceptedLeaves: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Date", dateSchema);
