
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const ResetPassword = () => {
  const token = useParams().token
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },watch
  } = useForm();

  const submitHandler = async (data) => {

    
        const obj = {
            token : token,
            password:data.password
        }
      const res = await axios.post("/users/resetpassword", obj);
      console.log(res.data);

      if (res.status === 200) {
        
        // alert("login successfully")
        toast.success('Reset Password Successfully', {
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

        } 
    }          
        

    

  const ValidationSchema = {
    newPasswordValidator: {
      required: "Password is required *",
      minLength: {
        value: 8,
        message: "Minimum length is 8",
      },
    },
    rpasswordValidator: {
      required: "Repeat Password is required *",
      minLength: { value: 8, message: "Minimum length is 8 characters" },
            validate: value => value === watch("password") || "Your password does not match"
      
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
      <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Your Password </h2>
          <Form onSubmit={handleSubmit(submitHandler)}>
            {/* Email Input */}
            <Form.Group className="mb-3">
              <Form.Label>Your New Password</Form.Label>
              <Form.Control type="password" {...register("password", ValidationSchema.newPasswordValidator)} />
              <span className="text-danger">{errors.password?.message}</span>
            </Form.Group>

            {/* Password Input */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' {...register("rpassword", ValidationSchema.rpasswordValidator)} />
              <span className="text-danger">{errors.rpassword?.message}</span>
            </Form.Group>

            

            {/* Submit Button */}
            <Button variant="primary" className="w-100 mb-3" type="submit">
              Reset Password
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};


//-------------------------------------------------------------
// import axios from 'axios'
// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { useParams } from 'react-router-dom'

// export const ResetPassword = () => {
//     const token = useParams().token
//     const {register,handleSubmit} = useForm()
//     const submitHandler = async(data)=>{
//         //resetpasseord api..
//         const obj = {
//             token:token,
//             password:data.password
//         }
//         const res = await axios.post("/users/resetpassword",obj)
//         console.log(res.data)
            

//     }
//   return (
//     <div>
//         <h1>RESET PASSWOERD COMPONENT</h1>
//         <form onSubmit={handleSubmit(submitHandler)}>
//             <div>
//                 <label>NEW PASSWORD</label>
//                 <input type='text' {...register("password")}></input>
//             </div>
//             <div>
//                 <input type='submit'></input>
//             </div>
//         </form>
//     </div>
//   )
// }