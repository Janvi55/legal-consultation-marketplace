// export default AdminUserManagement;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Modal,
} from "react-bootstrap";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/adminUserManagement.css"

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/getAllUsers");
      setUsers(res.data.data);
    } catch (err) {
      toast.error("Failed to load users", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlockStatus = async (id) => {
    try {
      const res = await axios.patch(`/admin/toggleUserBlock/${id}`);
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
      fetchUsers();
    } catch (err) {
      toast.error("Error updating status", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete(`/admin/deleteUser/${id}`);
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
    }
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <Container className="py-4">
      <ToastContainer />
      <h2 className="mb-4 text-center">User Management</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {users.map((user) => (
            <Col key={user._id}>
              <Card className="h-100 shadow-sm user-card">
                <Card.Body className="d-flex flex-column justify-content-between align-items-start">
                  <div >
                    <Card.Title className="text-primary fs-6 mb-2">
                      {user.firstName} {user.lastName}
                    </Card.Title>
                    {/* Status now on a separate line */}
                    <div className="mb-2 mt-5" >
                      <strong> Status: </strong>{" "}
                      <span
                        className={
                          user.isBlocked ? "text-danger" : "text-success"
                        }
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleShowDetails(user)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal for full user details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Status:</strong> {selectedUser.isBlocked ? "Blocked" : "Active"}</p>
              {selectedUser.phone && <p><strong>Phone:</strong> {selectedUser.phone}</p>}
              {selectedUser.role && <p><strong>Role:</strong> {selectedUser.role}</p>}
              {selectedUser.createdAt && (
                <p>
                  <strong>Joined:</strong>{" "}
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deleteUser(selectedUser._id);
              setShowModal(false);
            }}
          >
            Delete
          </Button>
          <Button
            variant={selectedUser?.isBlocked ? "success" : "warning"}
            onClick={() => {
              toggleBlockStatus(selectedUser._id);
              setShowModal(false);
            }}
          >
            {selectedUser?.isBlocked ? "Unblock" : "Block"}
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminUserManagement;