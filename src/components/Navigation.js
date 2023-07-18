import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
import Logo from "../images/logo.png";
import { FaPowerOff } from "react-icons/fa";
// import { Link } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("lname");
    localStorage.removeItem("fname");
    localStorage.removeItem("email");
    localStorage.removeItem("userRole");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("serviceRequest");
    localStorage.removeItem("status");
    localStorage.removeItem("company");
    localStorage.removeItem("leademail");
    localStorage.removeItem("leadname");

    // toast.warn("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "#d2d2d2",
          position: "fixed",
          top: 0,
          width: "100%",
          height: "80px",
        }}
        expand="lg"
      >
        <Container fluid style={{ padding: "0 20px" }}>
          <Link to="/" className="navbar-brand logo-wrapper">
            <img src={Logo} alt="crm logo" className="logo" />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {token ? (
                <Link to="/dashboard" className="nav-link crm-links">
                  Dashboard
                </Link>
              ) : (
                ""
              )}

              {token && (role === "admin" || role === "manager") ? (
                <Link to="/userDetails" className="nav-link crm-links">
                  All Users
                </Link>
              ) : (
                <Link to="/" className="nav-link crm-links">
                  About
                </Link>
              )}

              {token && (role === "admin" || role === "manager") ? (
                <Link to="/leads" className="nav-link crm-links">
                  All Leads
                </Link>
              ) : token && role === "employee" ? (
                <Link to="/myLeads" className="nav-link crm-links">
                  My Leads
                </Link>
              ) : (
                ""
              )}
            </Nav>

            <div className="users-link">
              {token && role === "admin" ? (
                <Link to="/signup" className="nav-link crm-links">
                  Add User
                </Link>
              ) : (
                ""
              )}
              {token && role ? (
                <FaPowerOff onClick={handleLogout} className="logout" />
              ) : (
                <div style={{ fontSize: "21px" }}>
                  <Link to="/login" className="nav-link crm-links">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
