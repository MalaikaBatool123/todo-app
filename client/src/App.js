import "./App.css";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import AddTask from "./components/AddTask";
import Sidebar from "./components/Sidebar";
function App() {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <>
      {/* {!isAuthenticated && 
     <button onClick={loginWithRedirect}>login</button>
    } */}
      <Router>
        <div className="d-flex">
          <Sidebar />
          <div className="main-page" style={{ width: "100%",borderLeft: "1px solid #42434a" , padding: "min(3em, 15%)"}}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/pending" element={<MainPage />} />
            <Route path="/completed" element={<MainPage />} />
            <Route path="/due-today" element={<MainPage />} />
            <Route path="/add-task" element={<AddTask />} />{" "}
            {/* Add new task */}
            <Route path="/updateTask/:id" element={<AddTask />} />{" "}
            {/* Edit task */}
          </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
