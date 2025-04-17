import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/admin/cases.css";

const CaseManagement = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all"
  });

  useEffect(() => {
    const fetchCases = async () => {
      try {
        let url = "http://localhost:3000/cases";
        // Add filters to query if not "all"
        if (filters.status !== "all") url += `?status=${filters.status}`;
        if (filters.dateRange !== "all") url += `${filters.status !== "all" ? '&' : '?'}dateRange=${filters.dateRange}`;
        
        const response = await axios.get(url);
        setCases(response.data.data || []);
      } catch (err) {
        console.error("Error fetching cases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [filters]);

  const handleStatusChange = async (caseId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/cases/${caseId}`, { status: newStatus });
      setCases(cases.map(c => 
        c._id === caseId ? { ...c, status: newStatus } : c
      ));
    } catch (err) {
      console.error("Error updating case:", err);
    }
  };

  if (loading) return <div className="loading-spinner">Loading cases...</div>;

  return (
    <div className="case-management">
      <h2>Case Management</h2>

      <div className="filters">
        <select 
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="pending">Pending</option>
        </select>

        <select
          value={filters.dateRange}
          onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
        >
          <option value="all">All Time</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      <div className="case-list">
        {cases.length > 0 ? (
          cases.map((caseItem) => (
            <div key={caseItem._id} className="case-card">
              <h3>{caseItem.title}</h3>
              <p>Client: {caseItem.clientId?.name || "N/A"}</p>
              <p>Lawyer: {caseItem.lawyerId?.name || "N/A"}</p>
              <p>Status: 
                <select
                  value={caseItem.status}
                  onChange={(e) => handleStatusChange(caseItem._id, e.target.value)}
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="pending">Pending</option>
                </select>
              </p>
              <p>Created: {new Date(caseItem.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No cases found.</p>
        )}
      </div>
    </div>
  );
};

export default CaseManagement;