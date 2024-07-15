import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function AddTeamMember(props) {
  const [member, setMember] = useState();
  const id = props.id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/projects/${id}/addMember`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: { member: member },
        }
      );

      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="form-label" id="member-label" htmlFor="member">
          Enter New Team Member:
        </label>
        <input
          className="form-field"
          id="member"
          name="member"
          value={member}
          onChance={setMember}
          type="text"
        />
        <button type="submit" className="btn btn-primary">
            Add Member
        </button>
      </form>
    </>
  );
}
