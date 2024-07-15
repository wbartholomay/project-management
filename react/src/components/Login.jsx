import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  // const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {from} = location.state || { from: { pathname: "/" } };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      console.log(username, password);
      const loginSucceeded = await login(username, password);
      if (loginSucceeded) {
        alert("Success.");
        navigate(from.pathname);
      } else {
        setUsername("");
        setPassword(""); 
        alert("Username or password are incorrect.");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div id="login-card" className="card">
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <br />
          <br />
          <Link to="/register">Register new account here</Link>
        </form>
      </div>
    </>
  );
}
