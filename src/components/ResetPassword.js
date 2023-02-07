import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../globals";
import { resetYourPassword } from "../schemas";

const initialValues = {
  password: "",
};

function ResetPassword() {
  const navigate = useNavigate();

  // const resetPasswordLink =
  const { token } = useParams();

  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    useFormik({
      initialValues,
      validationSchema: resetYourPassword,
      onSubmit: (values) => {
        fetch(`${API}/users/resetPassword/${token}`, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((data) => {
            console.log(data);
            if (data.status === 400) {
              throw new Error(data.statusText);
            }
            return data.json();
          })
          .then((data) => {
            localStorage.setItem("token", data.token);
            navigate("/");
            toast.success("Password was updated successfully!");
          })
          .catch((err) => {
            toast.warn("Token is invalid or expired");
          });
      },
    });

  return (
    <Container style={{ maxWidth: "500px" }}>
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            minLength={6}
          />
          {errors.password && touched ? <div>{errors.password}</div> : null}
        </Form.Group>

        <Button variant="primary" type="submit">
          Reset password
        </Button>
      </Form>
    </Container>
  );
}

export default ResetPassword;
