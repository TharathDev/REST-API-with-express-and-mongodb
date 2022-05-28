const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const SchoolSchema = new Schema({
  schoolId: { type: String, default: uuid.v4 },
  PK: { type: String, default: "SCHOLL#" },
  schoolName: {
    type: String,
    required: true,
  },
  SchoolType: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const school = mongoose.model("school", SchoolSchema);
module.exports = school;
