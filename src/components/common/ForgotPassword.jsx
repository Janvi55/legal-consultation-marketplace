import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { CustomLoader } from "../../CustomLoader";

export const ForgotPassword = () => {

  const [isLoading, setisLoading] = useState(false)  
//   const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {


    try {

      setisLoading(true) 
      const res = await axios.post("/forgotPassword", { email: data.email  });
      console.log(res.data);
      setisLoading(false)

      if (res.status === 200) {
        
        // alert("login successfully")
        toast.success('Password reset link sent successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
        

        
        //   setTimeout(() => {
        //     navigate("/Login");
        //   }, 2500);
        
      }
    } catch (error) {
      // alert("Login failed");
      toast.error("Invalid Credentials or Email not found!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
     setisLoading(false)   
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
    
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)", backgroundSize: "cover" }}>
       <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {isLoading == true  && <CustomLoader/>}
      <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Forgot Your Password</h2>
          <Form onSubmit={handleSubmit(submitHandler)}>
            {/* Email Input */}
            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control type="email" {...register("email", ValidationSchema.emailValidator)} />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </Form.Group>

            

            

            {/* Submit Button */}
            <Button variant="primary" className="w-100 mb-3" type="submit">
              Get a Link
            </Button>


        
          </Form>
          <div className="text-center">
            <Link to="/Login">Back to Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};