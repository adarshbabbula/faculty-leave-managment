const mongoose = require("mongoose");

const schema = mongoose.Schema;

const facultySchema = new schema({
  name: { type: String, required: true },
  admin_id: {
     type: String
  },
  password: {
    type: String
  },
});

module.exports = mongoose.model("Admin", facultySchema,"admins");
