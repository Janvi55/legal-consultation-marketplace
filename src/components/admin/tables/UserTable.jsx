import React, { useState } from 'react';
import axios from 'axios';
import "../../../assets/css/admin/tables.css"

const UserTable = ({ users, onEdit, onDelete }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (userId) => {
    setDeletingId(userId);
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      onDelete(userId);
    } catch (err) {
      console.error('Failed to delete user:', err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.active ? 'Active' : 'Inactive'}</td>
            <td className="actions">
              <button onClick={() => onEdit(user)} className="edit-btn">
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                disabled={deletingId === user._id}
                className="delete-btn"
              >
                {deletingId === user._id ? 'Deleting...' : 'Delete'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;