import React from "react";

function Login() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "95vh",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Login</h1>

      <a
        href="http://localhost:8000/auth/google"
        style={{ textDecoration: "none" }}
      >
        <button className="btn btn-lg btn-outline-light">
          Login with Google
        </button>
      </a>
    </div>
  );
}

export default Login;
