import React, { useState } from 'react';

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
    <div>
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Task Description:
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={newTask.date}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Time:
          <input
            type="time"
            name="time"
            value={newTask.time}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Assigned User:
          <input
            type="text"
            name="assignedUser"
            value={newTask.assignedUser}
            onChange={handleInputChange}
            required
          />
        </label>

        <button type="submit">{editTask ? 'Update Task' : 'Add Task'}</button>
      </form>

      <h2>Tasks:</h2>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
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
              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
