import React from "react";
import "../assets/css/TaskCard.css";
import "../assets/css/MainPage.css";
import SquareButton from "./SquareButton";
function TaskCard() {
  return (
    <div className="task-card">
      <div className="task-head">
        <h2 className="title">
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Exercitationem, voluptas.
        </h2>
        <p className="due-date">24-nov-2025</p>
      </div>
      <p className="description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
        tenetur minus nesciunt nostrum? Nisi, assumenda. Ullam, tenetur?
        Provident, esse cum? Lorem ipsum, dolor sit amet consectetur adipisicing
        elit. Vitae tempore debitis libero architecto corporis quod deserunt
        iste labore id minus?
      </p>
      <div className="content-end-row">
        <SquareButton text="Edit" property={"info"} />
        <SquareButton text="Delete" property={"danger"} />
        <SquareButton text="Mark as completed" />
      </div>
    </div>
  );
}

export default TaskCard;
