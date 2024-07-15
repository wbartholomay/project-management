import React from "react";

export default function TaskButtons({ task, taskList, setTaskList, handleEditTask, handleDeleteTask, handleSwitchTask, handleEditTaskPopup, isManager}){
    return (
      <>
      { isManager &&
        <div className="task-buttons">
          <button
            onClick={() => handleEditTaskPopup(task._id)}
            className="edit-button button-secondary"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteTask(task._id, setTaskList)}
            className="delete-button button-secondary"
          >
            Delete
          </button>
        </div>}
        <div className="task-switch">
          <button
            onClick={() =>
              handleSwitchTask(task._id, task, taskList, setTaskList)
            }
            className="switch-button button-secondary"
          >
            Switch
          </button>
        </div>
      </>
    );
}