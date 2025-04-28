import React from "react";
import "../assets/css/MainPage.css";
import Sidebar from "../components/Sidebar";
import ContentArea from "../components/ContentArea";
function MainPage() {
  return (
    <>
      <div className="main-page container-fluid">
        <div className="main-page-content">
            <Sidebar/>
            <ContentArea/>
        </div>
      </div>
    </>
  );
}

export default MainPage;
