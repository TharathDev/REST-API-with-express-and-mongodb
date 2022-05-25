const Student = require("../Model/student.model");

module.exports = {
  registerStudent: async (req, res, next) => {
    try {
      const student = new Student(req.body);
      const result = await student.save();
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
  listAllStudent: async (req, res, next) => {
    try {
      const results = await Student.find();
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getStudentById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const student = await Student.findById(id);
      if (!student) {
        throw createError(404, "Student with this id does not exist.");
      }
      res.send(student);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "Student with this id does not exist."));
        return;
      }
      next(error);
    }
  },
  updateStudentInfo: async (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    try {
      const result = await Student.findByIdAndUpdate(id, update);
      if (!result) {
        throw createError(404, "Student with this id does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "Student with this id does not exist."));
        return;
      }
      next(error);
    }
  },
  deleteStudentInfo: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Student.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "Student with this id does not exist.");
      }
      res.send("Student Deleted Succesfully.");
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "Student with this id does not exist."));
        return;
      }
      next(error);
    }
  },
};
