const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./initDB")();

const student = require("./routes/student.route");

const school = require("./routes/school.route");

const major = require("./routes/major.route");

app.use("/students-service", student);

app.use("/schools-service", school);

app.use("/majors-service", major);

app.use((req, res, next) => {
  res.status(404);
  res.send({ error: "Not found" });
});

app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port 8888.....");
});
