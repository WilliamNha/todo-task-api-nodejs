const express = require("express");
const router = express.Router();
const Product = require("../models/task_model");
const TaskController = require("../controllers/task_controller");
const Task = require("../models/task_model");

//get all task
router.get("/", TaskController.getAllTask);

//create task
router.post("/", TaskController.createTask);

//get task by id
router.get("/:id", TaskController.getTaskByID);

//update task
router.patch("/:id", TaskController.updateTaskByID);

//toggle task
router.put("/:id/toggleTask", TaskController.toggleTask);

//delete task
router.delete("/:id", TaskController.deleteTask);
module.exports = router;
