const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const StudentSchema = new Schema({
  _id: { type: String, default: uuid.v4 },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const student = mongoose.model("student", StudentSchema);
module.exports = student;
