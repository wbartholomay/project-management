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
import EditProject from "./EditProject";
import EditTask from "./EditTask"
import Cookies from "js-cookie"


const Project = () => {
  const [taskList, setTaskList] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState("");
  const location = useLocation();
  const project = location.state || {};
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddMembersOpen, setIsAddMembersOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);

  const {username} = JSON.parse(Cookies.get('userInfo'));
  const isManager = username === project.manager;

  function handleAddTaskPopup() {
    setIsAddTaskOpen(!isAddTaskOpen);
  }
  function handleAddMembersPopup() {
    setIsAddMembersOpen(!isAddMembersOpen);
  }
  function handleEditProjectPopup() {
    setIsEditProjectOpen(!isEditProjectOpen);
  }
  function handleEditTaskPopup(taskId = "" ) {
    setIsEditTaskOpen(!isEditTaskOpen);
    setCurrentTaskId(taskId);
  }

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
          <AddTask
            projectId={project._id}
            taskList={taskList}
            setTaskList={setTaskList}
            teamMembers={project.teamMembers}
            handleAddTaskPopup={handleAddTaskPopup}
          ></AddTask>
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
          <AddTeamMember
            id={project._id}
            teamMembers={project.teamMembers}
            handleAddMembersPopup={handleAddMembersPopup}
          />
        </div>
      )}
      {isEditProjectOpen && (
        <div id="add-task-card" className="card">
          <button
            onClick={handleEditProjectPopup}
            className="btn-primary close-popup"
          >
            X
          </button>
          <EditProject
            project={project}
            handleEditProjectPopup={handleEditProjectPopup}
          />
        </div>
      )}
      <p>Project Editor</p>
      {isEditTaskOpen && (
        <div id="add-task-card" className="card">
          <button
            onClick={handleEditTaskPopup}
            className="btn-primary close-popup"
          >
            X
          </button>
          <EditTask
            taskId={currentTaskId}
            taskList={taskList}
            setTaskList={setTaskList}
            teamMembers={project.teamMembers}
            handleEditTask={handleEditTask}
            handleEditTaskPopup={handleEditTaskPopup}
          />
        </div>
      )}
      <div>
        <div id="project-name-card" className="card">
          <h1>{project.name}</h1>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6 bg-light border">
              <h5>Team Members:</h5>
                {project.teamMembers.map((member) => (
                  <p key={member}>{member}</p>
                ))}
              <button
                type="submit"
                className="button-main"
                onClick={handleAddMembersPopup}
              >
                Add Member
              </button>
            </div>
            <div className="col-md-6 bg-light border">
              <h5>Project Details:</h5>
              <p>Budget: ${project.budget}</p>
              <p>Workload: {project.workload}</p>
              <p>Time to Complete: {project.daysToComplete} days</p>
              <button type="submit"
                className="button-main"
                onClick={handleEditProjectPopup}>
                  Edit
                </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h2>Tasks</h2>
      <div className="container">
        { isManager &&
        <button onClick={handleAddTaskPopup} className="button-main">
          Add Task
        </button>}
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
                    handleEditTaskPopup={handleEditTaskPopup}
                    isManager={isManager}
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
                    handleEditTaskPopup={handleEditTaskPopup}
                    isManager={isManager}
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
