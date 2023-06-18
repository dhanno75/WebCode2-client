import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
// import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { login, clearSomeState } from "../redux/features/UserSlice";

const initialValues = {
  email: "p-dhananjay@outlook.com",
  password: "test@1234",
};

function Login() {
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector((state) => ({ ...state.user }));
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        dispatch(login(values));
      },
    });

  useEffect(() => {
    return () => {
      dispatch(clearSomeState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      // toast.warn("Invalid login credentials.");
      dispatch(clearSomeState());
    }
    if (isSuccess) {
      // toast.success("Successful Login!");
      navigate("/");
      dispatch(clearSomeState());
    }
  }, [isError, isSuccess, dispatch, navigate]);

  return (
    <Container style={{ maxWidth: "500px" }}>
      <div className="log-form">
        <h2>Login to your account</h2>

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

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            minLength={6}
          />
          {errors.password && touched ? <p>{errors.password}</p> : null}

          <div className="login-btn">
            <button type="submit" className="btn">
              Login
            </button>
            <Link to="/forgotPassword" className="forgot">
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Login;
