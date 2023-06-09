import React, { useState } from 'react';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    description: '',
    date: '',
    time: '',
    assignedUser: '',
  });
  const [editTask, setEditTask] = useState(null);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editTask) {
      // Update existing task
      const updatedTasks = tasks.map((task) => {
        if (task.id === editTask) {
          return { ...task, ...newTask };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditTask(null);
    } else {
      // Add new task
      const taskId = new Date().getTime().toString();
      const newTaskWithId = { ...newTask, id: taskId };
      setTasks([...tasks, newTaskWithId]);
    }

    setNewTask({
      description: '',
      date: '',
      time: '',
      assignedUser: '',
    });
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setNewTask(taskToEdit);
    setEditTask(taskId);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div>
        <h1>Task Manager</h1>

        <Card>
          <Card.Body>
            <Card.Title>Add New Task</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Task Description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={newTask.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Time:</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={newTask.time}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Assigned User:</Form.Label>
                <Form.Control
                  type="text"
                  name="assignedUser"
                  value={newTask.assignedUser}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                {editTask ? 'Update Task' : 'Add Task'}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <h2>Tasks:</h2>

        <Card>
          <ListGroup variant="flush">
            {tasks.map((task) => (
              <ListGroup.Item key={task.id}>
                <div>
                  <strong>Description:</strong> {task.description}
                </div>
                <div>
                  <strong>Date:</strong> {task.date}
                </div>
                <div>
                  <strong>Time:</strong> {task.time}
                </div>
                <div>
                  <strong>Assigned User:</strong> {task.assignedUser}
                </div>
                <div>
                  <Button variant="secondary" onClick={() => handleEdit(task.id)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </div>
    </div>
  );
};

export default TaskManager;
