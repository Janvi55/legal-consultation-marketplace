import React from 'react';
import axios from 'axios';
import "../../assets/css/admin/verificationcard.css"

const VerificationCard = ({ lawyer, onApprove, onReject, onViewDoc }) => {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);

  const handleAction = async (actionType) => {
    setLoading(true);
    setAction(actionType);
    try {
      await axios.patch(`http://localhost:3000/lawyers/${lawyer._id}/verify`, {
        action: actionType
      });
      actionType === 'approve' ? onApprove() : onReject();
    } catch (err) {
      console.error(`Failed to ${actionType} lawyer:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verification-card">
      <div className="lawyer-info">
        <h3>{lawyer.userId?.firstName} {lawyer.userId?.lastName}</h3>
        <p><strong>Specialization:</strong> {lawyer.specialization}</p>
        <p><strong>Email:</strong> {lawyer.userId?.email}</p>
        <p><strong>Documents Submitted:</strong> {lawyer.verificationDocuments?.length || 0}</p>
      </div>
      
      <div className="verification-actions">
        <button
          onClick={() => handleAction('approve')}
          disabled={loading && action === 'approve'}
          className="approve-btn"
        >
          {loading && action === 'approve' ? 'Processing...' : 'Approve'}
        </button>
        <button
          onClick={() => handleAction('reject')}
          disabled={loading && action === 'reject'}
          className="reject-btn"
        >
          {loading && action === 'reject' ? 'Processing...' : 'Reject'}
        </button>
        {lawyer.verificationDocuments?.length > 0 && (
          <button
            onClick={() => onViewDoc(lawyer.verificationDocuments[0])}
            className="view-doc-btn"
          >
            View Document
          </button>
        )}
      </div>
    </div>
  );
};

export default VerificationCard;