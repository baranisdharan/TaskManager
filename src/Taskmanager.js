import React, { useState } from 'react';
import { Form, Button, Card, ListGroup, OverlayTrigger, Tooltip, InputGroup,Dropdown } from 'react-bootstrap';
import { FaPlus, FaMinus, FaClock } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
        <Card >
        <Card.Title style={{ backgroundColor: 'white',marginLeft: '10px',marginRight:'10px',marginBottom:'0px'  }}>
              <div style={{ display: 'flex', alignItems: 'center'}}>
                <span>TASKS {totalTasks}</span>
                <OverlayTrigger placement="top" overlay={addTaskTooltip}>
                  <Button variant="link" onClick={handleExpand} style={{ marginLeft: 'auto' }}>
                    {isExpanded ? <FaMinus style={{ color: 'black' }} /> : <FaPlus style={{ color: 'black' }} />}
                  </Button>
                </OverlayTrigger>
              </div>
            </Card.Title>
            <Card.Body style={{ backgroundColor: isExpanded ? 'lightBlue' : 'white' }}>            
            {isExpanded && 
              <>
                <Form onSubmit={handleSubmit} >
                  <Form.Group style={{ marginTop: '0px' }}>
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
                    <InputGroup style={{ flex: '1' }}>
                      <Form.Label>Date:</Form.Label>
                      <DatePicker
                        selected={newTask.date ? new Date(newTask.date) : null}
                        onChange={(date) => setNewTask({ ...newTask, date: date.toISOString().split('T')[0] })}
                        className="form-control"
                        dateFormat="MM/dd/yyyy"
                        placeholderText='Select Date'
                        required
                      />
                    </InputGroup>

                    <Form.Group style={{ flex: '1' }}>
                      <Form.Label>Time:</Form.Label>
                      <InputGroup>
                        <InputGroup.Text><FaClock /></InputGroup.Text>
                        <Form.Control
                          as="select"
                          name="time"
                          value={newTask.time}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Time</option>
                          {Array.from(Array(48)).map((_, index) => {
                            const time = new Date(0, 0, 0, 0, index * 30);
                            const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            return <option key={index} value={formattedTime}>{formattedTime}</option>;
                          })}
                        </Form.Control>
                      </InputGroup>
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
                      
                      <option value="Prem Kumar">Prem Kumar</option>
                      <option value="Sai">Sai</option>
                    </Form.Select>
                  </Form.Group>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>

                    <Button variant="Light" onClick={() => setIsExpanded(false)}>
                      Cancel
                    </Button>
                    <Button variant="success" type="submit" style={{ marginLeft: '10px' }}>
                      {editTask ? 'Update Task' : 'Save'}
                    </Button>
                  </div>
                </Form>
                <br />
              </>
            }

            {tasks.length === 0 ? (
              <div></div>
            ) : (
              <ListGroup>
                {tasks.map((task) => (
                  <ListGroup.Item key={task.id}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: 'auto', fontWeight: 'bold' }}>{task.description}</div>

                      <Button
                        variant="secondary"
                        onClick={() => handleEdit(task.id)}
                        style={{ padding: 0, marginRight: '10px' }}
                      >
                        <MdEdit size={16} style={{ color: 'black' }} />
                      </Button>

                      <Button variant="link" onClick={() => handleDelete(task.id)} style={{ padding: 0 }}>
                        <MdDeleteForever size={16} style={{ color: 'black' }} />
                      </Button>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: '10px' }}>{task.assignedUser}</div>
                      <div style={{ marginRight: '10px' }}>{task.date}</div>
                      <div style={{ marginRight: '10px' }}>{task.time}</div>
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
