import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import "../../assets/css/admin/activity.css"

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/activity-logs');
        setActivities(response.data.logs || []);
      } catch (err) {
        console.error('Failed to fetch activities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="activity-feed">
      <h3>Recent Activity</h3>
      {loading ? (
        <div className="loading">Loading activities...</div>
      ) : activities.length > 0 ? (
        <ul className="activity-list">
          {activities.map((activity) => (
            <li key={activity._id} className="activity-item">
              <div className="activity-message">{activity.action}</div>
              <div className="activity-meta">
                <span className="activity-user">{activity.user?.name || 'System'}</span>
                <span className="activity-time">
                  {format(new Date(activity.timestamp), 'MMM dd, h:mm a')}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">No recent activities</div>
      )}
    </div>
  );
};

export default ActivityFeed;