import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";

import Start from "./components/Start";
import Login from "./components/Login";
import SelectProject from "./components/SelectProject";
import Project from "./components/Project";
import Task from "./components/Task";
import Register from "./components/Register";
import { AuthProvider } from "./hooks/AuthContext";
import RequireAuth from "./components/RequireAuth";

function App() {
  const [count, setCount] = useState(0);
  //const {user} = userAuth();
  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
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
                      <Link className="dropdown-item" to="/add">
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
                  <a className="nav-link disabled" aria-disabled="true">
                    Disabled
                  </a>
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
                <AuthProvider>
                  <Routes>
                    <Route exact path="/" element={<Start></Start>}></Route>
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
                  </Routes>
                </AuthProvider>
              </div>
            </div>
          </div>
        </main>
      </Router>
    </>
  );
}

export default App;
