import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function AddProject() {
  const [projectData, setProjectData] = useState({
    name: "",
    teamMembers: [],
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
      console.log(data)
      alert("Project Successfully Added.")
      setProjectData({
        name: "",
        teamMembers: [],
        teamSize: 0,
        budget: 0,
        workload: 1,
        daysToComplete: -1,
      });
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
