const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./Routes/taskListRoute");

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8000;

// Connection to DB
mongoose.connect("mongodb://localhost/task-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (e) => console.log(e));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define routes for your task_list
app.use("/", taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
