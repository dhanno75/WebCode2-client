import React from "react";
import { Container } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { API } from "../globals";
import { forgotPasswordEmailSchema } from "../schemas";

const initialValue = {
  email: "",
};

function ForgotPassword() {
  const navigate = useNavigate();

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    errors,
  } = useFormik({
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
          // toast.success(
          //   "Reset password link sent to your email successfully!"
          // );
          return data.json();
        })
        .catch((err) => {
          // toast.warn("There is no user created with this email ID.");
        });
    },
  });

  return (
    <Container style={{ maxWidth: "500px" }}>
      <div className="log-form">
        <h2>
          Enter email associated with your account to change your password
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched ? <p>{errors.email}</p> : null}

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
}

export default ForgotPassword;
