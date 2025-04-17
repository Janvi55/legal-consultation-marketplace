import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/css/admin/card.css"

const StatCard = ({ title, endpoint, icon, color }) => {
  const [value, setValue] = useState('--');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${endpoint}`);
        setValue(response.data.count || response.data.total || 0);
      } catch (err) {
        console.error(`Failed to fetch ${title} data:`, err);
        setValue('Error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, title]);

  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{title}</h3>
        <p>{loading ? 'Loading...' : value}</p>
      </div>
    </div>
  );
};

export default StatCard;