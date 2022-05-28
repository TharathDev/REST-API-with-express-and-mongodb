const School = require("../Model/school.model");
const createError = require("http-errors");
const mongoose = require("mongoose");

module.exports = {
  registerSchool: async (req, res, next) => {
    try {
      const school = new School(req.body);
      const result = await school.save();
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
  listAllSchool: async (req, res, next) => {
    try {
      const results = await School.find();
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getSchoolById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const school = await School.where("schoolId").equals(id);
      if (!school) {
        throw createError(404, "school with this id does not exist.");
      }
      res.send(school);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "school with this id does not exist."));
        return;
      }
      next(error);
    }
  },
  updateSchoolInfo: async (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    try {
      const result = await School.where("schoolId")
        .equals(id)
        .updateOne(update);
      const school = await School.where("schoolId").equals(id);
      if (!result) {
        throw createError(404, "school with this id does not exist.");
      }
      res.send(school);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "school with this id does not exist."));
        return;
      }
      next(error);
    }
  },
  deleteSchoolInfo: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await School.where("schoolId").equals(id).deleteOne();
      if (!result) {
        throw createError(404, "school with this id does not exist.");
      }
      res.send("school Deleted Succesfully.");
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "school with this id does not exist."));
        return;
      }
      next(error);
    }
  },
};
