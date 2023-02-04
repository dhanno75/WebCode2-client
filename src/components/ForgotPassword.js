import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

function ForgotPassword() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Submit");

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      setStatus("🔃 Loading...");
      fetch("http://localhost:4000/users/forgotPassword", {
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
          navigate("/login");
          toast.success("Reset password link sent to your email successfully!");
          return data.json();
        })
        .catch((err) => {
          toast.warn("Something went wrong. Please try after sometime.");
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
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ForgotPassword;
