import React, { useState, useEffect } from 'react';
import TaskList from '../TaskList/TaskList';
import TaskListNumbers from '../other/TaskListNumbers';
import Header from '../other/Header';

const EmployeeDashboard = ({ data, changeUser }) => {
  const [userData, setUserData] = useState(data);

  const updateTasks = (updatedTasks) => {
    const updatedUserData = {
      ...userData,
      tasks: updatedTasks,
      taskCounts: {
        active: updatedTasks.filter(t => t.active).length,
        newTask: updatedTasks.filter(t => t.newTask).length,
        completed: updatedTasks.filter(t => t.completed).length,
        failed: updatedTasks.filter(t => t.failed).length,
      }
    };

    setUserData(updatedUserData);
    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({ role: 'employee', data: updatedUserData })
    );
  };

  return (
    <div className="p-6">
      <Header data={userData} changeUser={changeUser} />
      <TaskListNumbers data={userData} />
      <TaskList data={userData} updateTasks={updateTasks} />
    </div>
  );
};

export default EmployeeDashboard;
