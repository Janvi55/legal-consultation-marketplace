

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { CustomLoader } from '../../CustomLoader'

export const ViewMyAppointments = () => {
    const [appointments, setAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getAllMyAppointments = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`/appointmentByUserId/${localStorage.getItem("id")}`)
            setAppointments(res.data.data)
        } catch (error) {
            console.error("Error fetching appointments:", error)
            toast.error("Failed to fetch appointments!", { theme: "dark" })
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getAllMyAppointments()
    }, [])

    // Handle Delete Appointment
    const handleDelete = async (appointmentId) => {
        if (!window.confirm("Are you sure you want to delete this appointment?")) return;

        try {
            await axios.delete(`/deleteAppointment/${appointmentId}`)
            toast.success("Appointment deleted successfully!", { theme: "dark" })
            
            // Remove the deleted appointment from UI
            setAppointments(appointments.filter(appo => appo._id !== appointmentId))
        } catch (error) {
            console.error("Delete failed:", error)
            toast.error("Failed to delete appointment!", { theme: "dark" })
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <ToastContainer position="top-center" autoClose={5000} theme="dark" />
            {isLoading && <CustomLoader />}<br />
            <h2>MY Appointments</h2>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th>Appointment Date</th>
                        <th>Appointment Time</th>
                        <th>Consultation Type</th>
                        <th>Problem Category</th>
                        <th>Payment Status</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments?.map((appo) => (
                        <tr key={appo._id}>
                            <td>{new Date(appo.appointmentDate).toLocaleDateString()}</td>
                            <td>{appo.appointmentTime}</td>
                            <td>{appo.consultationType}</td>
                            <td>{appo.problemCategory}</td>
                            <td>{appo.paymentStatus}</td>
                            <td>{appo.status}</td>
                            <td>
                                {/* UPDATE Button - Only Visible for "Pending" Appointments */}
                                {appo.status === "Pending" ? (
                                    <Link to={`/user/updateAppointment/${appo._id}`} className="btn btn-info">UPDATE</Link>
                                ) : (
                                    <button className="btn btn-secondary" disabled>Cannot Update</button>
                                )}
                                
                                {/* DELETE Button - Always Visible */}
                                <button 
                                    className="btn btn-danger ms-2" 
                                    onClick={() => handleDelete(appo._id)}
                                >
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}