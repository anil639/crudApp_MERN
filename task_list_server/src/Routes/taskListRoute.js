const express = require("express");
const app = express();
const TaskList = require("../models/taskList");

//for adding data to mongodb
app.post("/add_tasks", async (req, res) => {
  try {
    const { text, completed } = req.body;
    const task = new TaskList({ text, completed });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task item:", error);
    res.status(500).json({ error: "Error creating task item" });
  }
});
//to get all tasks
app.get("/", async (req, res) => {
  try {
    const tasks = await TaskList.find();
    // get the tasks as a JSON response
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// to update a task by id
app.put("/update/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { text, completed } = req.body;

    // Find the task by id and update it
    const updatedTask = await TaskList.findByIdAndUpdate(
      taskId,
      { text, completed },
      { new: true } // Return the updated task
    );
    // if task not exists in db
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
});

// to delete a task by id
app.delete("/delete/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    // find task by id and delete it
    const deletedTask = await TaskList.findByIdAndRemove(taskId);
    // if task not exists in db
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Error deleting task" });
  }
});

module.exports = app;
