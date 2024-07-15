import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { handleAddTask } from "./ProjectTask";
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function EditTask({ taskId, taskList, setTaskList, teamMembers, handleEditTask, handleEditTaskPopup}) {
  // const { user } = useAuth();
  const task = taskList.find(task => task._id === taskId);


  const [day, month, year] = task.dueDate.split('/');

  const [date, setDate] = useState(new Date(year, month - 1, day));
  const [taskData, setTaskData] = useState(task);
  console.log(taskData);

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


  const handleSubmit = async (event) => {
    event.preventDefault();
    handleEditTask(taskData, setTaskData, taskList, setTaskList);
    handleEditTaskPopup();
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
