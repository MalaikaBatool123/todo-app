import React from "react";

function SquareButton({text, property, className, icon}) {
    property = property || "light";
  return (
    <div className="button">
      <button className={`mx-1 btn btn-sm btn-outline-${property} ${className}` }>{icon} {text}</button>
    </div>
  );
}

export default SquareButton;
