import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [asignTo, setAsignTo] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false
    };

    const updatedData = userData.map((user) => {
      if (user.firstName === asignTo) {
        return {
          ...user,
          tasks: [...user.tasks, newTask],
          taskCounts: {
            ...user.taskCounts,
            newTask: user.taskCounts.newTask + 1
          }
        };
      }
      return user;
    });


    console.log("UserData:", userData);

    setUserData(updatedData);

    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');
    setAsignTo('');
    setCategory('');
  };

  return (
    <div className='p-5 bg-[#1c1c1c] text-white mt-5 rounded shadow-lg'>
      <form onSubmit={submitHandler} className='flex flex-wrap w-full items-start justify-between gap-5'>

        <div className='w-full md:w-1/2'>
          <label htmlFor="taskTitle" className='text-sm block mb-1'>Task Title</label>
          <input
            id="taskTitle"
            name="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className='text-sm py-2 px-3 w-full rounded outline-none bg-[#2c2c2c] border border-gray-500 focus:border-emerald-500 mb-4'
            type="text"
            placeholder='Make a UI design'
          />

          <label htmlFor="taskDate" className='text-sm block mb-1'>Date</label>
          <input
            id="taskDate"
            name="taskDate"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className='text-sm py-2 px-3 w-full rounded outline-none bg-[#2c2c2c] border border-gray-500 focus:border-emerald-500 mb-4'
            type="date"
          />

          <label htmlFor="asignTo" className='text-sm block mb-1'>Assign to</label>
          <select
            id="asignTo"
            name="asignTo"
            value={asignTo}
            onChange={(e) => setAsignTo(e.target.value)}
            className='text-sm py-2 px-3 w-full rounded outline-none bg-[#2c2c2c] border border-gray-500 focus:border-emerald-500 mb-4 text-white'
          >
            <option value="">Select Employee</option>
            {userData?.map((user) => (
              <option className='text-black' key={user.id} value={user.firstName}>
                {user.firstName}
              </option>
            ))}
          </select>

          <label htmlFor="category" className='text-sm block mb-1'>Category</label>
          <input
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='text-sm py-2 px-3 w-full rounded outline-none bg-[#2c2c2c] border border-gray-500 focus:border-emerald-500 mb-4'
            type="text"
            placeholder='Design, Dev, QA, etc.'
          />
        </div>

        <div className='w-full md:w-2/5'>
          <label htmlFor="taskDescription" className='text-sm block mb-1'>Description</label>
          <textarea
            id="taskDescription"
            name="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className='w-full h-44 text-sm py-2 px-3 rounded outline-none bg-[#2c2c2c] border border-gray-500 focus:border-emerald-500 mb-4 resize-none'
            placeholder='Describe the task here...'
          ></textarea>

          <button
            type="submit"
            className='bg-emerald-500 hover:bg-emerald-600 transition-all text-sm font-medium py-3 px-5 w-full rounded'
          >
            Create Task
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateTask;
