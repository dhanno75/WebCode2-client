import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeads } from "../redux/features/LeadSlice";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../globals";
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/MoonLoader";

function Leads() {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

  const setData = (data) => {
    let { leadname, company, email, serviceRequest, status } = data;

    localStorage.setItem("leadname", leadname);
    localStorage.setItem("company", company);
    localStorage.setItem("leademail", email);
    localStorage.setItem("status", status);
    localStorage.setItem("serviceRequest", serviceRequest);
  };

  const handleDelete = async function (id) {
    const headers = { token: localStorage.getItem("token") };
    try {
      await axios.delete(`${API}/leads/${id}`, { headers });
      window.location.reload(false);
      toast.success("User deleted!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper" style={{ marginTop: "100px" }}>
      <div
        className="header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2 className="mb-4">All Leads</h2>
        <div className="addlead-button">
          <Link to="/addLead" className="addlead">
            Add Lead &rarr;
          </Link>
        </div>
      </div>

      <div className="user-card lead-header">
        <div className="lead-details">Lead name</div>
        <div className="lead-details">Company</div>
        <div className="lead-details">Email</div>
        <div className="lead-details">Status</div>
        <div className="lead-details">Service request</div>
        <div className="extra" style={{ backgroundColor: "#414141" }}></div>
      </div>

      {leads.data ? (
        leads.data.map((lead, index) => {
          return (
            <div className="user-card" key={index}>
              <div>{lead.leadname}</div>
              <div>{lead.company}</div>
              <div>{lead.email}</div>
              <div>{lead.status}</div>
              <div>{lead.serviceRequest}</div>
              <div className="user-functions">
                <div className="delete">
                  <AiOutlineClose
                    style={{ color: "rgb(194, 93, 5)" }}
                    onClick={() => handleDelete(lead._id)}
                  />
                </div>
                <div className="edit">
                  <Link to={`/updateLead/${lead._id}`}>
                    <AiFillEdit
                      style={{ color: "rgb(31, 153, 218)" }}
                      onClick={() => setData(lead)}
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <MoonLoader
          color="#3859fe"
          cssOverride={{
            position: "fixed",
            top: "50%",
            left: "50%",
          }}
        />
      )}
    </div>
  );
}

export default Leads;
