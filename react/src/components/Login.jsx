import React from 'react'

export default function Login() {
  return (
    <>
        <div>Login</div>
        <div>
        <form>
            <label htmlFor='username'>Username:</label>
            <input id="username" type="text" />
            <label htmlFor='password'>Password:</label>
            <input id="password" type="text" />
            <div>Register new account here</div>
        </form>
        </div>
    </>
  )
}
