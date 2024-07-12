import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {user, login} = useAuth()
  // const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    await login(username, password);
    if(user){
      console.log(username, password);
      navigate("/");
    }
    else{
      setUsername("");
      setPassword("");
      alert("Username or password are incorrect.")
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
          <button type="submit" className="btn btn-primary">Login</button>
          <br />
          <br />
          <Link to="/register">Register new account here</Link>
        </form>
      </div>
    </>
  );
}
