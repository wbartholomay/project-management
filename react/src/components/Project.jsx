import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Task from './Task'
const Project = () => {
  const [taskList, setTaskList] = useState([])
  const location = useLocation();
  const project = location.state || {};
  console.log(project)
  useEffect(() => {
    fetch(import.meta.env.VITE_TASKS_URL + project._id)
      .then((response) => response.json())
      .then((data) => {
        setTaskList(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [location]);
  if (!project) {
    return <div>No project data available.</div>;
  }

  return (
    <>
      <div>
        <h1>{project.name}</h1>
        <p>Team Size: {project.teamSize}</p>
        <p>Workload: {project.workload}</p>
        <p>Estimated Days to Completion: {project.daysToComplete}</p>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 bg-light border">
            <h4 className="text-center">To Do</h4>
            {taskList
              .filter((task) => !task.isComplete)
              .map((task) => (
                <Task key={task._id} task={task} />
              ))}
          </div>
          <div className="col-md-6 bg-light border">
            <h4 className="text-center">Complete</h4>
            {taskList
              .filter((task) => task.isComplete)
              .map((task) => (
                <Task key={task._id} task={task} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
