const express = require("express");
const app = express();
const TaskList = require("../models/taskList");

//for adding data to mongodb
app.post("/tasks", async (req, res) => {
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
module.exports = app;
