import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function AddProject() {

    const handleSubmit = async (event) => {
        try{
            event.preventDefault();
            const formData = new FormData(event.target);
            const fromObj = {}
            formData.forEach((value, key) => {
                formObj[key] = value;
            });
            console.log(formObj);
            const response = await fetch("http://127.0.0.1:3000/projects", )
        }
        catch(err){
            console.error(err);
        }

    }

  return (
    <>
      <div id="add-project-card" className="form-card">
        <h3>Add Project</h3>
        <form onSubmit="">
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
