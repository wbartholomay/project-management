import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <>
        <div id='register-card' className='card'>
        <h3>Register</h3>
        <form>
            <label id='username-label' htmlFor='username'>Username:</label>
            <input id="username" type="text" />
            <br></br>
            <br></br>
            <label id='password-label' htmlFor='password'>Password:</label>
            <input id="password" type="text" />
            <br /><br />
            <label id='confirm-password-label' htmlFor='confirm-password'>Confirm Password:</label>
            <input id="confirm-password" type="text" />
            <br /><br />
            <Link to="/login">Already have an account? Login here</Link>
        </form>
        </div>
    </>
  )
}
