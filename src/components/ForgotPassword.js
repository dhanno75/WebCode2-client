import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../globals";
import { forgotPasswordEmailSchema } from "../schemas";

const initialValue = {
  email: "",
};

function ForgotPassword() {
  const navigate = useNavigate();

  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    useFormik({
      initialValues: initialValue,
      validationSchema: forgotPasswordEmailSchema,
      onSubmit: (values) => {
        fetch(`${API}/users/forgotPassword`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((data) => {
            if (data.status === 404) {
              throw new Error(data.statusText);
            }
            navigate("/login");
            toast.success(
              "Reset password link sent to your email successfully!"
            );
            return data.json();
          })
          .catch((err) => {
            toast.warn("There is no user created with this email ID.");
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ForgotPassword;
