import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function AddProject() {

    const [projectData, setProjectData] = useState({
        name : "",
        teamMembers : [],
        teamSize : 0,
        budget : undefined,
        workload : undefined,
        daysToComplete : undefined
    })

    const handleSubmit = async (event) => {
        try{
            event.preventDefault();
            console.log(event.currentTarget.elements)
            const formData = new FormData(event.target);
            const formObj = {}
            formData.forEach((value, key) => {
                formObj[key] = value;
            });
            console.log(formData);
            const response = await fetch("http://127.0.0.1:3000/projects", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(formObj)
            });
            console.log(response);
        }
        catch(err){
            console.error(err);
        }

    }

  return (
    <>
      <div id="add-project-card" className="form-card">
        <h3>Add Project</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className="form-label" id="name-label" htmlFor="username">
            Name:
          </label>
          <input className="form-field" id="name" type="text" />
          <br></br>
          <br></br>
          <label className="form-label" id="budget-label" htmlFor="budget">
            Budget:
          </label>
          <input className="form-field" id="budget" type="number" />
          <br />
          <br />
          <label className="form-label" id="workload-label" htmlFor="workload">
            Workload:
          </label>
          <input className="form-field" id="workload" type="number" />
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
