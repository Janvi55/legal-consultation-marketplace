import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CustomLoader } from '../../CustomLoader';


export const SupportSignup = () => {

    const [isLoading, setisLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        setisLoading(true)
        console.log(data);
        data.roleId = "67c2aecd4e0ed74a6a077cf7";

        const res = await axios.post("/support", data);
        //setisLoading(false)

        if (res.status === 201) {
            alert("Lawyer created..");
            navigate("/support/supportlogin");
        } else {
            alert("Lawyer not added..");
        }
    };

    const ValidationSchema = {
        nameValidator: { required: "First Name is required *" },
        
        numberValidator: {
            required: "Contact No is required *",
            pattern: { value: /^[6-9][0-9]{9}$/, message: "Contact is not valid" }
        },
        emailValidator: { required: "Email is required *" },
        passwordValidator: {
            required: "Password is required *",
            minLength: { value: 8, message: "Minimum length is 8 characters" }
        },
        rpasswordValidator: {
            required: "Repeat password is required *",
            minLength: { value: 8, message: "Minimum length is 8 characters" },
            validate: value => value === watch("password") || "Your password does not match"
        },
        specializationValidator: { required: "Specialization is required *" },
        experienceValidator: { required: "Experience is required *" },
        ratingValidator: { required: "Rating is required *" },
        checkBoxValidator: { required: "You must accept the terms and conditions" }
    };

    return (
        <div>
            {isLoading == true && <CustomLoader/>}
        <Container fluid className='d-flex align-items-center justify-content-center min-vh-100' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Card className='m-3 p-3 shadow-lg' style={{ maxWidth: '500px', width: '100%' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Create an Account</h2>
                    <Form onSubmit={handleSubmit(submitHandler)}>
                        <Form.Group className='mb-2'>
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control type='text' {...register("name", ValidationSchema.nameValidator)} />
                            <span className="text-danger">{errors.name?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Your Contact No</Form.Label>
                            <Form.Control type='text' {...register("number", ValidationSchema.numberValidator)} />
                            <span className="text-danger">{errors.number?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Your Email</Form.Label>
                            <Form.Control type='email' {...register("email", ValidationSchema.emailValidator)} />
                            <span className="text-danger">{errors.email?.message}</span>
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
                          
                        <Form.Group className='mb-2'>
                            <Form.Label>Specialization</Form.Label>
                            <Form.Control type='text' {...register("specialization", ValidationSchema.specializationValidator)} />
                            <span className="text-danger">{errors.specialization?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Experience</Form.Label>
                            <Form.Control type='number' {...register("experience", ValidationSchema.experienceValidator)} />
                            <span className="text-danger">{errors.experience?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type='decimal' {...register("rating", ValidationSchema.ratingValidator)} />
                            <span className="text-danger">{errors.rating?.message}</span>
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