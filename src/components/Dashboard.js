import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Legend,
  PieChart,
  Pie,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  YAxis,
  XAxis,
} from "recharts";
import { getLeads, getLeadsPerMonth } from "../redux/features/LeadSlice";
import BeatLoader from "react-spinners/BeatLoader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { leads, leadsPerMonth } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLeadsPerMonth());
  }, [dispatch]);

  let created,
    released,
    open,
    canceled,
    inprocess,
    completed,
    data01,
    leadCreationDates;

  if (leads.data) {
    created = leads.data.filter((lead) => lead.serviceRequest === "created");
    released = leads.data.filter((lead) => lead.serviceRequest === "released");
    open = leads.data.filter((lead) => lead.serviceRequest === "open");
    canceled = leads.data.filter((lead) => lead.serviceRequest === "canceled");
    inprocess = leads.data.filter(
      (lead) => lead.serviceRequest === "in process"
    );
    completed = leads.data.filter(
      (lead) => lead.serviceRequest === "completed"
    );

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    leadCreationDates = leadsPerMonth.data
      ? leadsPerMonth.data.map((el) => {
          return {
            month: months[el._id - 1],
            leadsPerMonth: el.leadsAddMonth,
          };
        })
      : "";

    data01 = [
      { name: "created", value: created.length, fill: "#3b82f6" },
      { name: "released", value: released.length, fill: "#469990" },
      { name: "open", value: open.length, fill: "#eab308" },
      { name: "canceled", value: canceled.length, fill: "#ef4444" },
      { name: "in process", value: inprocess.length, fill: "#22c55e" },
      { name: "completed", value: completed.length, fill: "#a855f7" },
    ];
  }

  return (
    <>
      <div className="dashboard">
        <div className="d-header">
          <div className="d-heading">Dashboard</div>
          <div className="d-leads">
            Total leads: {leads ? leads.length : "0"}
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card1 cards">
            <div className="card1-header">Service requests</div>
            {leads.data ? (
              <div className="pie-chart">
                <PieChart width={550} height={400}>
                  <Pie
                    dataKey="value"
                    data={data01}
                    cx={160}
                    cy={230}
                    innerRadius={100}
                    outerRadius={140}
                  />
                  <Tooltip />
                  <Legend
                    verticalAlign="middle"
                    align="right"
                    width="30%"
                    cy={200}
                    layout="vertical"
                    iconSize={15}
                    iconType="circle"
                  />
                </PieChart>
              </div>
            ) : (
              <BeatLoader
                color="#9137f8"
                cssOverride={{
                  position: "fixed",
                  transform: "translate(-50%, -50%)",
                  top: "50%",
                  left: "22%",
                }}
              />
            )}
          </div>
          <div className="card2 cards">
            <div className="card2-header">Leads created by month</div>

            <AreaChart
              width={800}
              height={500}
              data={leadCreationDates}
              margin={{
                top: 50,
                right: 20,
                left: 20,
                bottom: 0,
              }}
            >
              <Area
                type="monotone"
                dataKey="leadsPerMonth"
                stroke="#096914"
                fill="#a6d884"
              />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </AreaChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
