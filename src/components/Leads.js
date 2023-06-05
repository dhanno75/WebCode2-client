import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeads } from "../redux/features/LeadSlice";

function Leads() {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <h2 className="mb-4">All Leads</h2>

      <div className="user-card lead-header">
        <div className="lead-details">Lead name</div>
        <div className="lead-details">Company</div>
        <div className="lead-details">Email</div>
        <div className="lead-details">Status</div>
        <div className="lead-details">Service request</div>
      </div>

      {leads.leads ? (
        leads.leads.map((lead, index) => {
          return (
            <div className="user-card" key={index}>
              <div>{lead.leadname}</div>
              <div>{lead.company}</div>
              <div>{lead.email}</div>
              <div className="lead-status">
                <select name="status">
                  <option value={lead.status}>{lead.status}</option>
                  <option value="contacted">{lead.status}</option>
                  <option value="qualified">{lead.status}</option>
                  <option value="lost">{lead.status}</option>
                  <option value="canceled">{lead.status}</option>
                  <option value="confirmed">{lead.status}</option>
                </select>
              </div>
              <div className="lead-status">
                <select name="serviceRequest">
                  <option value={lead.serviceRequest}>
                    {lead.serviceRequest}
                  </option>
                  <option value="contacted">{lead.serviceRequest}</option>
                  <option value="qualified">{lead.serviceRequest}</option>
                  <option value="lost">{lead.serviceRequest}</option>
                  <option value="canceled">{lead.serviceRequest}</option>
                  <option value="confirmed">{lead.serviceRequest}</option>
                </select>
              </div>
            </div>
          );
        })
      ) : (
        <div className="spinner-border" role="status"></div>
      )}
    </div>
  );
}

export default Leads;
