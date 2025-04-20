
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReviewManagement = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/admin/getAllReviews');
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`/admin/deleteReview/${id}`);
        setReviews(prev => prev.filter(review => review._id !== id));
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  useEffect(() => { 
    fetchReviews();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">All Reviews</h2>

      {reviews.length === 0 ? (
        <div className="text-center">
          <p className="text-muted">No reviews available.</p>
        </div>
      ) : (
        <div className="row g-4">
          {reviews.map((review) => (
            <div key={review._id} className="col-sm-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow rounded-4">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-2">👨‍⚖️ Lawyer: <strong>{review.lawyerId?.name || "N/A"}</strong></h5>
                  <h6 className="card-subtitle mb-3 text-muted">
                    🧑‍💼 User: {review.userId
                      ? `${review.userId.firstName} ${review.userId.lastName}`
                      : "Unknown User"}
                  </h6>
                  <p className="card-text mb-2"><strong>💬 Comment:</strong> {review.comment}</p>
                  <p className="card-text"><strong>⭐ Rating:</strong> {review.rating}</p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviewManagement;