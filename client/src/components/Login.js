import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div style={{ display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center", height: "95vh" }}>

      <h1 style={{marginBottom: "20px"}}>Login</h1>
        
      <Link style={{ textDecoration: "none"}} to="http://localhost:8000/auth/google">
      <button className="btn btn-lg btn-outline-light">
      Login with Google
      </button>
      </Link>
    </div>
  )
}

export default Login