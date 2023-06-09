import React from 'react'
import ReactDOM from 'react-dom/client'
import TaskManager from './Taskmanager'

import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<TaskManager />
	</React.StrictMode>
)