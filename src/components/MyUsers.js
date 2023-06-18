import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/features/UserSlice";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../globals";
import { toast } from "react-toastify";

function MyUsers() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const headers = { token: localStorage.getItem("token") };
    try {
      await axios.delete(`${API}/users/${id}`, { headers });
      window.location.reload(false);
      toast.success("User deleted!");
    } catch (err) {
      console.log(err);
    }
  };

  const role = localStorage.getItem("role");

  const setData = (data) => {
    let { _id, firstname, lastname, email, role } = data;
    localStorage.setItem("ID", _id);
    localStorage.setItem("fname", firstname);
    localStorage.setItem("lname", lastname);
    localStorage.setItem("email", email);
    localStorage.setItem("userRole", role);
  };

  const colors = ["rgb(186,255,201)", "rgb(255,179,186)", "rgb(186,255,255)"];

  return (
    <Container style={{ marginTop: "100px", minHeight: "100vh" }}>
      <h2 className="mb-5">All User Details</h2>

      <div className="user-card user-card-header">
        <div className="user-color"></div>
        <div className="user-firstname user-details">Firstname</div>
        <div className="user-lastname user-details">Lastname</div>
        <div className="user-email user-details">Email</div>
        <div className="user-role">Role</div>
        {role === "admin" ? <div className="extra"></div> : ""}
        {/* {role === "admin" ? (
                <div className="user-functions">
                  <div className="delete">
                    <AiOutlineClose style={{ color: "rgb(194, 93, 5)" }} />
                  </div>
                  <div className="edit">
                    <Link to={`/updateUser/${user._id}`}>
                      <AiFillEdit
                        style={{ color: "rgb(31, 153, 218)" }}
                        onClick={() => setData(user)}
                      />
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )} */}
      </div>

      {users ? (
        users.map((user) => {
          return (
            <div className="user-card" key={user._id}>
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
              <div className="user-firstname user-details">
                {user.firstname}
              </div>
              <div className="user-lastname user-details">{user.lastname}</div>
              <div className="user-email user-details">{user.email}</div>
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
              {role === "admin" ? (
                <div className="user-functions">
                  <div className="delete">
                    <AiOutlineClose
                      style={{ color: "rgb(194, 93, 5)" }}
                      onClick={() => handleDelete(user._id)}
                    />
                  </div>
                  <div className="edit">
                    <Link to={`/updateUser/${user._id}`}>
                      <AiFillEdit
                        style={{ color: "rgb(31, 153, 218)" }}
                        onClick={() => setData(user)}
                      />
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })
      ) : (
        <div className="spinner-border" role="status"></div>
      )}
    </Container>
  );
}

export default MyUsers;
