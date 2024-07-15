import { useState } from "react";

export default function EditProject(props) {
  const project = props.project;
  const [projectData, setProjectData] = useState({
    budget: project.budget,
    workload: project.workload,
    daysToComplete: project.daysToComplete,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in projectData) {
      setProjectData({
        ...projectData,
        [name]: parseInt(value),
      });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:3000/projects/${project._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      console.log(response);
      props.project.budget = projectData.budget;
      props.project.daysToComplete = projectData.daysToComplete;
      props.project.workload = projectData.workload;
      props.handleEditProjectPopup();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div id="edit-project-card">
        <h5>Edit Project Details</h5>
        <br/>
        <form onSubmit={handleSubmit}>
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
          <br></br>
          <br></br>
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
          <label className="form-label" id="time-label" htmlFor="daysToComplete">
            Budget:
          </label>
          <input
            className="form-field"
            id="daysToComplete"
            name="daysToComplete"
            value={projectData.daysToComplete}
            onChange={handleChange}
            type="number"
          />
          <br></br>
          <br></br>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </>
  );
}
