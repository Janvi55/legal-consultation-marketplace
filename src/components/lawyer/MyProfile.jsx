
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/lawyerProfile.css'; // Reuse same styles

const MyProfile = () => {
  const [lawyer, setLawyer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const lawyerId = localStorage.getItem("id");

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/lawyer/${lawyerId}`);
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
        const res = await axios.get(`http://localhost:3000/getReviewsByLawyerId/${lawyerId}`);
        setReviews(res.data.data || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, [lawyerId]);

  if (loading) return <div>Loading...</div>;

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="lawyer-profile-container">
        {lawyer ? (
            <>
      <div className="lawyer-info-card">
        <img
          src={lawyer.imageURL || 'https://via.placeholder.com/150'}
          alt={lawyer.name || 'Lawyer'}
          className="lawyer-profile-img"
        />
        <div className="lawyer-profile-details">
          <h2>{lawyer.name}</h2>
          <p><strong>Email:</strong> {lawyer.email}</p>
          <p><strong>Specialization:</strong> {lawyer.specialization}</p>
          <p><strong>Experience:</strong> {lawyer.experience} years</p>
          <p><strong>Rating:</strong> ⭐ {lawyer.rating || 'N/A'} ({lawyer.ratingCount || 0} reviews)</p>
        </div>
      </div>

      <div className="review-section">
        <h3>Client Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews available for you yet.</p>
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
      </>
        ):(
            <p> No lawyer data found</p>
        )}
    </div>
  );
};

export default MyProfile;