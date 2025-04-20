
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert, Badge } from "react-bootstrap";

export const ViewMyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`/appointment/payments/${userId}`);
        setPayments(res.data.data || []);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userId]);

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">Transaction History</h3>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : payments.length === 0 ? (
        <Alert variant="info">No payment records found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Payment ID</th>
              <th>Order ID</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Paid On</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.razorpay_payment_id || "N/A"}</td>
                <td>{payment.razorpay_order_id || "N/A"}</td>
                <td>{payment.amount || "0"}</td>
                <td>
                  <Badge
                    bg={
                      payment.paymentStatus === "Completed"
                        ? "success"
                        : payment.paymentStatus === "Pending"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {payment.paymentStatus}
                  </Badge>
                </td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewMyPayments;