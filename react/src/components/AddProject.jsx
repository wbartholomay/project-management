import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'

export default function AddProject() {
  // const { user } = useAuth();
  const user = JSON.parse(Cookies.get('userInfo'));
  const navigate = useNavigate()
  const [projectData, setProjectData] = useState({
    name: "",
    manager: user.username,
    teamMembers: [user.username],
    teamSize: 0,
    budget: 0,
    workload: 1,
    daysToComplete: -1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (name in projectData) {
      setProjectData({
        ...projectData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:3000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();
      console.log(data);
      alert("Project Successfully Added.");
      setProjectData({
        name: "",
        manager: user.username,
        teamMembers: [user.username],
        teamSize: 0,
        budget: 0,
        workload: 1,
        daysToComplete: -1,
      });
      navigate("/SelectProject") 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div id="add-project-card" className="form-card">
        <h3>Add Project</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className="form-label" id="name-label" htmlFor="username">
            Name:
          </label>
          <input
            className="form-field"
            id="name"
            name="name"
            value={projectData.name}
            onChange={handleChange}
            type="text"
          />
          <br></br>
          <br></br>
          {/* <label className="form-label" id="team-members-label" htmlFor="budget">
            Team Members:
          </label>
          <input
            className="form-field"
            id="team-members"
            name="teamMembers"
            value={projectData.teamMembers}
            onChange={handleChange}
            type="text"
          />
          <br />
          <br /> */}
          <label className="form-label" id="budget-label" htmlFor="budget">
            Budget:
          </label>
          <input
            className="form-field"
            id="budget"
            name="budget"
            value={projectData.budget}
            onChange={handleChange}
            type="number"
          />
          <br />
          <br />
          <label className="form-label" id="workload-label" htmlFor="workload">
            Workload:
          </label>
          <select
            className="form-field"
            id="workload"
            name="workload"
            value={projectData.workload}
            onChange={handleChange}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>5</option>
            <option>8</option>
            <option>13</option>
          </select>
          <br />
          <br />
          <label className="form-label" id="time-label" htmlFor="budget">
            Time To Complete:
          </label>
          <input
            className="form-field"
            id="time"
            name="timeToComplete"
            value={projectData.timeToComplete}
            onChange={handleChange}
            type="number"
          />
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
