import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Project = () => {
  const location = useLocation();
  console.log(location)
  const { project } = location.state || {};
  useEffect(() => {
    console.log(location)
  }, [location]);
  if (!project) {
    return <div>No project data available.</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>Team Size: {project.teamSize}</p>
      <p>Workload: {project.workload}</p>
      <p>Estimated Days to Completion: {project.daysToComplete}</p>
    </div>
  );
};

export default Project;
