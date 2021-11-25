const mongoose = require("mongoose");

const schema = mongoose.Schema;

const facultySchema = new schema({
  name: { type: String, required: true },
  // leaves: {
  //   type: {
  //     leave_id: String,
  //     date: String,
  //   },
  //   required: true,
  // },
  // assigned: {
  //   type: {
  //     leave_id: String,
  //     date: String,
  //   },
  //   required: true,
  // },
  leaves: {
    type: [{
      type: String,
    }]
  },
  faculty_id: {
     type: String
  },
  email: {
    type: String
  },
  phoneNo: {
    type: Number
  },
  halfdayleaves: [{
    type: schema.Types.ObjectId,
    ref: 'HalfDayLeaves'
  }],
  acceptedHalfDayLeaves: {
    type: Number,
    default:0
  },
  password: {
    type: String,
    default: 'welcome'
  }
});

module.exports = mongoose.model("Faculty", facultySchema, 'faculties');
