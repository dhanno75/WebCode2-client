import React from "react";
import { Container } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
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
  const token = localStorage.getItem("token");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (vals = { ...values, token }, action) => {
        console.log(vals);
        fetch(`${API}/users/signup`, {
          method: "POST",
          body: JSON.stringify(vals),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        })
          .then((data) => {
            console.log(data);
            if (data.status === 400) {
              throw new Error(data.statusText);
            }
            action.resetForm();
            navigate("/userDetails");
            return data.json();
          })
          .catch((err) => {
            alert("Something went wrong. Please try again later");
          });
      },
    });

  return (
    <Container style={{ maxWidth: "500px" }}>
      <div className="log-form">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <input
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

          <input
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

          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? <p>{errors.email}</p> : null}

          <input
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

          <select
            aria-label="Default select example"
            name="role"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ cursor: "pointer" }}
          >
            <option value="">Select User's Role</option>
            <option value="admin">admin</option>
            <option value="manager">manager</option>
            <option value="employee">employee</option>
          </select>
          {errors.role && touched.role ? <p>{errors.role}</p> : null}

          <div className="login-btn">
            <button type="submit" className="btn">
              Signup
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Signup;
