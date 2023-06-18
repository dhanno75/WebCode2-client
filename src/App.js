import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
// import Home from "./components/Home";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UserDetails from "./components/UserDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./components/ResetPassword";
import Signup from "./components/Signup";
import About from "./components/About";
import React, { Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Leads from "./components/Leads";
import UpdateUser from "./components/UpdateUser";
import MyLeads from "./components/MyLeads";
import AddLead from "./components/AddLead";
import UpdateLead from "./components/UpdateLead";

const DashboardComponent = React.lazy(() => import("./components/Dashboard"));

function App() {
  return (
    <div className="App">
      <Navigation />
      <ToastContainer />
      <Routes>
        <Route path="/about" element={<About />} />

        <Route
          path="/"
          element={
            <Suspense maxDuration={300}>
              <DashboardComponent />
            </Suspense>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route
          path="/myLeads"
          element={
            <ProtectedRoute>
              <MyLeads />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addLead"
          element={
            <ProtectedRoute>
              <AddLead />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userDetails"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateUser/:id"
          element={
            <ProtectedRoute>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateLead/:id"
          element={
            <ProtectedRoute>
              <UpdateLead />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
