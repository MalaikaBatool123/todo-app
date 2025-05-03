import React from "react";
import SquareButton from "./SquareButton";
import { useNavigate } from "react-router-dom";
function UnAuthorized() {
  const navigate = useNavigate();

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
      <div className="error" style={{ fontSize: "100px" }}>
        401
      </div>
      <h1>unauthorized</h1>
      <SquareButton text="Go Back" onClick={() => navigate("/")} />
    </div>
  );
}

export default UnAuthorized;
