import React from 'react';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';

const TaskList = ({ data, updateTasks }) => {
  return (
    <div className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16'>
      {data.tasks.map((task, idx) => {
        if (task.newTask) {
          return (
            <NewTask
              key={idx}
              data={task}
              updateTasks={updateTasks}
              allTasks={data.tasks}
            />
          );
        }
        if (task.active) {
          return (
            <AcceptTask
              key={idx}
              data={task}
              updateTasks={updateTasks}
              allTasks={data.tasks}
            />
          );
        }
        if (task.completed) {
          return <CompleteTask key={idx} data={task} />;
        }
        if (task.failed) {
          return <FailedTask key={idx} data={task} />;
        }
      })}
    </div>
  );
};

export default TaskList;
