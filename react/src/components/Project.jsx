import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddTeamMember from "./AddTeamMember";
import Task from "./Task";
import {
  handleEditTask,
  handleDeleteTask,
  handleSwitchTask,
} from "./ProjectTask";
import TaskButtons from "./TaskButtons";
import AddTask from "./AddTask";
const Project = () => {
  const [taskList, setTaskList] = useState([]);
  const [completetionTime, setCompletionTime] = useState(-1);
  const location = useLocation();
  const project = location.state || {};

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isGenerateTimeOpen, setIsGenerateTimeOpen] = useState(false);
  const [isAddMembersOpen, setIsAddMembersOpen] = useState(false)
  function handleAddTaskPopup() {
    setIsAddTaskOpen(!isAddTaskOpen);
  }
  function handleTimePopup() {
    setIsGenerateTimeOpen(!isGenerateTimeOpen);
  }
  function handleAddMembersPopup(){
    setIsAddMembersOpen(!isAddMembersOpen);
  }

  const generateTime = async () => {
    //generates predicted completion time, opens popup window and displays it there
    try {
      const response = await fetch("http://localhost:3000/predictTime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      const data = await response.json();
      const prediction = parseInt(data.daysToComplete, 10);
      setCompletionTime(prediction);
      handleTimePopup();
      console.log(isGenerateTimeOpen);
      console.log(prediction);
    } catch (err) {
      console.log(err);
    }
  };

  const setTime = async () => {
    //function for setting time in database, called upon confirming the generated time
    try {
      const response = await fetch(
        `http://localhost:3000/projects/${project._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ daysToComplete: completetionTime }),
        }
      );
      project.daysToComplete = completetionTime;
      setIsGenerateTimeOpen();

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(project);
  useEffect(() => {
    fetch(import.meta.env.VITE_TASKS_URL + project._id)
      .then((response) => response.json())
      .then((data) => {
        setTaskList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [location]);
  if (!project) {
    return <div>No project data available.</div>;
  }

  return (
    <>
      {isAddTaskOpen && (
        <div id="add-task-card" className="card">
          <button
            onClick={handleAddTaskPopup}
            className="btn-primary close-popup"
          >
            X
          </button>
          <AddTask projectId={project._id} taskList={taskList} setTaskList={setTaskList}></AddTask>
        </div>
      )}
      {isGenerateTimeOpen && (
        <div id="add-task-card" className="card">
          <button onClick={handleTimePopup} className="btn-primary close-popup">
            X
          </button>
          <div id="generated-time-card">
            <h5>Generated Time: </h5>
            <p>{completetionTime}</p>
            <p>Press Confirm to Update the Completion Time.</p>
            <button onClick={setTime} className="btn btn-primary">
              Confirm
            </button>
          </div>
          {/* <button onClick="" className="btn btn-primary">confirm change</button> */}
        </div>
      )}
      {isAddMembersOpen && (
        <div id="add-task-card" className="card">
          <button
            onClick={handleAddMembersPopup}
            className="btn-primary close-popup"
          >
            X
          </button>
          <AddTeamMember id={project._id} teamMembers={project.teamMembers} handleAddMembersPopup={handleAddMembersPopup}/>
        </div>
      )}
      <div>
        <h1>{project.name}</h1>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 bg-light border">
              <h5>Team Members:</h5>
              <u1>
                {project.teamMembers.map((member, index) => (
                  <p>{member}</p>
                ))}
              </u1>
              <button type="submit"
                className="btn btn-primary"
                onClick={handleAddMembersPopup}>Add</button>
            </div>
            <div className="col-md-6 bg-light border">
              <h5>Project Details:</h5>
              <p>Workload: {project.workload}</p>
              <p>Time to Complete: {project.daysToComplete} days</p>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={generateTime}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h2>Tasks</h2>
      <div className="container mt-5">
        <button onClick={handleAddTaskPopup} className="btn-primary">
          Add Task
        </button>
        <div className="row">
          <div className="col-md-6 bg-light border">
            <h4 className="text-center">To Do</h4>
            {taskList
              .filter((task) => !task.isComplete)
              .map((task) => (
                <div key={task._id} className="card task-card">
                  <TaskButtons
                    task={task}
                    taskList={taskList}
                    setTaskList={setTaskList}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    handleSwitchTask={handleSwitchTask}
                  ></TaskButtons>
                  <Task task={task} />
                </div>
              ))}
          </div>
          <div className="col-md-6 bg-light border">
            <h4 className="text-center">Complete</h4>
            {taskList
              .filter((task) => task.isComplete)
              .map((task) => (
                <div key={task._id} className="card task-card">
                  <TaskButtons
                    task={task}
                    taskList={taskList}
                    setTaskList={setTaskList}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    handleSwitchTask={handleSwitchTask}
                  ></TaskButtons>
                  <Task task={task} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
