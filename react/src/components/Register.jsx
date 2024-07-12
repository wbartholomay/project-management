import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password == confirmedPassword) {
      const response = await fetch('')
    } else {
      alert("Passwords do not match.");
      setPassword("");
      setConfirmedPassword("");
    }
    console.log(username, password);
  };

  return (
    <>
      <div id="register-card" className="card">
        <h3>Register</h3>
        <form onSubmit={handleRegister}>
          <label id="username-label" htmlFor="username">
            Username:
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br></br>
          <br></br>
          <label id="password-label" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <label id="confirm-password-label" htmlFor="confirm-password">
            Confirm Password:
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit" className="btn btn-primary">Register</button>
          <br />
          <br />
          <Link to="/login">Already have an account? Login here</Link>
        </form>
      </div>
    </>
  );
}
