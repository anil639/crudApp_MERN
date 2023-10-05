const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const TaskList = mongoose.model("TaskList", taskListSchema);
module.exports = TaskList;
