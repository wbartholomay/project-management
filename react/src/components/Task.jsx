import React from 'react'

export default function Task() {
const task = {
    name: "thisTask",
    description: "this is a task that describes something",
    isComplete: false,
    personAssigned: "zflor",
    dueDate: "11/02/24",
    estimatedDuration: "10 days"
}
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