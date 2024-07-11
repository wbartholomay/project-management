import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
        <div id='login-card' className='card'>
        <h3>Login</h3>
        <form>
            <label id='username-label' htmlFor='username'>Username:</label>
            <input id="username" type="text" />
            <br></br>
            <br></br>
            <label id='password-label' htmlFor='password'>Password:</label>
            <input id="password" type="text" />
            <br /><br />
            <Link to="/register">Register new account here</Link>
        </form>
        </div>
    </>
  )
}
