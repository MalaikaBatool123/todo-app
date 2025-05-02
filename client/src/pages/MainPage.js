import React from "react";
import "../assets/css/MainPage.css";
import ContentArea from "../components/ContentArea";
function MainPage() {
  return (
    <>
      <div className="main-page container-fluid">
        <div className="main-page-content">
            <ContentArea/>
        </div>
      </div>
    </>
  );
}

export default MainPage;
