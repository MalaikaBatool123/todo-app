import React from "react";

function SquareButton({text, property, className, icon, onClick}) {
    property = property || "light";
  return (
    <div className="button">
      <button onClick={onClick} className={`mx-1 mb-1 btn btn-sm btn-outline-${property} ${className}` }>{icon} {text}</button>
    </div>
  );
}

export default SquareButton;
