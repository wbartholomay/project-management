import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie'

export default function addTeamMember(){
    const [member, setMember] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch("http://127.0.0.1:3000/projects", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: {}
          });
    
          const data = await response.json();
          console.log(data);
          alert("Project Successfully Added.");
          setProjectData({
            name: "",
            manager: user.username,
            teamMembers: [user.username],
            teamSize: 0,
            budget: 0,
            workload: 1,
            daysToComplete: -1,
          });
        } catch (err) {
          console.error(err);
        }
      };

    return (<>
    
    </>)
};