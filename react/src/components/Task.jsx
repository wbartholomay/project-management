import React from 'react'

export default function Task({ task }) {
  return (
    <>
    <br />
      <div className="task-name">{task.name}</div>
      <div>Description: {task.description}</div>
      <div>{task.isComplete}</div>
      <div>Person Assigned: {task.personAssigned}</div>
      <div>Due: {task.dueDate}</div>
      <div>Expected Duration: {task.estimatedDuration} Days</div>
    </>
  );
  }