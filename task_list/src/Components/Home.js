import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
const Home = () => {
  const [tasks, setTasks] = useState([]); //to store backend data
  const [showModal, setShowModal] = useState(false); //modal to add or update tasks
  const [taskText, setTaskText] = useState(""); //to edit and update it
  const [selectedTask, setSelectedTask] = useState(null); //to select a singlre task

  useEffect(() => {
    axios
      .get("http://localhost:8000/") //request to back-end for data
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleAddTask = () => {
    // Add a new task
    axios
      .post("http://localhost:8000/add_tasks", { text: taskText }) //request to add new task to backend
      .then((response) => {
        setTasks([...tasks, response.data]);
        setShowModal(false);
        setSelectedTask(null);
        setTaskText("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  const handleUpdateTask = () => {
    // Update a task
    axios
      .put(`http://localhost:8000/update/${selectedTask._id}`, {
        // request to update a task to backend
        text: taskText,
      })
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task._id === selectedTask._id ? response.data : task
        );
        setTasks(updatedTasks);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleDeleteTask = (taskId) => {
    // Delete a task
    axios
      .delete(`http://localhost:8000/delete/${taskId}`) // request to delete a task to backend
      .then(() => {
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleToggleComplete = (taskId, completed) => {
    axios
      .put(`http://localhost:8000/status/${taskId}`, { completed: !completed }) // request to update complete status
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task._id === taskId ? { ...task, completed: !completed } : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error toggling task completion:", error);
      });
  };
  return (
    <div>
      <h1 className="mt-5">Task List</h1>
      <Button
        onClick={() => {
          setTaskText("");
          setSelectedTask(null);
          setShowModal(true);
        }}
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        Add Task
      </Button>
      {tasks.length > 0 ? (
        <Container>
          <Table responsive>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Task</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* using map function to diplay data and actions  */}
              {tasks.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.text}</td>
                  <td>
                    {/* checkbox for marking task status  */}
                    <Form.Check
                      type="checkbox"
                      label=""
                      checked={task.completed}
                      onChange={() =>
                        handleToggleComplete(task._id, task.completed)
                      }
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  </td>
                  <td>
                    {/* for updating selected task */}
                    <Button
                      variant="info"
                      onClick={() => {
                        setSelectedTask(task);
                        setTaskText(task.text);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </Button>{" "}
                    {/* for delete selected task */}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        <h1>Add something to see data.</h1>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTask ? "Edit Task" : "Add Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="taskText">
            <Form.Label>Task Text</Form.Label>
            <Form.Control
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={selectedTask ? handleUpdateTask : handleAddTask}
          >
            {selectedTask ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
