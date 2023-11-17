const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./initDB")();

const TaskRoute = require("./routes/task_route");
app.use("/task", TaskRoute);

//handle 404 not found
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

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
