const express = require("express");

const router = express.Router();

const Student = require("../Model/student.model");

router.get("/", (req, res, next) => {
  res.send("im sending");
});

router.post("/", (req, res, next) => {
  const student = new Student({
    name: req.body.name,
    gender: req.body.gender,
  });
  student
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/:id", (req, res, next) => {
  res.send("get single student");
});

router.patch("/:id", (req, res, next) => {
  res.send("update single student");
});

router.delete("/:id", (req, res, next) => {
  res.send("delete single student");
});

module.exports = router;
