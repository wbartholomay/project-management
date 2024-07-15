import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { handleAddTask } from "./ProjectTask";
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function AddTask({ projectID }) {
  // const { user } = useAuth();
  const user = JSON.parse(Cookies.get('userInfo'));
  const [date, setDate] = useState(new Date()); 
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    isComplete: false,
    dueDate: date,
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

  useEffect(() => {
    setTaskData({...taskData, dueDate: date})
    console.log(date);
  }, [date])

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleAddTask(taskData, setTaskData);
  };

  return (
    <>
      <div id="add-project-card" >
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
          <textarea
            className="form-field"
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
          />
          <br />
          <br />
          <label className="form-label" id="dueData-label" htmlFor="dueData">
            Due Date:
          </label>
          <br />
            <DatePicker onChange={setDate} value={taskData.dueDate}></DatePicker>
          <br />
          <br />
          <label className="form-label" id="estimatedDuration-label" htmlFor="estimatedDuration">
            Estimated Duration:
          </label>
          <input
            className="form-field"
            id="estimatedDuration"
            name="estimatedDuration"
            value={taskData.estimatedDuration}
            onChange={handleChange}
            type="text"
          />
          <br />
          <br />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
          <br />
          <br />
        </form>
      </div>
    </>
  );
}
