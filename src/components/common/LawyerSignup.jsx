import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CustomLoader } from '../../CustomLoader';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export const LawyerSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    const submitHandler = async (data) => {
        setIsLoading(true);
        
        try {
            const formData = new FormData();
            // Append all text fields
            formData.append("name", data.name);
            formData.append("number", data.number);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("specialization", data.specialization);
            formData.append("experience", data.experience);
            formData.append("roleId", "67c7db50d5998e5ffc2cba1d");

            // Handle file upload
            if (!data.image || !data.image[0]) {
                throw new Error("Profile image is required");
            }
            
            if (data.image[0].size > MAX_FILE_SIZE) {
                throw new Error("Image size must be less than 5MB");
            }
            
            formData.append("image", data.image[0]);

            const res = await axios.post("http://localhost:3000/lawyerWithFile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 201) {
                toast.success('Registration Successful!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                setTimeout(() => navigate("/lawyerLogin"), 2500);
            }
        } catch (error) {
            console.error("Registration error:", error);
            const errorMessage = error.response?.data?.message || 
                              error.message || 
                              "Registration failed. Please try again.";
            
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const ValidationSchema = {
        nameValidator: { 
            required: "Name is required *",
            minLength: {
                value: 3,
                message: "Name must be at least 3 characters"
            }
        },
        numberValidator: {
            required: "Contact No is required *",
            pattern: { 
                value: /^[6-9][0-9]{9}$/, 
                message: "Please enter a valid 10-digit mobile number" 
            }
        },
        emailValidator: { 
            required: "Email is required *",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
            }
        },
        passwordValidator: {
            required: "Password is required *",
            minLength: { 
                value: 8, 
                message: "Password must be at least 8 characters" 
            },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must contain uppercase, lowercase, number and special character"
            }
        },
        rpasswordValidator: {
            required: "Please confirm your password *",
            validate: value => value === watch("password") || "Passwords do not match"
        },
        specializationValidator: { 
            required: "Specialization is required *" 
        },
        experienceValidator: { 
            required: "Experience is required *",
            min: {
                value: 0,
                message: "Experience cannot be negative"
            },
            max: {
                value: 50,
                message: "Experience seems too high"
            }
        },
        imageValidator: { 
            required: "Profile image is required *",
            validate: {
                lessThan5MB: files => files[0]?.size <= MAX_FILE_SIZE || "Max 5MB",
                acceptedFormats: files => 
                    ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0]?.type) || 
                    "Only JPEG, JPG or PNG"
            }
        },
        checkBoxValidator: { 
            required: "You must accept the terms and conditions *" 
        }
    };

    return (
        <div className="lawyer-signup-page">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            
            {isLoading && <CustomLoader />}
            
            <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <Card className="m-3 p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
                    <Card.Body>
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-primary">Lawyer Registration</h2>
                            <p className="text-muted">Create your professional account</p>
                        </div>
                        
                        <Form onSubmit={handleSubmit(submitHandler)}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            {...register("name", ValidationSchema.nameValidator)} 
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            {...register("number", ValidationSchema.numberValidator)}
                                            isInvalid={!!errors.number}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.number?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    {...register("email", ValidationSchema.emailValidator)}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            {...register("password", ValidationSchema.passwordValidator)}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            {...register("rpassword", ValidationSchema.rpasswordValidator)}
                                            isInvalid={!!errors.rpassword}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.rpassword?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Specialization</Form.Label>
                                        <Form.Select 
                                            {...register("specialization", ValidationSchema.specializationValidator)}
                                            isInvalid={!!errors.specialization}
                                        >
                                            <option value="">Select Specialization</option>
                                            <option value="Civil">Civil Law</option>
                                            <option value="Criminal">Criminal Law</option>
                                            <option value="Corporate">Corporate Law</option>
                                            <option value="Family">Family Law</option>
                                            <option value="Real Estate">Real Estate Law</option>
                                            <option value="Intellectual Property">IP Law</option>
                                            <option value="Tax">Tax Law</option>
                                            <option value="Employment">Employment Law</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.specialization?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Experience (Years)</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            {...register("experience", ValidationSchema.experienceValidator)}
                                            isInvalid={!!errors.experience}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.experience?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Profile Photo</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    accept="image/jpeg, image/png, image/jpg"
                                    {...register("image", ValidationSchema.imageValidator)}
                                    isInvalid={!!errors.image}
                                />
                                <Form.Text className="text-muted">
                                    JPEG, JPG or PNG (Max 5MB)
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    {errors.image?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            <Form.Group className="mb-4">
                                <Form.Check
                                    type="checkbox"
                                    id="terms-checkbox"
                                    label={
                                        <span>
                                            I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                                        </span>
                                    }
                                    {...register("terms", ValidationSchema.checkBoxValidator)}
                                    isInvalid={!!errors.terms}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.terms?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            <Button 
                                variant="primary" 
                                type="submit" 
                                className="w-100 py-2 fw-bold"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Registering...' : 'Create Account'}
                            </Button>
                            
                            <div className="text-center mt-3">
                                <p className="text-muted">
                                    Already have an account? <a href="/lawyerLogin">Sign In</a>
                                </p>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};






// import React, { useState } from 'react';
// import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { CustomLoader } from '../../CustomLoader';
// import { Bounce, toast, ToastContainer } from 'react-toastify';


// export const LawyerSignup = () => {
//     const [isLoading, setisLoading] = useState(false)
//     const { register, handleSubmit, formState: { errors }, watch } = useForm();
//     const navigate = useNavigate();

//     const submitHandler = async (data) => {
//          setisLoading(true);
        
// //          console.log(data);
// //          data.roleId = "67c7db50d5998e5ffc2cba1d";
         
// //          console.log(data);
// //          console.log(data.image[0])
//  try{
//         const formData = new FormData();
//         formData.append("name",data.name);
//         formData.append("number",data.number);
//         formData.append("email",data.email);
//         formData.append("password",data.password);
//         formData.append("specialization",data.specialization);
//         formData.append("experience",data.experience);
//         formData.append("rating",data.rating);
//         formData.append("roleId",data.roleId);
//         formData.append("image",data.image[0]);
//         formData.append("roleId", "67c7db50d5998e5ffc2cba1d");

//          // Handle file upload
//     // if (!data.image && data.image[0]) {
//     //     formData.append("image", data.image[0]);
//     //   } else {
//     //     throw new Error("Profile image is required");
//     //   }

//     if (!data.image || !data.image[0]) {
//         throw new Error("Profile image is required");
//     }
//     formData.append("image", data.image[0]);
  
//       const res = await axios.post("http://localhost:3000/lawyerWithFile", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
  
        
//         // setisLoading(true)
//         // const res = await axios.post("/lawyerWithFile",formData);
//         // setisLoading(false);
//         if (res.status === 201) {
//           toast.success('Signup Successfully', {
//                 position: "top-center",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//                 transition: Bounce,
//                 });
//             setTimeout(() => navigate("/lawyerLogin"),2500);
//         } 
//     }catch (error){
//             console.error("Registration error:", error);
//             const errorMessage = error.response?.data?.message || 
//                               error.message || 
//                               "Registration failed. Please try again.";
//             toast.error('  Invalid Credentials !!', {
//                                 position: "top-center",
//                                 autoClose: 5000,
//                                 hideProgressBar: false,
//                                 closeOnClick: false,
//                                 pauseOnHover: true,
//                                 draggable: true,
//                                 progress: undefined,
//                                 theme: "dark",
//                                 transition: Bounce,
//                                 });
//                             }finally{
//                                 setisLoading(false);
//                             }
        

        
//     }
//     }

    


//     const ValidationSchema = {
//         nameValidator: { required: "First Name is required *" },
        
//         numberValidator: {
//             required: "Contact No is required *",
//             pattern: { value: /^[6-9][0-9]{9}$/, message: "Contact is not valid" }
//         },
//         emailValidator: { required: "Email is required *" },
//         passwordValidator: {
//             required: "Password is required *",
//             minLength: { value: 8, message: "Minimum length is 8 characters" }
//         },
//         rpasswordValidator: {
//             required: "Repeat password is required *",
//             minLength: { value: 8, message: "Minimum length is 8 characters" },
//             validate: value => value === watch("password") || "Your password does not match"
//         },
//         specializationValidator: { required: "Specialization is required *" },
//         experienceValidator: { required: "Experience is required *" },
//         // ratingValidator: { required: "Rating is required *" },
//         imageValidator: { required: "Image is required *" },
//         checkBoxValidator: { required: "You must accept the terms and conditions" }
//     };

//     return (
//         <div>
//             <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//         transition={Bounce}
//       />
//             {isLoading == true && <CustomLoader/>}
//         <Container fluid className='d-flex align-items-center justify-content-center min-vh-100' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//             <Card className='m-3 p-3 shadow-lg' style={{ maxWidth: '500px', width: '100%' }}>
//                 <Card.Body>
//                     <h2 className="text-center mb-4">Create an Account</h2>
//                     <Form onSubmit={handleSubmit(submitHandler)}>
//                         <Form.Group className='mb-2'>
//                             <Form.Label>Your Name</Form.Label>
//                             <Form.Control type='text' {...register("name", ValidationSchema.nameValidator)} />
//                             <span className="text-danger">{errors.name?.message}</span>
//                         </Form.Group>

//                         <Form.Group className='mb-2'>
//                             <Form.Label>Your Contact No</Form.Label>
//                             <Form.Control type='text' {...register("number", ValidationSchema.numberValidator)} />
//                             <span className="text-danger">{errors.number?.message}</span>
//                         </Form.Group>

//                         <Form.Group className='mb-2'>
//                             <Form.Label>Your Email</Form.Label>
//                             <Form.Control type='email' {...register("email", ValidationSchema.emailValidator)} />
//                             <span className="text-danger">{errors.email?.message}</span>
//                         </Form.Group>

//                         <Form.Group className='mb-2'>
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control type='password' {...register("password", ValidationSchema.passwordValidator)} />
//                             <span className="text-danger">{errors.password?.message}</span>
//                         </Form.Group>

//                         <Form.Group className='mb-2'>
//                             <Form.Label>Repeat Your Password</Form.Label>
//                             <Form.Control type='password' {...register("rpassword", ValidationSchema.rpasswordValidator)} />
//                             <span className="text-danger">{errors.rpassword?.message}</span>
//                         </Form.Group>
                          
//                         {/* <Form.Group className='mb-2'>
//                             <Form.Label>Specialization</Form.Label>
//                             <Form.Control type='text' {...register("specialization", ValidationSchema.specializationValidator)} />
//                             <span className="text-danger">{errors.specialization?.message}</span>
//                         </Form.Group> */}

// <Form.Group className="mb-2">
//   <Form.Label>Specialization</Form.Label>
//   <Form.Select {...register("specialization", ValidationSchema.specializationValidator)}>
//     <option value="">Select Specialization</option>
//     <option value="Civil">Civil</option>
//     <option value="Criminal">Criminal</option>
//     <option value="Corporate">Corporate</option>
//     <option value="Family">Family</option>
//     <option value="Real Estate">Real Estate</option>
//     <option value="Intellectual Property">Intellectual Property</option>
//     <option value="Tax">Tax</option>
//     <option value="Employment">Employment</option>
//   </Form.Select>
//   <span className="text-danger">{errors.specialization?.message}</span>
// </Form.Group>


//                         <Form.Group className='mb-2'>
//                             <Form.Label>Experience</Form.Label>
//                             <Form.Control type='number' {...register("experience", ValidationSchema.experienceValidator)} />
//                             <span className="text-danger">{errors.experience?.message}</span>
//                         </Form.Group>

//                         {/* <Form.Group className='mb-2'>
//                             <Form.Label>Rating</Form.Label>
//                             <Form.Control type='decimal' {...register("rating", ValidationSchema.ratingValidator)} />
//                             <span className="text-danger">{errors.rating?.message}</span>
//                         </Form.Group> */}

//                         <Form.Group className='mb-2'>
//                             <Form.Label>Select Your Image URL</Form.Label>
//                             <Form.Control type='file' {...register("image", ValidationSchema.imageValidator)} />
//                             <span className="text-danger">{errors.image?.message}</span>
//                         </Form.Group>

                        

//                         <Form.Group className='mt-3'>
//                             <Form.Check 
//                                 type='checkbox' 
//                                 label='I agree to the Terms of Service' 
//                                 {...register("terms", ValidationSchema.checkBoxValidator)} 
//                             />
//                             <span className="text-danger">{errors.terms?.message}</span>
//                         </Form.Group>

//                         <Button type="submit" className='mt-4 w-100'>Register</Button>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         </Container>
//        </div> 
//     );
