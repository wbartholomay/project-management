import React, { useState, useEffect } from 'react';

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
            
            {
                projectList.map((proj) => (
                    <div key={proj.id} className='card-container d-flex flex-row justify-content-start'>
                        <div>Team Members: {proj.teamMembers.join(', ')}</div>
                        <div>Team Size: {proj.teamSize}</div>
                        <div>Budget: {proj.budget}</div>
                        <div>Workload: {proj.workload}</div>
                        <div>Days to complete: {proj.daysToComplete}</div>
                    </div>
                ))
            }
        </>
    )
}
 