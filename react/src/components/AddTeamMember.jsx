import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function AddTeamMember(props) {
  const [member, setMember] = useState("");
  const id = props.id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(member);
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/projects/${id}/addMember`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ member: member }),
        }
      );

      console.log(response)
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
          onChange={(e) => setMember(e.target.value)}
          type="text"
        />
        <button type="submit" className="btn btn-primary">
            Add Member
        </button>
      </form>
    </>
  );
}
