import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UserDetails from "./components/UserDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./components/ResetPassword";
import Signup from "./components/Signup";
import React, { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Leads from "./components/Leads";

function App() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/userDetails");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <Navigation />
      <ToastContainer />
      <Routes>
        {/* <Route
          path="/navigation"
          element={
            <ProtectedRoute>
              <Navigation />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/leads" element={<Leads />} />
      </Routes>
    </div>
  );
}

export default App;
