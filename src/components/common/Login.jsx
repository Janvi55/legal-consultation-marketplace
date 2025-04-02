import React from 'react'
import { useForm } from 'react-hook-form';
import "./loginsignup/login.css"
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
 
      const { register, handleSubmit, formState: { errors } } = useForm();
      const navigate = useNavigate();
  
      const submitHandler = async (data) => {
        try{
        const res= await axios.post("/users/login", data)
        console.log(res);
            console.log(res.data)
       
              if(res.status===200){

              toast.success ('login successfull!!', {
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
                localStorage.setItem("id",res.data.data._id)
                localStorage.setItem("role",res.data.data.roleId.name)
                setTimeout(() => {
                if(res.data.data.roleId.name=== "USER"){

                  navigate("/user")
                  
                }else if(res.data.data.roleId.name === "lawyer"){
                    navigate("/lawyer")
                }
              }, 3000);

              }
            }catch(error) {
                toast.error('Invalid Credentials!', {
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
   
      return (
          <div className="legal-login-container">
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
              <div className="login-box">
                  <h1>Login to Legal Consultancy</h1>
                  <form onSubmit={handleSubmit(submitHandler)}>
                      <div className="input-container">
                          <input type="email" placeholder="Email Address" {...register("email", { required: "Email is required*" })} />
                          <span className="error">{errors.email?.message}</span>
                      </div>
                      <div className="input-container">
                          <input type="password" placeholder="Password" {...register("password", { required: "Password is required*" })} />
                          <span className="error">{errors.password?.message}</span>
                      </div>
                      <button type="submit" className="login-btn">Login</button>
                      <div className="options">
                          <label><input type="checkbox" {...register("rememberMe")} /> Remember me</label>
                          <a href="#">Forgot password?</a>
                      </div>
                      <div className="signup-text">
                          New here? <a href="/signup">Sign up now.</a>
                      </div>
                  </form>
              </div>
          </div>
      );
  };
  
  export default Login;
  
