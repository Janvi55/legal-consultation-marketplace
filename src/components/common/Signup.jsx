import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import "./loginsignup/signup.css"
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();
    
        const submitHandler = async (data) => {
          data.roleId="67bfe7326ceb8a73c701ba1e"
          const res =await axios.post("/users",data)

            console.log(res);
            console.log(res.data)
            try{
              if(res.status===201){
                toast.success ('user addedd!!', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
                  })
                  setTimeout(() => {
                    navigate("/login");
                }, 3000);
               
              }
            }catch(error){
              toast.error('error!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                })
            }

        };
    
        const validationSchema = {
            nameValidator: {
                required: {
                    value: true,
                    message: "Full name is required*"
                }
            },
            emailValidator: {
                required: {
                    value: true,
                    message: "Email is required*"
                },
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address"
                }
            },
            phoneValidator: {
                required: {
                    value: true,
                    message: "Phone number is required*"
                },
                pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Enter a valid phone number"
                }
            },
            passwordValidator: {
                required: {
                    value: true,
                    message: "Password is required*"
                },
                minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                }
            }
        };
    
        return (
            <div className="legal-container">
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
/>
                <div className="signup-box">
                    <h1>Legal Consultancy Signup</h1>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="input-container">
                            <input type="text" placeholder="Full Name" {...register("firstName", validationSchema.nameValidator)} />
                            <span className="error">{errors.name?.message}</span>
                        </div>
                        <div className="input-container">
                            <input type="email" placeholder="Email Address" {...register("email", validationSchema.emailValidator)} />
                            <span className="error">{errors.email?.message}</span>
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="Phone Number" {...register("phone", validationSchema.phoneValidator)} />
                            <span className="error">{errors.phone?.message}</span>
                        </div>
                        <div className="input-container">
                            <input type="password" placeholder="Password" {...register("password", validationSchema.passwordValidator)} />
                            <span className="error">{errors.password?.message}</span>
                        </div>
                        <button type="submit" className="signup-btn">Sign Up</button>
                        <div className="options">
                            <div>
                                <input type="checkbox" id="terms" />
                                <label htmlFor="terms"> I agree to the Terms & Conditions</label>
                            </div>
                        </div>
                        <div className="signin-text">
                            Already have an account? <a href="/login">Log in now.</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
    
    export default Signup;
    