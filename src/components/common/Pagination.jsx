import React from 'react';
import axios from 'axios';
import "../../assets/css/admin/utilites.css"

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setLoading(true);
    try {
      await onPageChange(newPage);
    } catch (err) {
      console.error('Failed to change page:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pagination-controls">
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        disabled={loading}
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
      </select>
      
      <button 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
      >
        Previous
      </button>
      
      <span>Page {currentPage} of {totalPages}</span>
      
      <button 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;