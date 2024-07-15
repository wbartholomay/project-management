import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Start from "./components/Start";
import Login from "./components/Login";
import SelectProject from "./components/SelectProject";
import Project from "./components/Project.jsx";
import Task from "./components/Task";
import Register from "./components/Register";
import { AuthProvider } from "./hooks/AuthContext";
import RequireAuth from "./components/RequireAuth";
import AddProject from "./components/AddProject";
import Logout from "./components/Logout.jsx"
import AddTask from "./components/AddTask.jsx";

function App() {
  const [count, setCount] = useState(0);

  function navigateToStart(event) {
    event.preventDefault();
    window.location.href = "/";
  }

  //const {user} = userAuth();
  return (
    <>
      <Router>
        <AuthProvider>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a
                className="navbar-brand"
                href="#"
                onClick={(e) => {
                  navigateToStart(e);
                }}
              >
                Project Management
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/SelectProject">
                      Select a project
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/AddProject">
                          Add Project
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
              <div></div>
            </div>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="container-fluid">
              <div className="row">
                <div className="card-container">
                  <Routes>
                    <Route
                      exact
                      path="/"
                      element={
                        <RequireAuth>
                          <Start></Start>
                        </RequireAuth>
                      }
                    ></Route>
                    <Route path="/Login" element={<Login />} />
                    <Route
                      path="/SelectProject"
                      element={
                        <RequireAuth>
                          <SelectProject></SelectProject>
                        </RequireAuth>
                      }
                    ></Route>
                    <Route
                      path="/Project"
                      element={
                        <RequireAuth>
                          <Project></Project>
                        </RequireAuth>
                      }
                    ></Route>
                    <Route
                      path="/AddProject"
                      element={
                        <RequireAuth>
                          <AddProject></AddProject>
                        </RequireAuth>
                      }
                    ></Route>
                    <Route
                      path="/AddTask"
                      element={
                        <RequireAuth>
                          <AddTask></AddTask>
                        </RequireAuth>
                      }
                    ></Route>
                    <Route
                      path="/Task"
                      element={
                        <RequireAuth>
                          <Task></Task>
                        </RequireAuth>
                      }
                    ></Route>
                    <Route
                      path="/Register"
                      element={<Register></Register>}
                    ></Route>
                    <Route path="/Logout" element={<Logout></Logout>}></Route>
                  </Routes>
                </div>
              </div>
            </div>
          </main>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
