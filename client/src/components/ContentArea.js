import React from 'react'
import '../assets/css/ContentArea.css'
import TaskCard from './TaskCard'
import { useLocation } from 'react-router-dom'
import SquareButton from './SquareButton'
import AddTask from './AddTask'
function ContentArea() {
  const location = useLocation();
  const path = location.pathname;
  const getHeading = () => {
    switch (path) {
      case '/add-task':
        return 'Add New Task';
      case '/pending':
        return 'Pending Tasks';
      case '/due-today':
        return 'Due Today';
      case '/completed':
        return 'Completed Tasks';
      default:
        return 'All Tasks'; // Default for '/'
    }
  };
  return (
    <div className='content-area'>
      <div className="content-area-content">
        <h1>{getHeading()}</h1>
        {path === '/add-task' ? (
          <AddTask/> // Render AddTask component if path is /add-task
        ) : (
          <TaskCard /> // Render TaskCard with filtered tasks
        )}
      </div>
      


    </div>
  )
}

export default ContentArea