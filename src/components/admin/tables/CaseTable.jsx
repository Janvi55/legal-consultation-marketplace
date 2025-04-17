import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import "../../../assets/css/admin/tables.css"

const CaseTable = ({ cases, onRefresh, onStatusChange }) => {
  const [loadingId, setLoadingId] = useState(null);

  const handleStatusUpdate = async (caseId, newStatus) => {
    setLoadingId(caseId);
    try {
      await axios.patch(`http://localhost:3000/cases/${caseId}`, { status: newStatus });
      onStatusChange(caseId, newStatus);
    } catch (err) {
      console.error('Failed to update case:', err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <table className="case-table">
      <thead>
        <tr>
          <th>Case ID</th>
          <th>Title</th>
          <th>Client</th>
          <th>Lawyer</th>
          <th>Status</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cases.map((caseItem) => (
          <tr key={caseItem._id}>
            <td>{caseItem.caseNumber || 'N/A'}</td>
            <td>{caseItem.title}</td>
            <td>{caseItem.clientId?.name || 'N/A'}</td>
            <td>{caseItem.lawyerId?.name || 'N/A'}</td>
            <td>
              <select
                value={caseItem.status}
                onChange={(e) => handleStatusUpdate(caseItem._id, e.target.value)}
                disabled={loadingId === caseItem._id}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="pending">Pending</option>
              </select>
            </td>
            <td>{format(new Date(caseItem.createdAt), 'MMM dd, yyyy')}</td>
            <td>
              <button 
                onClick={() => onRefresh()} 
                className="refresh-btn"
              >
                Refresh
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CaseTable;