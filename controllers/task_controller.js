const Task = require("../models/task_model");
const createError = require("http-errors");
const mongoose = require("mongoose");

module.exports = {
  getAllTask: async (req, res, next) => {
    try {
      const tasks = await Task.find({}, { __v: 0 });
      res.send(tasks);
    } catch (error) {
      console.log(error.message);
    }
  },

  createTask: async (req, res, next) => {
    try {
      const task = Task(req.body);
      const result = await task.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
  getTaskByID: async (req, res, next) => {
    const id = req.params.id;

    try {
      const task = await Task.findById(id, { __v: 0 });
      if (!task) {
        throw createError(404, "Task id does not exits.");
      }
      res.send(task);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid task id"));
        return;
      }
      next(error);
    }
  },
  updateTaskByID: async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const options = { new: true };
      const task = await Task.findByIdAndUpdate(id, body, options);

      if (!task) {
        throw createError(404, "Task id does not exits.");
      }
      res.send(task);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid task id"));
        return;
      }
      next(error);
    }
  },

  toggleTask: async (req, res, next) => {
    const taskId = req.params.id;
    console.log("task id: " + taskId);
    try {
      // Find the task by ID
      const task = await Task.findById(taskId);
      if (!task) {
        throw createError(404, "Task id does not exits.");
      }
      task.isDone = !task.isDone;
      await task.save();
      res.send(task);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid task id"));
        return;
      }
      next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    const id = req.params.id;
    console.log("id: " + id);
    try {
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        throw createError(404, "Task id does not exits.");
      }
      res.send({
        message: "task deleted successfully.",
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid task id"));
        return;
      }
      next(error);
    }
  },
};
