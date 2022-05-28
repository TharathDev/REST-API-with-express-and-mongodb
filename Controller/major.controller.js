const School = require("../Model/school.model");
const Major = require("../Model/major.model");
const createError = require("http-errors");
const mongoose = require("mongoose");

module.exports = {
  createMajor: async (req, res, next) => {
    const id = req.params.schoolId;
    try {
      const major = new Major(req.body);
      const school = await School.where("schoolId").equals(id);
      major.schoolId = id;
      major.school = school[0];
      const result = await major.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(404, error.message));
        return;
      }
      next(error);
    }
  },
  listMajor: async (req, res, next) => {
    try {
      const results = await Major.find();
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getSingleMajor: async (req, res, next) => {
    const schoolId = req.params.schoolId;
    const majorId = req.params.majorId;
    try {
      const majors = await Major.where("schoolId").equals(schoolId);
      if (majors) {
        const major = await Major.where("majorId").equals(majorId);
        res.send(major);
      } else {
        throw createError(404, "major with this id does not exist.");
      }
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "school with this id does not exist."));
        return;
      }
      next(error);
    }
  },

  getMajorBySchoolId: async (req, res, next) => {
    const id = req.params.schoolId;
    try {
      const major = await Major.find().where("schoolId").equals(id);
      if (!major) {
        throw createError(404, "school with this id does not exist.");
      }
      res.send(major);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "school with this id does not exist."));
        return;
      }
      next(error);
    }
  },
  updateMajorInfo: async (req, res, next) => {
    const schoolId = req.params.schoolId;
    const majorId = req.params.majorId;
    const update = req.body;
    try {
      const majors = await Major.exists().where("schoolId").equals(schoolId);
      if (majors) {
        const result = await Major.exists()
          .where("majorId")
          .equals(majorId)
          .updateOne(update);
        if (result) {
          const major = await Major.where("majorId").equals(majorId);
          res.send(major);
        } else {
          throw createError(404, "Major with this id does not exist.");
        }
      } else {
        throw createError(404, "School with this id does not exist.");
      }
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "Major with this id does not exist."));
        return;
      }
      next(error);
    }
  },
  deleteMajorInfo: async (req, res, next) => {
    const schoolId = req.params.schoolId;
    const majorId = req.params.majorId;
    try {
      const majors = await Major.exists().where("schoolId").equals(schoolId);
      if (majors) {
        const result = await Major.where("majorId").equals(majorId).deleteOne();
        if (result) {
          res.send("Major Deleted Succesfully.");
        } else {
          throw createError(404, "Major with this id does not exist.");
        }
      }
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "Major with this id does not exist."));
        return;
      }
      next(error);
    }
  },
};
