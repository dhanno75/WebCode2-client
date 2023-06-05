import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../globals";

function UpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setFirstname(localStorage.getItem("fname"));
    setLastname(localStorage.getItem("lname"));
    setEmail(localStorage.getItem("email"));
    setRole(localStorage.getItem("userRole"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ firstname, lastname, email, role }),
      });
      await data.json();
      navigate("/userDetails");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container style={{ maxWidth: "500px" }}>
      <div className="log-form">
        <h2>User Registration</h2>
        <form>
          <input
            type="text"
            placeholder="Your Firstname"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />

          <input
            type="text"
            placeholder="Your Lastname"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            aria-label="Default select example"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ cursor: "pointer" }}
          >
            <option value="">Select User's Role</option>
            <option value="admin">admin</option>
            <option value="manager">manager</option>
            <option value="employee">employee</option>
          </select>

          <div className="login-btn">
            <button
              type="submit"
              className="btn"
              onClick={(e) => handleSubmit(e)}
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default UpdateUser;
