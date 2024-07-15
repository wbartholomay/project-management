import React from "react";

export default function TaskButtons({ task, taskList, handleEditTask, handleDeleteTask, handleSwitchTask }){
    return (
      <>
        <div className="task-buttons">
          <button
            onClick={() => handleEditTask(task._id, taskList)}
            className="edit-button"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteTask(task._id, taskList)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
        <div className="task-switch">
          <button onClick={() => handleSwitchTask(task._id, taskList)} className="switch-button">
            Switch
          </button>
        </div>
      </>
    );
}