import React, { useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/features/UserSlice";

function UserDetails() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => ({ ...state.user }));

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        {users[0].map((user) => {
          return (
            <Col sm={4} key={user.id}>
              <Card
                style={{ width: "18rem", marginTop: "40px" }}
                className="main-card"
              >
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {user.email}
                  </Card.Subtitle>
                  <Card.Text>{user.website}</Card.Text>
                  <Button variant="warning" className="mx-2">
                    Edit
                  </Button>
                  <Button variant="danger">Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default UserDetails;
