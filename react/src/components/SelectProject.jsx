import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
export default function SelectProject() {
    const [projectList, setProjectList] = useState([]);
    
    useEffect(() => {
        const project = {
            name: "Page",
            teamMembers: ["jsmith", "ljones", "wjames"],
            teamSize: 3,
            budget: 10000,
            workload: 8,
            daysToComplete: 15,
            taskIds: [],
        };
        
        let dummyList = [];
        for (let i = 0; i < 10; i++) {
            dummyList.push({...project, id: i}); // Adding unique id
        }
        setProjectList(dummyList);
    }, []); // Empty dependency array to run only once on mount

    return (
      <>
        <div>Your Projects</div>

        {projectList.map((proj) => (
          <Link key={proj.id} to="/Project">
            <div className="card card-container d-flex flex-row justify-content-start">
              <div className='project-name'>{proj.name}</div>
              <div className='project-attributes'>Team Size: {proj.teamSize}</div>
              <div className='project-attributes'>Workload: {proj.workload}</div>
              <div className='project-attributes'>Estimated Days to Completion:{proj.daysToComplete}</div>
            </div>
          </Link>
        ))}
      </>
    );
}
 