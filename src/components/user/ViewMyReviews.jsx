

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { CustomLoader } from '../../CustomLoader'

export const ViewMyReviews = () => {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getAllMyReviews = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`/getAllReviewsByUserId/${localStorage.getItem("id")}`)
            setReviews(res.data.data)
        } catch (error) {
            console.error("Error fetching Reviews:", error)
            toast.error("Failed to fetch reviews!", { theme: "dark" })
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getAllMyReviews()
    }, [])

    // Handle Delete Query
    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this Review?")) return;

        try {
            await axios.delete(`/deleteReview/${reviewId}`)
            toast.success("Review deleted successfully!", { theme: "dark" })
            
            // Remove the deleted appointment from UI
            setReviews(reviews.filter(review => review._id !== reviewId))
        } catch (error) {
            console.error("Delete failed:", error)
            toast.error("Failed to delete review!", { theme: "dark" })
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <ToastContainer position="top-center" autoClose={5000} theme="dark" />
            {isLoading && <CustomLoader />}<br />
            <h2>MY Reviews</h2>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th>Review Date</th>
                        <th>Lawyer Name</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews?.map((review) => (
                        <tr key={review._id}>
                            <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                            <td>{review.lawyerId?.name || "N/A"}</td>
                            <td>{review.rating}</td>
                            <td>{review.comment}</td>
                            <td>
                                
                                {/* DELETE Button - Always Visible */}
                                <button 
                                    className="btn btn-danger ms-2" 
                                    onClick={() => handleDelete(review._id)}
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
