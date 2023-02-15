import React, { useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/features/UserSlice";
import { Link } from "react-router-dom";

function UserDetails() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user.users.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const colors = ["rgb(186,255,201)", "rgb(255,179,186)", "rgb(186,255,255)"];

  return (
    <Container style={{ marginTop: "100px", height: "100vh" }}>
      <h2 className="mb-4">All User Details</h2>
      {user.users.users ? (
        user.users.users.map((user, index) => {
          return (
            <div className="user-card" key={index}>
              <div
                className="user-color"
                style={{
                  backgroundColor:
                    user.role === "admin"
                      ? colors[0]
                      : user.role === "manager"
                      ? colors[1]
                      : colors[2],
                }}
              ></div>
              <div className="user-firstname">{user.firstname}</div>
              <div className="user-lastname">{user.lastname}</div>
              <div className="user-email">{user.email}</div>
              <div
                className="user-role"
                style={{
                  backgroundColor:
                    user.role === "admin"
                      ? colors[0]
                      : user.role === "manager"
                      ? colors[1]
                      : colors[2],
                }}
              >
                {user.role}
              </div>
            </div>
          );
        })
      ) : (
        <div className="spinner-border" role="status"></div>
      )}
    </Container>
  );
}

export default UserDetails;
