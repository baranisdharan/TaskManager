import React, { useState } from 'react';
import { Form, Button, Card, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';


const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    description: '',
    date: '',
    time: '',
    assignedUser: '',
  });
  const [editTask, setEditTask] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // Track the expansion state

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

    setIsExpanded(false); // Close the form after adding a task
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setNewTask(taskToEdit);
    setEditTask(taskId);
    setIsExpanded(true); // Expand the form when editing a task
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const totalTasks = tasks.length;

  const addTaskTooltip = <Tooltip id="add-task-tooltip">Add Task</Tooltip>;
  const deleteTaskTooltip = <Tooltip id="add-task-tooltip">delete</Tooltip>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '400px' }}>
        <Card>
          <Card.Body>
            <Card.Title>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>TASKS {totalTasks}</span>
                <OverlayTrigger placement="top" overlay={addTaskTooltip}>
                  <Button variant="link" onClick={handleExpand} style={{ marginLeft: 'auto' }}>
                    {isExpanded ? <FaMinus style={{ color: 'black' }} /> : <FaPlus style={{ color: 'black' }} />}
                  </Button>
                </OverlayTrigger>
              </div>
            </Card.Title>
            {isExpanded && (
              <>
                <Form onSubmit={handleSubmit}>
                  <Form.Group style={{ marginTop: '10px' }}>
                    <Form.Label>Task Description:</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={newTask.description}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Form.Group style={{ flex: '1' }}>
                      <Form.Label>Date:</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={newTask.date}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group style={{ flex: '1' }}>
                      <Form.Label>Time:</Form.Label>
                      <Form.Control
                        type="time"
                        name="time"
                        value={newTask.time}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </div>

                  <Form.Group style={{ marginTop: '10px' }}>
                    <Form.Label>Assigned User:</Form.Label>
                    <Form.Select
                      name="assignedUser"
                      value={newTask.assignedUser}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select User</option>
                      <option value="User 1">User 1</option>
                      <option value="User 2">User 2</option>
                    </Form.Select>
                  </Form.Group>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
                      {editTask ? 'Update Task' : 'Save'}
                    </Button>
                    <Button variant="secondary" onClick={() => setIsExpanded(false)}>
                      Cancel
                    </Button>
                  </div>
                </Form>
                <br />
              </>
            )}

            {tasks.length === 0 ? (
              <div></div>
            ) : (
              <ListGroup>
                {tasks.map((task) => (
                  <ListGroup.Item key={task.id}>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: 'auto', fontWeight: 'bold' }}>
                        {task.description}
                      </div>

                      <Button variant="secondary" onClick={() => handleEdit(task.id)} style={{ padding: 0, marginRight: '10px' }}>
                        <MdEdit size={16} style={{ color: 'black' }} />
                      </Button>

                      <Button variant="link" onClick={() => handleDelete(task.id)} style={{ padding: 0 }}>
                        <MdDeleteForever size={16} style={{ color: 'black' }} />
                      </Button>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: '10px' }}>
                        {task.assignedUser}
                      </div>
                      <div style={{ marginRight: '10px' }}>
                        {task.date}
                      </div>
                    </div>


                  </ListGroup.Item>
                ))}
              </ListGroup>

            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default TaskManager;