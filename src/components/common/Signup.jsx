


import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, ToastContainer } from 'react-bootstrap';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { CustomLoader } from '../../CustomLoader';



export const Signup = () => {
    const [isLoading, setisLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        console.log(data);
        data.roleId = "67bfe7326ceb8a73c701ba1e";

        setisLoading(true)
        const res = await axios.post("/user", data);
        
        setisLoading(false)
        if (res.status === 201) {
        //    alert("user created..")
        toast.success('Signup Successfully', {
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
                  setTimeout(() => {
                    navigate("/Login");
                  }, 2500);
        } else {
            // alert("User not added..");
            toast.error('  Invalid Credentials !!', {
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
        }
    };

    const ValidationSchema = {
        firstNameValidator: { required: "First Name is required *" },
        lastNameValidator: { required: "Last Name is required *" },
        emailValidator: { required: "Email is required *" },
        numberValidator: {
            required: "Contact No is required *",
            pattern: { value: /^[6-9][0-9]{9}$/, message: "Contact is not valid" }
        },
        passwordValidator: {
            required: "Password is required *",
            minLength: { value: 8, message: "Minimum length is 8 characters" }
        },
        rpasswordValidator: {
            required: "Repeat password is required *",
            minLength: { value: 8, message: "Minimum length is 8 characters" },
            validate: value => value === watch("password") || "Your password does not match"
        },
        checkBoxValidator: { required: "You must accept the terms and conditions" }
    };

    return (
        <div>
            {isLoading == true && <CustomLoader/>}
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
        <Container fluid className='d-flex align-items-center justify-content-center min-vh-100' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            
            <Card className='m-3 p-3 shadow-lg' style={{ maxWidth: '500px', width: '100%' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Create an Account</h2>
                    <Form onSubmit={handleSubmit(submitHandler)}>
                        <Form.Group className='mb-2'>
                            <Form.Label>Your First Name</Form.Label>
                            <Form.Control type='text' {...register("firstName", ValidationSchema.firstNameValidator)} />
                            <span className="text-danger">{errors.firstName?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Your Last Name</Form.Label>
                            <Form.Control type='text' {...register("lastName", ValidationSchema.lastNameValidator)} />
                            <span className="text-danger">{errors.lastName?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Your Email</Form.Label>
                            <Form.Control type='email' {...register("email", ValidationSchema.emailValidator)} />
                            <span className="text-danger">{errors.email?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Your Contact No</Form.Label>
                            <Form.Control type='text' {...register("number", ValidationSchema.numberValidator)} />
                            <span className="text-danger">{errors.number?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' {...register("password", ValidationSchema.passwordValidator)} />
                            <span className="text-danger">{errors.password?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Repeat Your Password</Form.Label>
                            <Form.Control type='password' {...register("rpassword", ValidationSchema.rpasswordValidator)} />
                            <span className="text-danger">{errors.rpassword?.message}</span>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Check 
                                type='checkbox' 
                                label='I agree to the Terms of Service' 
                                {...register("terms", ValidationSchema.checkBoxValidator)} 
                            />
                            <span className="text-danger">{errors.terms?.message}</span>
                        </Form.Group>

                        <Button type="submit" className='mt-4 w-100'>Register</Button>
                    </Form>
                </Card.Body>
            </Card>
        
        </Container>
        </div>
    );
};

// import axios from 'axios';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import "./loginsignup/signup.css";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// export const Signup = () => {
//   const { 
//     register, 
//     handleSubmit, 
//     formState: { errors, isSubmitting } 
//   } = useForm();
  
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const navigate = useNavigate();

//   const submitHandler = async (data) => {
//     if (!termsAccepted) {
//       toast.error('Please accept the Terms & Conditions', {
//         position: "top-center",
//         autoClose: 5000,
//       });
//       return;
//     }

//     try {
//       // Add role ID to the data
//       const payload = {
//         ...data,
//         roleId: "67bfe7326ceb8a73c701ba1e" // Should ideally come from config
//       };

//       const res = await axios.post("/users", payload);
      
//       if(res.status === 201) {
//         toast.success('Registration successful! Redirecting to login...', {
//           position: "top-center",
//           autoClose: 2000,
//         });
        
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       } else {
//         throw new Error(res.data.message || "Registration failed");
//       }
//     } catch(error) {
//       let errorMessage = "Registration failed";
      
//       if(error.response) {
//         // Handle specific error messages from backend
//         errorMessage = error.response.data.message || errorMessage;
        
//         // Handle duplicate email/phone cases
//         if(error.response.status === 409) {
//           errorMessage = "User with this email or phone already exists";
//         }
//       }
      
//       toast.error(errorMessage, {
//         position: "top-center",
//         autoClose: 5000,
//       });
//     }
//   };

//   const validationSchema = {
//     firstName: {
//       required: "Full name is required",
//       minLength: {
//         value: 2,
//         message: "Name must be at least 2 characters"
//       },
//       pattern: {
//         value: /^[a-zA-Z ]+$/,
//         message: "Name should contain only letters"
//       }
//     },
//     email: {
//       required: "Email is required",
//       pattern: {
//         value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//         message: "Enter a valid email address"
//       }
//     },
//     phone: {
//       required: "Phone number is required",
//       pattern: {
//         value: /^[0-9]{10,15}$/,
//         message: "Enter a valid 10-15 digit phone number"
//       }
//     },
//     password: {
//       required: "Password is required",
//       minLength: {
//         value: 6,
//         message: "Password must be at least 6 characters"
//       },
//       pattern: {
//         value: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
//         message: "Password must contain at least one letter and one number"
//       }
//     }
//   };

//   return (
//     <div className="legal-container">
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
      
//       <div className="signup-box">
//         <h1>Legal Consultancy Signup</h1>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <div className="input-container">
//             <input 
//               type="text" 
//               placeholder="Full Name" 
//               {...register("firstName", validationSchema.firstName)} 
//             />
//             {errors.firstName && (
//               <span className="error">{errors.firstName.message}</span>
//             )}
//           </div>
          
//           <div className="input-container">
//             <input 
//               type="email" 
//               placeholder="Email Address" 
//               {...register("email", validationSchema.email)} 
//             />
//             {errors.email && (
//               <span className="error">{errors.email.message}</span>
//             )}
//           </div>
          
//           <div className="input-container">
//             <input 
//               type="tel" 
//               placeholder="Phone Number" 
//               {...register("phone", validationSchema.phone)} 
//             />
//             {errors.phone && (
//               <span className="error">{errors.phone.message}</span>
//             )}
//           </div>
          
//           <div className="input-container">
//             <input 
//               type="password" 
//               placeholder="Password" 
//               {...register("password", validationSchema.password)} 
//             />
//             {errors.password && (
//               <span className="error">{errors.password.message}</span>
//             )}
//           </div>
          
//           <button 
//             type="submit" 
//             className="signup-btn"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Registering..." : "Sign Up"}
//           </button>
          
//           <div className="options">
//             <div>
//               <input 
//                 type="checkbox" 
//                 id="terms" 
//                 checked={termsAccepted}
//                 onChange={(e) => setTermsAccepted(e.target.checked)}
//               />
//               <label htmlFor="terms"> I agree to the Terms & Conditions</label>
//             </div>
//           </div>
          
//           <div className="signin-text">
//             Already have an account? <a href="/login">Log in now.</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;