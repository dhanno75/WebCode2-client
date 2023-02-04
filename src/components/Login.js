import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

function Login() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Submit");

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      setStatus("🔃 Loading...");
      fetch("http://localhost:4000/users/login", {
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
          setStatus("✅ Success");
          return data.json();
        })
        .then((data) => {
          localStorage.setItem("token", data.token);
          navigate("/");
        })
        .catch((err) => {
          setStatus("❌ Error");
        });
    },
  });

  return (
    <Container style={{ maxWidth: "500px" }}>
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email ? <div>{errors.email}</div> : null}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            minLength={6}
          />
          {errors.password ? <div>{errors.password}</div> : null}
        </Form.Group>
        <Link to="/forgotPassword" style={{ display: "block" }}>
          Forgot your password
        </Link>
        <Button variant="primary" type="submit">
          {status}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
