import "./App.css";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const {user, loginWithRedirect, isAuthenticated} = useAuth0();
  return (
    <>
    {/* {!isAuthenticated && 
     <button onClick={loginWithRedirect}>login</button>
    } */}
      <Router>
        <Routes>
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
