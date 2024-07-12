import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dotenv from 'dotenv'
export default function SelectProject() {
  const user = "a";
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_PROJECTS_URL + user)
      .then((response) => response.json())
      .then((data) => {
        setProjectList(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <div>Your Projects</div>
      {projectList.length === 0 ? (
        <div>No projects found. Please create a new project!</div>
      ) : (
        projectList.map((proj) => (
          <Link key={proj._id} to="/Project">
            <div className="card card-container d-flex flex-row justify-content-start">
              <div className="project-name">{proj.name}</div>
              <div className="project-attributes">
                Team Size: {proj.teamSize}
              </div>
              <div className="project-attributes">
                Workload: {proj.workload}
              </div>
              <div className="project-attributes">
                Estimated Days to Completion: {proj.daysToComplete}
              </div>
            </div>
          </Link>
        ))
      )}
    </>
  );
}
