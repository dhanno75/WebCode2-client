import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../globals";
import axios from "axios";

function UpdateLead() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [leadname, setLeadname] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [serviceRequest, setServiceRequest] = useState("");

  useEffect(() => {
    setLeadname(localStorage.getItem("leadname"));
    setCompany(localStorage.getItem("company"));
    setEmail(localStorage.getItem("leademail"));
    setStatus(localStorage.getItem("status"));
    setServiceRequest(localStorage.getItem("serviceRequest"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formDetails = { leadname, company, email, status, serviceRequest };
    const headers = { token: localStorage.getItem("token") };
    try {
      await axios.put(`${API}/leads/${id}`, formDetails, {
        headers,
      });
      navigate("/myLeads");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container style={{ maxWidth: "500px" }}>
      <div className="log-form">
        <h2>Update Lead</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Name"
            name="leadname"
            value={leadname}
            onChange={(e) => setLeadname(e.target.value)}
          />

          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            aria-label="Default select example"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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

          <select
            aria-label="Default select example"
            name="serviceRequest"
            value={serviceRequest}
            onChange={(e) => setServiceRequest(e.target.value)}
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

          <div className="login-btn">
            <button type="submit" className="btn">
              Update Lead
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default UpdateLead;
