

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { CustomLoader } from '../../CustomLoader';

export const ContactUs = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  const submitHandler = async (data) => {
    setisLoading(true);

    try {
      const res = await axios.post("/contactUs", data);
      setisLoading(false);

      if (res.status === 200) {
        toast.success('Message sent successfully!', { transition: Bounce, theme: "dark" });

        // Get the user's role from localStorage
        const role = localStorage.getItem("role");

        setTimeout(() => {
          if (role === "user") {
            navigate("/user/userDashBoard");
          } else if (role === "lawyer") {
            navigate("/lawyer/lawyerDashboard");
          } else {
            navigate("/");
          }
        }, 2500);
      }
    } catch (error) {
      setisLoading(false);
      toast.error('Failed to send the message. Please try again.', { transition: Bounce, theme: "dark" });
    }
  };

  const ValidationSchema = {
    nameValidator: {
      required: { value: true, message: "Name is required *" },
    },
    emailValidator: {
      required: { value: true, message: "Email is required *" },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format"
      },
    },
    messageValidator: {
      required: { value: true, message: "Message is required *" },
      minLength: { value: 10, message: "Message must be at least 10 characters" },
    },
  };

  return (
    <div>
      <ToastContainer position="top-left" autoClose={5000} theme="dark" transition={Bounce} />
      {isLoading && <CustomLoader />}
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Container
          fluid
          className="d-flex align-items-center justify-content-center min-vh-100"
          style={{ backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)", backgroundSize: "cover" }}
        >
          <Card className="m-3 p-3 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
            <Card.Body className="px-4">
              <h2 className="text-uppercase text-center mb-4">Contact Us</h2>

              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" {...register("name", ValidationSchema.nameValidator)} />
                <Form.Text className="text-danger">{errors.name?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" {...register("email", ValidationSchema.emailValidator)} />
                <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} {...register("message", ValidationSchema.messageValidator)} />
                <Form.Text className="text-danger">{errors.message?.message}</Form.Text>
              </Form.Group>

              <Button type="submit" className="mt-3 w-100" variant="primary" size="lg">
                Send Message
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </Form>
    </div>
  );
};