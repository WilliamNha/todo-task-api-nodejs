const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  task: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  isDone: {
    type: Boolean,
    require: false,
    default: false,
  },
});

const Task = mongoose.model("task", TaskSchema);
module.exports = Task;
