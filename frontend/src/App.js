import "./app.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";
import Complaint from "./components/user/Complaint";
import Status from "./components/user/Status";
import AdminHome from "./components/admin/AdminHome";
import AgentHome from "./components/agent/AgentHome";
import UserInfo from "./components/admin/UserInfo";
import AgentInfo from "./components/admin/AgentInfo";
import Home from "./components/common/Home";
import HomePage from "./components/user/HomePage"; // <-- Dashboard layout

function App() {
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        {isLoggedIn ? (
          <>
            <Route path="/AgentInfo" element={<AgentInfo />} />
            <Route path="/AgentHome" element={<AgentHome />} />
            <Route path="/UserInfo" element={<UserInfo />} />
            <Route path="/AdminHome" element={<AdminHome />} />

            {/* Layout route for logged-in user */}
            <Route path="/Homepage" element={<HomePage />}>
              <Route index element={<Complaint />} />
              <Route path="Complaint" element={<Complaint />} />
              <Route path="Status" element={<Status />} />
            </Route>
          </>
        ) : (
          <Route path="*" element={<Navigate to="/Login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
