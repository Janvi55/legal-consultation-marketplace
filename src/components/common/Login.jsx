
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      console.log("Login Response:",res.data);
      console.log("Role:", res.data.data.roleId);

      if (res.status === 200) {
        toast.success("Login Successfully", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });

        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);

        if (res.data.data.roleId.name === "USER") {
          setTimeout(() => {
            navigate("/user/userDashBoard");
          }, 2500);
        }
      }
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 403) {
        toast.error("Your account is blocked by the admin.", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      } else if (status === 404) {
        toast.error("Email not found. Please register first.", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      } else if (status === 401) {
        toast.error("Invalid credentials!", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      }
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
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
        backgroundSize: "cover",
      }}
    >
      <ToastContainer />
      <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", ValidationSchema.emailValidator)}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password", ValidationSchema.passwordValidator)}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </Form.Group>

            <div className="text-center mb-2">
              <Link to="/forgotPassword">Forgot password?</Link>
            </div>

            <Button variant="primary" className="w-100 mb-3" type="submit">
              Log In
            </Button>

            <p className="text-center">
              Don't have an account? <Link to="/signup">Register here</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

//--------------------------------------------------------mine
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import "./loginsignup/login.css";
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// export const Login = () => {
//   const { 
//     register, 
//     handleSubmit, 
//     formState: { errors, isSubmitting } 
//   } = useForm();
  
//   const navigate = useNavigate();
//   const { login}  = useAuth(); 
  

//   const submitHandler = async (data) => {
//     try {
//         const res = await axios.post("/users/login", data);
//       data.email = data.email.toLowerCase().trim();
      
//       console.log("Attempting login with:", data);
//       console.log(res.data)

      
//       const loginResult = await login(data);
      
//       if (loginResult.success) {

//         const{_id, roleId}= res.data.data

//         localStorage.setItem("id", res.data.data._id);
//          localStorage.setItem("role", res.data.data.roleId.name);
//          localStorage.setItem("token", res.data.token);
//         toast.success('Login successful! Redirecting...', {
//           position: "top-center",
//           autoClose: 2000,
//         });
  
//         setTimeout(() => {
//           const role = loginResult.user.role.toLowerCase();
//           switch(role) {
//             case 'admin':
//               navigate("/admin/dashboard");
//               break;
//             case 'lawyer':
//               navigate("/lawyer");
//               break;
//             case 'user':
//               navigate("/user");
//               break;
//             default:
//               navigate("/");
//           }
//         }, 2000);
//       } else  {
//         // Use the error from loginResult instead of throwing
//         let errorMessage = loginResult.error || "Authentication failed";
        
//         // Check if we have response details
//         if (loginResult.response) {
//           if (loginResult.response.status === 401) {
//             errorMessage = "Invalid email or password";
//           } else if (loginResult.response.status === 404) {
//             errorMessage = "User not found";
//           }
//         }
        
//         toast.error(errorMessage, {
//           position: "top-center",
//           autoClose: 5000,
//         });
//       }
//     } catch(error) {
//       console.error("Unexpected error:", error);
//       toast.error("An unexpected error occurred", {
//         position: "top-center",
//         autoClose: 5000,
//       });
//     }
//   };

//   return (
//     <div className="legal-login-container">
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
      
//       <div className="login-box">
//         <h1>Login to Legal Consultancy</h1>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <div className="input-container">
//             <input 
//               type="email" 
//               placeholder="Email Address" 
//               {...register("email", { 
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: "Please enter a valid email address"
//                 }
//               })} 
//             />
//             {errors.email && (
//               <span className="error">{errors.email.message}</span>
//             )}
//           </div>
          
//           <div className="input-container">
//             <input 
//               type="password" 
//               placeholder="Password" 
//               {...register("password", { 
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters"
//                 }
//               })} 
//             />
//             {errors.password && (
//               <span className="error">{errors.password.message}</span>
//             )}
//           </div>
          
//           <button 
//             type="submit" 
//             className="login-btn"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                 Logging in...
//               </>
//             ) : "Login"}
//           </button>
          
//           <div className="options">
//             <label>
//               <input type="checkbox" {...register("rememberMe")} /> 
//               Remember me
//             </label>
//             <a href="/forgotpassword/:token">Forgot password?</a>
//           </div>
          
//           <div className="signup-text">
//             New here? <a href="/signup">Sign up now.</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;