const mongoose = require("mongoose");

const schema = mongoose.Schema;

const currentSchema = new schema({
  month: { type: String, required: true },
});

module.exports = mongoose.model("CurrentDetail", currentSchema,"curentDetails");
