const req = require("express/lib/request");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const MajorSchema = new Schema({
  majorId: { type: String, default: uuid.v4 },
  majorName: {
    type: String,
    required: true,
  },
  school: {
    type: Object,
  },
  schoolId: {
    type: String,
  },
  tuitionFee: {
    type: Number,
    required: false,
  },
  language: {
    type: String,
    default: "ENGLISH",
    required: false,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const major = mongoose.model("major", MajorSchema);
module.exports = major;
