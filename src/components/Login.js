import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../globals";
import { loginSchema } from "../schemas";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        fetch(`${API}/users/login`, {
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
            toast.success("Login successfull");
            return data.json();
          })
          .then((data) => {
            localStorage.setItem("token", data.token);
            navigate("/");
          })
          .catch((err) => {
            toast.error("Invalid login credentials");
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
            onBlur={handleBlur}
          />
          {errors.email && touched ? <div>{errors.email}</div> : null}
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
          {errors.password && touched ? <div>{errors.password}</div> : null}
        </Form.Group>
        <div className="login-btn">
          <Button variant="primary" type="submit" className="mt-1">
            Login
          </Button>
          <Link to="/forgotPassword" className="link">
            Forgot your password?
          </Link>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
