const express = require("express");
const createError = require("http-errors");
const mongoose = require("mongoose");
const StudentController = require("../Controller/student.controller");
const router = express.Router();

const Student = require("../Model/student.model");

router.get("/", StudentController.listAllStudent);

router.post("/register", StudentController.registerStudent);

router.get("/:id", StudentController.getStudentById);

router.patch("/:id", StudentController.updateStudentInfo);

router.delete("/:id", StudentController.deleteStudentInfo);

module.exports = router;
