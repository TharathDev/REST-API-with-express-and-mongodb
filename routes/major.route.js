const express = require("express");
const MajorController = require("../Controller/major.controller");
const router = express.Router();

router.post("/school/:schoolId/major", MajorController.createMajor);

router.get("/majors", MajorController.listMajor);

router.get("/school/:schoolId/major/:majorId", MajorController.getSingleMajor);

router.get("/school/:schoolId/majors", MajorController.getMajorBySchoolId);

router.patch(
  "/school/:schoolId/major/:majorId",
  MajorController.updateMajorInfo
);

router.delete(
  "/school/:schoolId/major/:majorId",
  MajorController.deleteMajorInfo
);

module.exports = router;
