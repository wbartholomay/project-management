import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
// import { useNavigate } from 'react-router-dom';

// Creating an authentication context
const AuthContext = createContext(null);

// Auth provider component that wraps your app components
export const AuthProvider = ({ children }) => {
  //const [user, setUser] = useState(null);
  let user = {};

  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.uid) {
        console.log("setting user");
        user = {
          username,
          uid: data.uid,
        };
        Cookies.set("userInfo", JSON.stringify(user), { expires: 7 });
        // setUser({
        //     username,
        //     uid: data.uid // Storing the uid returned from the server
        // });
        return true;
      } else {
        return false;
        //throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      window.location.href = "/";
    }
  };

  const logout = () => {
    try {
      Cookies.remove("userInfo");
      alert("Successfully Logged Out. Returning to Login.")
    } catch (err) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use authentication
export const useAuth = () => useContext(AuthContext);
