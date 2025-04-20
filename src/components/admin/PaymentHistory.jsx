
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner, Badge } from "react-bootstrap";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("/admin/getAllPayments");
        console.log("Fetched payments:", response.data); // Log the response to check its structure

        if (Array.isArray(response.data.data)) {
          setPayments(response.data.data);
        } else {
          console.error("Error: Payments data is not an array", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">All Payment Transactions</h3>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : payments.length === 0 ? (
        <p className="text-center">No transactions found.</p>
      ) : (
        <div className="row">
          {payments.map((payment) => (
            <div className="col-md-6 col-lg-4 mb-3" key={payment._id}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  {/* Remove card title and display amount directly */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="mb-0">
                      <strong>Amount:</strong> ₹{(payment.amount).toFixed(2)}
                    </p>
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
                  </div>

                  <p className="mb-1">
                    <strong>User:</strong>{" "}
                    {payment.userId
                      ? `${payment.userId.firstName} ${payment.userId.lastName}`
                      : "Unknown User"}
                  </p>
                  <p className="mb-1">
                    <strong>Order ID:</strong> {payment.razorpay_order_id || "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Payment ID:</strong> {payment.razorpay_payment_id || "N/A"}
                  </p>

                  <p className="mb-1">
                    <strong>Date:</strong>{" "}
                    {new Date(payment.createdAt).toLocaleString()}
                  </p>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;