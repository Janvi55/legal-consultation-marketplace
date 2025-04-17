// import React from 'react'
// import { useForm } from 'react-hook-form';
// import "./loginsignup/login.css"
// import axios from 'axios';
// import { Bounce, toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// export const Login = () => {
 
//       const { register, handleSubmit, formState: { errors } } = useForm();
//       const navigate = useNavigate();
  
//       const submitHandler = async (data) => {
//         try{
//         const res= await axios.post("/users/login", data)
//         console.log(res);
//             console.log(res.data)
       
//               if(res.status===200){

//               toast.success ('login successfull!!', {
//                                position: "top-center",
//                                autoClose: 5000,
//                                hideProgressBar: false,
//                                closeOnClick: false,
//                                pauseOnHover: true,
//                                draggable: true,
//                                progress: undefined,
//                                theme: "dark",
//                                transition: Bounce,
//                                })
//                 localStorage.setItem("id",res.data.data._id)
//                 localStorage.setItem("role",res.data.data.roleId.name)
//                 setTimeout(() => {
//                 if(res.data.data.roleId.name=== "USER"){

//                   navigate("/user")
                  
//                 }else if(res.data.data.roleId.name === "lawyer"){
//                     navigate("/lawyer")
//                 }
//               }, 3000);

//               }
//             }catch(error) {
//                 toast.error('Invalid Credentials!', {
//                                position: "top-center",
//                                autoClose: 5000,
//                                hideProgressBar: false,
//                                closeOnClick: false,
//                                pauseOnHover: true,
//                                draggable: true,
//                                progress: undefined,
//                                theme: "dark",
//                                transition: Bounce,
//                                })
//               }
//         };
   
//       return (
//           <div className="legal-login-container">
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick={false}
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//                 transition={Bounce}
// />
//               <div className="login-box">
//                   <h1>Login to Legal Consultancy</h1>
//                   <form onSubmit={handleSubmit(submitHandler)}>
//                       <div className="input-container">
//                           <input type="email" placeholder="Email Address" {...register("email", { required: "Email is required*" })} />
//                           <span className="error">{errors.email?.message}</span>
//                       </div>
//                       <div className="input-container">
//                           <input type="password" placeholder="Password" {...register("password", { required: "Password is required*" })} />
//                           <span className="error">{errors.password?.message}</span>
//                       </div>
//                       <button type="submit" className="login-btn">Login</button>
//                       <div className="options">
//                           <label><input type="checkbox" {...register("rememberMe")} /> Remember me</label>
//                           <a href="/forgotpassword/:token">Forgot password?</a>
//                       </div>
//                       <div className="signup-text">
//                           New here? <a href="/signup">Sign up now.</a>
//                       </div>
//                   </form>
//               </div>
//           </div>
//       );
//   };
  
//   export default Login;
  


import React from 'react';
import { useForm } from 'react-hook-form';
import "./loginsignup/login.css";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();
  
  const navigate = useNavigate();
  const { login}  = useAuth(); 
  

  const submitHandler = async (data) => {
    try {
        const res = await axios.post("/users/login", data);
      data.email = data.email.toLowerCase().trim();
      
      console.log("Attempting login with:", data);
      console.log(res.data)

      
      const loginResult = await login(data);
      
      if (loginResult.success) {

        const{_id, roleId}= res.data.data

        localStorage.setItem("id", res.data.data._id);
         localStorage.setItem("role", res.data.data.roleId.name);
         localStorage.setItem("token", res.data.token);
        toast.success('Login successful! Redirecting...', {
          position: "top-center",
          autoClose: 2000,
        });
  
        setTimeout(() => {
          const role = loginResult.user.role.toLowerCase();
          switch(role) {
            case 'admin':
              navigate("/admin/dashboard");
              break;
            case 'lawyer':
              navigate("/lawyer");
              break;
            case 'user':
              navigate("/user");
              break;
            default:
              navigate("/");
          }
        }, 2000);
      } else  {
        // Use the error from loginResult instead of throwing
        let errorMessage = loginResult.error || "Authentication failed";
        
        // Check if we have response details
        if (loginResult.response) {
          if (loginResult.response.status === 401) {
            errorMessage = "Invalid email or password";
          } else if (loginResult.response.status === 404) {
            errorMessage = "User not found";
          }
        }
        
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch(error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="legal-login-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="login-box">
        <h1>Login to Legal Consultancy</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="input-container">
            <input 
              type="email" 
              placeholder="Email Address" 
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address"
                }
              })} 
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>
          
          <div className="input-container">
            <input 
              type="password" 
              placeholder="Password" 
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })} 
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>
          
          <button 
            type="submit" 
            className="login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : "Login"}
          </button>
          
          <div className="options">
            <label>
              <input type="checkbox" {...register("rememberMe")} /> 
              Remember me
            </label>
            <a href="/forgotpassword/:token">Forgot password?</a>
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