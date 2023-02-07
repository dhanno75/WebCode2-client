import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../globals";
import { signUpSchema } from "../schemas";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: "",
};

function Signup() {
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        fetch(`${API}/users/signup`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((data) => {
            if (data.status === 401) {
              throw new Error(data.statusText);
            }
            action.resetForm();
            navigate("/");
            return data.json();
          })
          .catch((err) => {
            alert("Something went wrong. Please try again later");
          });
      },
    });

  return (
    <Container style={{ maxWidth: "500px" }}>
      <Form className="mt-5" onSubmit={handleSubmit}>
        <h2>User Registration</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Firstname"
            name="firstname"
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.firstname && touched.firstname ? (
            <p>{errors.firstname}</p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Lastname"
            name="lastname"
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.lastname && touched.lastname ? (
            <p>{errors.lastname}</p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? <p>{errors.email}</p> : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            minLength={6}
          />
          {errors.password && touched.password ? (
            <p>{errors.password}</p>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Role</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="role"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select User's Role</option>
            <option value="admin">admin</option>
            <option value="manager">manager</option>
            <option value="employee">employee</option>
          </Form.Select>
          {errors.role && touched.role ? <p>{errors.role}</p> : null}
        </Form.Group>

        <div className="login-btn">
          <Button variant="primary" type="submit" className="mt-1">
            Signup
          </Button>
          <Link to="/forgotPassword" className="link">
            Forgot your password?
          </Link>
        </div>
      </Form>
    </Container>
  );
}

export default Signup;
