const express = require("express");
const SchoolController = require("../Controller/school.controller");
const router = express.Router();

const Student = require("../Model/school.model");

router.get("/schools", SchoolController.listAllSchool);

router.post("/school/register", SchoolController.registerSchool);

router.get("/school/:id", SchoolController.getSchoolById);

router.patch("/school/:id", SchoolController.updateSchoolInfo);

router.delete("/school/:id", SchoolController.deleteSchoolInfo);

module.exports = router;
