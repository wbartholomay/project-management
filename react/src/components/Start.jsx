import React from 'react'
import Cookies from 'js-cookie'

export default function Start() {
  const user = JSON.parse(Cookies.get("userInfo"));
  return (
    <>
    <h1>Welcome to Project Manager!</h1>
    </>
  )
}
