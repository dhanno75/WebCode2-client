import React, { useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/userDetails");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    toast.warn("Logged out successfully!");
    navigate("/");
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Link to="/" className="navbar-brand">
            CRM
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {token && (role === "admin" || role === "manager") ? (
                <Link to="/signup" className="nav-link">
                  Add User
                </Link>
              ) : (
                ""
              )}

              {token && (role === "admin" || role === "manager") ? (
                <Link to="/leads" className="nav-link">
                  All Leads
                </Link>
              ) : (
                ""
              )}
            </Nav>

            <div className="d-flex">
              {token && role === "admin" ? (
                <Link to="/userDetails" className="nav-link">
                  Users
                </Link>
              ) : (
                ""
              )}
              {token && role ? (
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <div style={{ fontSize: "24px" }}>😃</div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
