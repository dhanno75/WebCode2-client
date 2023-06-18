import React from "react";
import { Container } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { API } from "../globals";
import { addLeadSchema } from "../schemas";

const initialValues = {
  leadname: "",
  company: "",
  email: "",
  status: "new",
  serviceRequest: "created",
};

function AddLead() {
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: addLeadSchema,
      onSubmit: (values, action) => {
        fetch(`${API}/leads`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        })
          .then((data) => {
            if (data.status === 400) {
              throw new Error(data.statusText);
            }
            action.resetForm();
            navigate("/myLeads");
            return data.json();
          })
          .catch((err) => {
            alert("Something went wrong. Please try again later");
          });
      },
    });

  return (
    <Container style={{ maxWidth: "500px", marginTop: "80px" }}>
      <div className="log-form">
        <h2>Add Lead</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="leadname"
            value={values.leadname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.leadname && touched.leadname ? (
            <p>{errors.leadname}</p>
          ) : null}

          <input
            type="text"
            placeholder="Company"
            name="company"
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.company && touched.company ? <p>{errors.company}</p> : null}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? <p>{errors.email}</p> : null}

          <select
            aria-label="Default select example"
            name="status"
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ cursor: "pointer" }}
          >
            <option value="">Status</option>
            <option value="new">new</option>
            <option value="lost">lost</option>
            <option value="contacted">contacted</option>
            <option value="canceled">canceled</option>
            <option value="qualified">qualified</option>
            <option value="confirmed">confirmed</option>
          </select>
          {errors.serviceRequest && touched.serviceRequest ? (
            <p>{errors.serviceRequest}</p>
          ) : null}

          <select
            aria-label="Default select example"
            name="serviceRequest"
            value={values.serviceRequest}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ cursor: "pointer" }}
          >
            <option value="">Service Request</option>
            <option value="created">created</option>
            <option value="released">released</option>
            <option value="open">open</option>
            <option value="canceled">canceled</option>
            <option value="in process">in process</option>
            <option value="completed">completed</option>
          </select>
          {errors.serviceRequest && touched.serviceRequest ? (
            <p>{errors.serviceRequest}</p>
          ) : null}

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

export default AddLead;
