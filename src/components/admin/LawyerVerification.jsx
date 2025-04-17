import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/admin/verification.css";

const LawyerVerification = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingLawyers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/lawyers?verified=false");
        setLawyers(response.data.data || []);
      } catch (err) {
        console.error("Error fetching pending lawyers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingLawyers();
  }, []);

  const handleVerification = async (lawyerId, action) => {
    try {
      await axios.patch(`http://localhost:3000/lawyers/${lawyerId}/verify`, { action });
      setLawyers(lawyers.filter(lawyer => lawyer._id !== lawyerId));
    } catch (err) {
      console.error(`Error ${action}ing lawyer:`, err);
    }
  };

  if (loading) return <div className="loading-spinner">Loading verifications...</div>;

  return (
    <div className="lawyer-verification">
      <h2>Lawyer Verifications</h2>
      <p>{lawyers.length} pending verification(s)</p>

      <div className="verification-list">
        {lawyers.length > 0 ? (
          lawyers.map((lawyer) => (
            <div key={lawyer._id} className="verification-card">
              <div className="lawyer-info">
                <h3>{lawyer.userId?.firstName} {lawyer.userId?.lastName}</h3>
                <p>Specialization: {lawyer.specialization}</p>
                <p>Email: {lawyer.userId?.email}</p>
                <p>Documents: {lawyer.verificationDocuments?.length || 0}</p>
              </div>
              <div className="verification-actions">
                <button 
                  onClick={() => handleVerification(lawyer._id, "approve")}
                  className="approve-btn"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleVerification(lawyer._id, "reject")}
                  className="reject-btn"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No pending verifications.</p>
        )}
      </div>
    </div>
  );
};

export default LawyerVerification;