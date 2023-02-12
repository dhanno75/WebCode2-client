import React, { useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { role } = useSelector((state) => state.user);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Library</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {token && (role === "admin" || role === "manager") ? (
                <Button onClick={() => navigate("/Signup")}>Signup</Button>
              ) : (
                <Button onClick={() => navigate("/Login")}>Login</Button>
              )}

              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
