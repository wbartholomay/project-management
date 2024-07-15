import React from 'react'

export default function Task({ task }) {
  return (
    <>
      <div className="task-name">{task.name}</div>
      <div>{task.description}</div>
      <div>{task.isComplete}</div>
      <div>{task.personAssigned}</div>
      <div>{task.dueDate}</div>
      <div>{task.estimatedDuration}</div>
    </>
  );
  }