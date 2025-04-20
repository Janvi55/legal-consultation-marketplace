import React from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const SupportLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/support/supportlogin", data);
      console.log(res.data);

      if (res.status === 200) {
        alert("Login successful");
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);

        if (res.data.data.roleId.name === "support") {
          navigate("/support")
        }
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  const ValidationSchema = {
    emailValidator: {
      required: "Email is required *",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    },
    passwordValidator: {
      required: "Password is required *",
      minLength: {
        value: 8,
        message: "Minimum length is 8",
      },
    },
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)", backgroundSize: "cover" }}>
      <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form onSubmit={handleSubmit(submitHandler)}>
            {/* Email Input */}
            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control type="email" {...register("email", ValidationSchema.emailValidator)} />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </Form.Group>

            {/* Password Input */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" {...register("password", ValidationSchema.passwordValidator)} />
              {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </Form.Group>

            <div className="text-center mb-2">
              <Link to="/error">Forgot password?</Link>
            </div>

            {/* Submit Button */}
            <Button variant="primary" className="w-100 mb-3" type="submit">
              Log In
            </Button>

            <p className="text-center">
              Don't have an account? <Link to="/support/supportsignup">Register here</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};