import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dotenv from "dotenv";
import { useAuth } from "../hooks/AuthContext";
import Cookies from 'js-cookie';

export default function SelectProject() {
  // const { user } = useAuth();
  const user = JSON.parse(Cookies.get('userInfo'));
  console.log(user);
  console.log(user.username);
  if (!user) {
    return <div>Error fetching login credentials, please login again</div>;
  }
  const username = user.username;
  const [projectList, setProjectList] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentProj, setCurrentProj] = useState("");
  function handleConfirmOpen(projId = ""){
    setIsConfirmOpen(!isConfirmOpen);
    setCurrentProj(projId);
  }

  async function handleDelete(event){
    event.preventDefault();
    const projId = currentProj;
    console.log(projId);
    try {
      const response = await fetch(`${import.meta.env.VITE_PROJECTS_URL}${projId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete request failed:', errorText);
        alert("Item could not be deleted!");
        return;
      }
  
      setProjectList((prevProjectList) => 
          prevProjectList.filter((project) => project._id !== projId)
      );
      handleConfirmOpen();
    } catch (error) {
      console.error('Error during fetch:', error);
      alert("An error occurred while trying to delete the item!");
    }
  }

  useEffect(() => {
    fetch(import.meta.env.VITE_PROJECTS_URL + username)
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
    {isConfirmOpen && (
        <div id="add-task-card" className="card">
          <button
            onClick={handleConfirmOpen}
            className="btn-primary close-popup"
          >
            X
          </button>
          <h4>CONFIRM DELETION</h4>
          <button onClick={(e) => handleDelete(e)}>CONFIRM</button>
        </div>
      )}
      <div>Your Projects</div>
      {projectList.length === 0 ? (
        <div>No projects found. Please create a new project!</div>
      ) : (
        projectList.map((proj) => (
          <>
          <Link key={proj._id} to="/Project" state={proj}>
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
          <button onClick={(e) => handleConfirmOpen(proj._id)}>Delete</button>
          </>
        ))
      )}
    </>
  );
}
