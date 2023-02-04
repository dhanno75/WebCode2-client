import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.password)
  ) {
    errors.password = "Invalid password";
  }

  return errors;
};

function ResetPassword() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Submit");

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      setStatus("🔃 Loading...");
      fetch("http://localhost:4000/users/resetPassword/:token", {
        method: "PUT",
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
          toast.success("Password was updated successfully!");
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
            type="password"
            placeholder="Enter your new password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password ? <div>{errors.password}</div> : null}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ResetPassword;
