

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const AddAppointment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm();

  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const specialization = watch("problemCategory");

  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve();
        };
        script.onerror = () => {
          console.error('Razorpay script failed to load');
          resolve();
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpay();
  }, []);

  useEffect(() => {
    const fetchLawyers = async () => {
      if (!specialization) return setLawyers([]);
      try {
        const response = await axios.get(`/lawyers/${specialization}`);
        setLawyers(response.data.data || []);
      } catch (error) {
        console.error("Error fetching lawyers:", error);
        setLawyers([]);
      }
    };
    fetchLawyers();
  }, [specialization]);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      toast.error("Payment system is loading, please try again in a moment");
      return;
    }

    const formData = getValues();
    const userId = localStorage.getItem("id");

    if (
      !formData.appointmentDate ||
      !formData.appointmentTime ||
      !formData.problemCategory ||
      !formData.consultationType ||
      !formData.lawyerId
    ) {
      toast.error("Please fill all the fields before proceeding with payment");
      return;
    }

    const paymentAmount = 500; // fixed amount in ₹
    try {
      setLoading(true);

      const { data: order } = await axios.post("/create_order", {
        amount: paymentAmount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });

      const options = {
        key: "rzp_test_kiBRyyCS7A1LxN",
        amount: order.amount,
        currency: order.currency,
        name: "Legal Consultation",
        description: "Appointment Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verify = await axios.post("/verify_order", response);
            if (verify.data.status === "success") {
              // Step 1: Create Appointment
              const appointmentRes = await axios.post("/appointment", {
                ...formData,
                userId,
                paymentStatus: "Completed",
              });

              const appointmentId = appointmentRes.data.data._id;

              // Step 2: Update with Razorpay details
              await axios.put("/appointment/confirmPayment", {
                appointmentId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                amount: paymentAmount,
              });

              toast.success("Appointment booked & payment successful!", {
                position: "top-center",
                autoClose: 5000,
                theme: "dark",
                transition: Bounce,
              });

              setTimeout(() => navigate("/user/viewMyAppointments"), 2500);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment processing error:", error);
            toast.error("Payment processing failed");
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Payment Failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const ValidationSchema = {
    problemCategoryValidator: { required: "Problem category is required *" },
    appointmentDateValidator: { required: "Appointment Date is required *" },
    appointmentTime: { required: "Appointment Time is required *" },
    consultationTypeValidator: { required: "Consultation Type is required" },
    lawyerIdValidator: { required: "Please select a lawyer *" },
  };

  return (
    <div>
      <ToastContainer />
      <Container
        fluid
        className="d-flex align-items-center justify-content-center min-vh-100"
        style={{
          backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Card className="m-3 p-3 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Book Appointment</h2>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control type="date" {...register("appointmentDate", ValidationSchema.appointmentDateValidator)} />
                <span className="text-danger">{errors.appointmentDate?.message}</span>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Appointment Time</Form.Label>
                <Form.Control type="time" {...register("appointmentTime", ValidationSchema.appointmentTime)} />
                <span className="text-danger">{errors.appointmentTime?.message}</span>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Problem Category</Form.Label>
                <Form.Select {...register("problemCategory", ValidationSchema.problemCategoryValidator)}>
                  <option value="">Select Problem Category</option>
                  <option value="Civil">Civil</option>
                  <option value="Criminal">Criminal</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Family">Family</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Intellectual Property">Intellectual Property</option>
                  <option value="Tax">Tax</option>
                  <option value="Employment">Employment</option>
                </Form.Select>
                <span className="text-danger">{errors.problemCategory?.message}</span>
              </Form.Group>

              {lawyers.length > 0 && (
                <Form.Group className="mb-2">
                  <Form.Label>Select a Lawyer</Form.Label>
                  <Form.Select {...register("lawyerId", ValidationSchema.lawyerIdValidator)}>
                    <option value="">Choose a Lawyer</option>
                    {lawyers.map((lawyer) => (
                      <option key={lawyer._id} value={lawyer._id}>
                        {lawyer.name} - {lawyer.experience} years
                      </option>
                    ))}
                  </Form.Select>
                  <span className="text-danger">{errors.lawyerId?.message}</span>
                </Form.Group>
              )}

              <Form.Group className="mb-2">
                <Form.Label>Consultation Type</Form.Label>
                <Form.Select {...register("consultationType", ValidationSchema.consultationTypeValidator)}>
                  <option value="">Select Consultation Type</option>
                  <option value="Voice">Voice</option>
                  <option value="Video">Video</option>
                  <option value="Chat">Chat</option>
                </Form.Select>
                <span className="text-danger">{errors.consultationType?.message}</span>
              </Form.Group>

              <Button onClick={handlePayment} className="mt-4 w-100" disabled={loading}>
                {loading ? "Processing..." : "Pay & Book Appointment"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};