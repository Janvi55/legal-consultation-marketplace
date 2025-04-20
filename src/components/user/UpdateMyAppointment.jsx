


import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { CustomLoader } from '../../CustomLoader';

export const UpdateMyAppointment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [appointmentStatus, setAppointmentStatus] = useState("");
    const [lawyerName, setLawyerName] = useState(""); // Store lawyer's name
    const navigate = useNavigate();
    const { id } = useParams();
    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // useEffect(() => {
    //     const fetchAppointment = async () => {
    //         setIsLoading(true);
    //         try {
    //             const res = await axios.get(`/getAppointmentById/${id}`);
    //             const appointmentData = res.data.data;
    //             setIsLoading(false);

    //             // Pre-fill form with appointment data
    //             Object.keys(appointmentData).forEach(key => setValue(key, appointmentData[key]));

    //             // Save the appointment status
    //             setAppointmentStatus(appointmentData.status);

    //             // Fetch the lawyer's details using lawyerId
    //             if (appointmentData.lawyerId) {
    //                 fetchLawyerName(appointmentData.lawyerId);
    //             }
    //         } catch (error) {
    //             setIsLoading(false);
    //             console.error("Error fetching appointment:", error);
    //         }
    //     };

    //     fetchAppointment();
    // }, [id, setValue]);

    useEffect(() => {
        const fetchAppointment = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`/getAppointmentById/${id}`);
                const appointmentData = res.data.data;
                setIsLoading(false);
    
                // Save the appointment status
                setAppointmentStatus(appointmentData.status);
    
                // Prevent access if the status is NOT "Pending"
                if (appointmentData.status !== "Pending") {
                    toast.error("Appointment can't be updated after it's Confirmed or Rejected!", { theme: "dark" });
                    setTimeout(() => navigate("/user"), 3000); // Redirect after 2 seconds
                    return;
                }
    
                // Pre-fill form with appointment data
                Object.keys(appointmentData).forEach(key => setValue(key, appointmentData[key]));
    
                // Fetch the lawyer's details using lawyerId
                if (appointmentData.lawyerId) {
                    fetchLawyerName(appointmentData.lawyerId);
                }
            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching appointment:", error);
            }
        };
    
        fetchAppointment();
    }, [id, setValue, navigate]);
    

    // Fetch Lawyer's Name by ID
    const fetchLawyerName = async (lawyerId) => {
        try {
            console.log("Fetching lawyer details for ID:", lawyerId); // Debugging log
            const res = await axios.get(`/lawyer/${lawyerId}`);
            
            console.log("API Response:", res.data); // Check what the API returns
    
            if (res.data && res.data.data && res.data.data.name) {
                setLawyerName(res.data.data.name);
            } else {
                setLawyerName("Unknown Lawyer (No Name Found)");
            }
        } catch (error) {
            console.error("Error fetching lawyer:", error);
            setLawyerName("Unknown Lawyer (API Error)");
        }
    };
    

    const submitHandler = async (data) => {
        if (appointmentStatus !== "Pending") {
            toast.error("You can only update appointments with 'Pending' status!", { theme: "dark" });
            return; // Stop form submission
        }
    
        try {
            const userId = localStorage.getItem("id");
            data.userId = userId;
    
            // Ensure only allowed fields are updated
            const updatedData = {
                appointmentDate: data.appointmentDate,
                appointmentTime: data.appointmentTime,
                consultationType: data.consultationType,
                paymentStatus: data.paymentStatus,
            };
    
            const res = await axios.put(`/updateAppointment/${id}`, updatedData);
    
            if (res.status === 200) {
                toast.success("Appointment Updated Successfully!", { theme: "dark" });
                setTimeout(() => navigate("/user"), 2500);
            }
        } catch (error) {
            console.error("Update failed:", error.response?.data);
            toast.error(error.response?.data?.message || "Appointment update failed!", { theme: "dark" });
        }
    };
    

    return (
        <div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} theme="dark" transition={Bounce} />
            {isLoading && <CustomLoader />}
            
            <Container fluid className="d-flex align-items-center justify-content-center min-vh-100" 
                style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                
                <Card className="m-3 p-3 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Update Your Appointment</h2>
                        <Form onSubmit={handleSubmit(submitHandler)}>

                            {/* Problem Category - Disabled after booking */}
                            <Form.Group className="mb-2">
                                <Form.Label>Problem Category</Form.Label>
                                <Form.Select {...register("problemCategory")} disabled>
                                    <option value="Civil">Civil</option>
                                    <option value="Criminal">Criminal</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Family">Family</option>
                                    <option value="Real Estate">Real Estate</option>
                                    <option value="Intellectual Property">Intellectual Property</option>
                                    <option value="Tax">Tax</option>
                                    <option value="Employment">Employment</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Lawyer Name - Now Showing Name Instead of ID */}
                            <Form.Group className="mb-2">
                                <Form.Label>Lawyer</Form.Label>
                                <Form.Control type="text" value={lawyerName} disabled />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Appointment Date</Form.Label>
                                <Form.Control type="date" {...register("appointmentDate", { required: "Appointment Date is required *" })} />
                                <span className="text-danger">{errors.appointmentDate?.message}</span>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Appointment Time</Form.Label>
                                <Form.Control type="time" {...register("appointmentTime", { required: "Appointment Time is required *" })} />
                                <span className="text-danger">{errors.appointmentTime?.message}</span>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Consultation Types</Form.Label>
                                <Form.Select {...register("consultationType", { required: "Consultation Type is required" })}>
                                    <option value="">Select Consultation Type</option>
                                    <option value="Voice">Voice</option>
                                    <option value="Video">Video</option>
                                    <option value="Chat">Chat</option>
                                </Form.Select>
                                <span className="text-danger">{errors.consultationType?.message}</span>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Payment Status</Form.Label>
                                <Form.Select {...register("paymentStatus", { required: "Payment Status is required" })}>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Failed">Failed</option>
                                </Form.Select>
                                <span className="text-danger">{errors.paymentStatus?.message}</span>
                            </Form.Group>

                            <Button type="submit" className="mt-4 w-100" disabled={appointmentStatus !== "Pending"}>
                                Update Appointment
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(appointment._id)}>
                                Delete
                            </Button>

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};