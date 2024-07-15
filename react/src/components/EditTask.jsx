import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { handleAddTask } from "./ProjectTask";
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function EditTask({ task, taskList, setTaskList, teamMembers, handleEditTaskPopup }) {
  // const { user } = useAuth();
  const user = JSON.parse(Cookies.get('userInfo'));
  const [date, setDate] = useState(new Date()); 
  const [taskData, setTaskData] = useState({
    dueDate: "",
    personAssigned: teamMembers[0],
    estimatedDuration: 0,
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
    const newDate = date
    setTaskData({...taskData, dueDate: newDate.toLocaleDateString('fr-FR') })
    console.log(date);
  }, [date])

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear().toString().slice(-2); 
    return `${month}/${day}/${year}`;
  };

  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split('/').map(Number);
    const fullYear = year + 2000; 
    return new Date(fullYear, month - 1, day); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handlEditTask(taskData, setTaskData, taskList, setTaskList);
    handleAddTaskPopup();
  };

  return (
    <>
      <div id="add-project-card" >
        <h3>Edit Task</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className="form-label" id="dueData-label" htmlFor="dueData">
            Due Date:
          </label>
          <br />
            <DatePicker onChange={setDate} value={date} clearIcon={null}></DatePicker>
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
          <label className="form-label" id="personAssigned-label" htmlFor="personAssigned">
            Person Assigned:
          </label>
          <select
            className="form-field"
            id="personAssigned"
            name="personAssigned"
            value={taskData.personAssigned}
            onChange={handleChange}
          >
            {teamMembers.map((member) => (
              <option>{member}</option>
            ))}
          </select>
          <br />
          <br />
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <br />
          <br />
        </form>
      </div>
    </>
  );
}
