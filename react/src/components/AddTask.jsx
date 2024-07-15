import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { handleAddTask } from "./ProjectTask";
import DatePicker from "react-date-picker"

export default function AddTask({ projectID }) {
  // const { user } = useAuth();
  const user = JSON.parse(Cookies.get('userInfo'));
  
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    isComplete: false,
    dueDate: "",
    estimatedDuration: 0,
    projectID: projectID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (name in taskData) {
      setTaskData({
        ...taskData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleAddTask(taskData, setTaskData);
  };

  return (
    <>
      <div id="add-project-card" className="form-card">
        <h3>Add Task</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className="form-label" id="name-label" htmlFor="username">
            Name:
          </label>
          <input
            className="form-field"
            id="name"
            name="name"
            value={taskData.name}
            onChange={handleChange}
            type="text"
          />
          <br></br>
          <br></br>
          <label className="form-label" id="description-label" htmlFor="description">
            Description:
          </label>
          <input
            className="form-field"
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            type="text"
          />
          <br />
          <br />
          <label className="form-label" id="dueData-label" htmlFor="dueData">
            Due Data:
          </label>
            <DatePicker onChange={handleChange} value={taskData.dueDate}></DatePicker>
          <br />
          <br />
          <button type="submit" className="btn btn-primary">
            Add Project
          </button>
          <br />
          <br />
        </form>
      </div>
    </>
  );
}
