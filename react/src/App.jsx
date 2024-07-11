import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from "react-router-dom"

import Start from './components/Start'
import Login from './components/Login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      
    </Router>
    <Login></Login>
    </>
  )
}

export default App
