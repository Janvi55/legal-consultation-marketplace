import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/lawyerProfile.css';
import { toast } from 'react-toastify';

const LawyerProfileForAdmin = () => {
  const { lawyerId } = useParams();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const res = await axios.get(`/lawyer/${lawyerId}`);
        setLawyer(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching lawyer:', err);
        setLoading(false);
      }
    };

    fetchLawyer();
  }, [lawyerId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/getReviewsByLawyerId/${lawyerId}`);
        setReviews(res.data.data || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, [lawyerId]);

  const handleBlockUnblock = async () => {
    try {
      const res = await axios.patch(`/admin/toggleLawyerBlock/${lawyerId}`);
      toast.success(res.data.message || 'Status updated');
      setLawyer(prev => ({ ...prev, isBlocked: !prev.isBlocked }));
    } catch (err) {
      toast.error('Failed to update block status');
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this lawyer?")) {
      try {
        await axios.delete(`/admin/deleteLawyer/${lawyerId}`);
        toast.success("Lawyer deleted");
        navigate("/admin/lawyerManagement"); // Navigate back to list
      } catch (err) {
        toast.error("Failed to delete lawyer");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="lawyer-profile-container">
      <div className="lawyer-info-card">
        <img src={lawyer.imageURL} alt={lawyer.name} className="lawyer-profile-img" />
        <div className="lawyer-profile-details">
          <h2>{lawyer.name}</h2>
          <p><strong>Email:</strong> {lawyer.email}</p>
          <p><strong>Specialization:</strong> {lawyer.specialization}</p>
          <p><strong>Experience:</strong> {lawyer.experience} years</p>
          <p><strong>Rating:</strong> ⭐ {lawyer.rating || 'N/A'} ({lawyer.ratingCount} reviews)</p>
          
          {/* Admin Controls */}
          <div className="admin-controls mt-3">
            <button
              className={`btn ${lawyer.isBlocked ? 'btn-success' : 'btn-warning'} me-2`}
              onClick={handleBlockUnblock}
            >
              {lawyer.isBlocked ? 'Unblock' : 'Block'}
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="review-section">
        <h3>Client Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews available for this lawyer.</p>
        ) : (
          <div className="review-list">
            {visibleReviews.map((review, index) => (
              <div key={index} className="review-card">
                <p><strong>User:</strong> {review.userId?.firstName || 'Anonymous'}</p>
                <p><strong>Rating:</strong> ⭐ {review.rating}</p>
                <p><strong>Comment:</strong> {review.comment}</p>
              </div>
            ))}
            {reviews.length > 3 && (
              <button
                className="toggle-reviews-btn"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews ? 'Show Less Reviews' : 'View More Reviews'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerProfileForAdmin;