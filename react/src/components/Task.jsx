import React from 'react'

export default function Task({ task }) {
  return (
    <div className="card task-card">
      <div className="task-buttons">
        <button className="edit-button">Edit</button>
        <button className='delete-button'>Delete</button>
      </div>
      <div className="task-name">{task.name}</div>
      <div>{task.description}</div>
      <div>{task.isComplete}</div>
      <div>{task.personAssigned}</div>
      <div>{task.dueDate}</div>
      <div>{task.estimatedDuration}</div>
    </div>
  );
  }