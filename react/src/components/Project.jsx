import React from "react";
import { useEffect, useState, useReducer } from "react";
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
import EditTask from "./EditTask";
import Cookies from "js-cookie";

const Project = () => {
  const [taskList, setTaskList] = useState([]);
  const [, forceUpdate] = useReducer(x => x+1, 0)
  const [currentTaskId, setCurrentTaskId] = useState("");
  const [taskListSortedBy, setTaskListSortedBy] = useState("Last Modified");
  const location = useLocation();
  const project = location.state || {};
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddMembersOpen, setIsAddMembersOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);

  const { username } = JSON.parse(Cookies.get("userInfo"));
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
  function handleEditTaskPopup(taskId = "") {
    setIsEditTaskOpen(!isEditTaskOpen);
    setCurrentTaskId(taskId);
  }

  function handleSortingField(e) {
    e.preventDefault();
    setTaskListSortedBy(e.target.value);
    //sortList();
  }

  function handleSortingSubmit(e) {
    e.preventDefault();
    sortList();
  }

  useEffect(() => sortList, [taskListSortedBy]);

  function sortList() {
    console.log("state changed:" + taskListSortedBy);
    switch (taskListSortedBy) {
      case "Estimated Duration":
        setTaskList(
          taskList.sort((a, b) => a.estimatedDuration - b.estimatedDuration)
        );
        break;
      case "Person Assigned":
        setTaskList(
          taskList.sort((a, b) => {
            if (a.personAssigned < b.personAssigned) {
              return -1;
            }
            if (a.personAssigned > b.personAssigned) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "Due Date":
        setTaskList(
          taskList.sort((a, b) => {
            const [aDay, aMonth, aYear] = a.dueDate.split("/");
            const [bDay, bMonth, bYear] = b.dueDate.split("/");
            const aDate = new Date(aYear, aMonth - 1, aDay);
            const bDate = new Date(bYear, bMonth - 1, bDay);
            return aDate - bDate;
          })
        );
        break;
      default:
        break;
    }
    forceUpdate();
  }

  // console.log(project);
  useEffect(() => {
    fetch(import.meta.env.VITE_TASKS_URL + project._id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (isManager) {
          setTaskList(data);
        } else {
          setTaskList(data.filter((task) => task.personAssigned === username));
        }
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
      {/* <p>Project Editor</p> */}
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
              {project.teamMembers &&
                project.teamMembers.map((member) => <p>{member}</p>)}
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
              <button
                type="submit"
                className="button-main"
                onClick={handleEditProjectPopup}
              >
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
        {isManager && (
          <button onClick={handleAddTaskPopup} className="button-main">
            Add Task
          </button>
        )}
        <br />
        <form onSubmit={handleSortingSubmit}>
          <label className="form-label" id="workload-label" htmlFor="workload">
            Sort Tasks By:
          </label>
          <select
            className="form-field"
            id="sortedBy"
            name="sortedBy"
            value={taskListSortedBy}
            onChange={handleSortingField}
          >
            <option>Estimated Duration</option>
            <option>Due Date</option>
            <option>Person Assigned</option>
          </select>
          <button type="submit" className="button-secondary">Sort</button>
        </form>
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
