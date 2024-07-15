import React from "react";

export default function TaskButtons({ task, taskList, setTaskList, handleEditTask, handleDeleteTask, handleSwitchTask, handleEditTaskPopup }){
    return (
      <>
        <div className="task-buttons">
          <button
            onClick={() => handleEditTask(task._id, taskList, handleEditTaskPopup)}
            className="edit-button"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteTask(task._id, setTaskList)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
        <div className="task-switch">
          <button onClick={() => handleSwitchTask(task._id, task, taskList, setTaskList)} className="switch-button">
            Switch
          </button>
        </div>
      </>
    );
}