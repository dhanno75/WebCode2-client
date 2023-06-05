import React from "react";
import { Container } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
import { API } from "../globals";
import { resetYourPassword } from "../schemas";

const initialValues = {
  password: "",
};

function ResetPassword() {
  const navigate = useNavigate();

  // const resetPasswordLink =
  const { token } = useParams();

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    errors,
  } = useFormik({
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
          if (data.status === 400) {
            throw new Error(data.statusText);
          }
          return data.json();
        })
        .then((data) => {
          localStorage.setItem("token", data.token);
          navigate("/");
          // toast.success("Password was updated successfully!");
        })
        .catch((err) => {
          // toast.warn("Token is invalid or expired");
          console.log(err);
        });
    },
  });

  return (
    <Container style={{ maxWidth: "500px" }}>
      <div className="log-form">
        <h2>Reset Your Password!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter your new password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            minLength={6}
          />
          {errors.password && touched ? <div>{errors.password}</div> : null}

          <button className="btn" type="submit">
            Reset password
          </button>
        </form>
      </div>
    </Container>
  );
}

export default ResetPassword;
