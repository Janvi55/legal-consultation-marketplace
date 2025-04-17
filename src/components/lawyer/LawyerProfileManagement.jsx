import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { uploadSingle, uploadMultiple } from "../../middleware/DocumentMiddleware";
import "../../assets/css/lawyer/lawyerdashboard.css";

const Profile = () => {
  const { lawyerData: contextLawyerData, setLawyerData: contextSetLawyerData } = useOutletContext();
  const [lawyerData, setLawyerData] = useState(contextLawyerData);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialization: "",
    experienceYears: "",
    location: ""
  });
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [verificationDocs, setVerificationDocs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Sync with context if it changes
  useEffect(() => {
    if (contextLawyerData) {
      setLawyerData(contextLawyerData);
    }
  }, [contextLawyerData]);

  // Initialize form data
  useEffect(() => {
    if (lawyerData) {
      setFormData({
        firstName: lawyerData.userId.firstName,
        lastName: lawyerData.userId.lastName,
        email: lawyerData.userId.email,
        phone: lawyerData.userId.phone || "",
        specialization: lawyerData.specialization,
        experienceYears: lawyerData.experienceYears,
        location: lawyerData.location
      });
      setVerificationDocs(lawyerData.verification.documents || []);
      setLoading(false);
    }
  }, [lawyerData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const result = await uploadSingle(
        file, 
        "http://localhost:3000/lawyer/profile/picture",
        "profilePic"
      );

      if (result.success) {
        const updatedLawyerData = {
          ...lawyerData,
          userId: {
            ...lawyerData.userId,
            profilePic: result.data.profilePicUrl
          }
        };
        
        setLawyerData(updatedLawyerData);
        if (contextSetLawyerData) {
          contextSetLawyerData(updatedLawyerData);
        }
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleVerificationUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const result = await uploadMultiple(
        files,
        "http://localhost:3000/lawyer/verification",
        "documents"
      );

      if (result.success) {
        const updatedDocs = result.data.verification.documents;
        setVerificationDocs(updatedDocs);
        
        const updatedLawyerData = {
          ...lawyerData,
          verification: {
            ...lawyerData.verification,
            documents: updatedDocs
          }
        };
        
        setLawyerData(updatedLawyerData);
        if (contextSetLawyerData) {
          contextSetLawyerData(updatedLawyerData);
        }
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error uploading verification documents:", error);
    }
  };

  const handleRemoveDoc = async (docIndex) => {
    try {
      const token = localStorage.getItem("token");
      const updatedDocs = [...verificationDocs];
      updatedDocs.splice(docIndex, 1);

      const response = await axios.patch(
        "http://localhost:3000/lawyer/verification",
        { documents: updatedDocs },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      const updatedLawyerData = {
        ...lawyerData,
        verification: {
          ...lawyerData.verification,
          documents: response.data.data.verification.documents
        }
      };
      
      setVerificationDocs(updatedDocs);
      setLawyerData(updatedLawyerData);
      if (contextSetLawyerData) {
        contextSetLawyerData(updatedLawyerData);
      }
    } catch (error) {
      console.error("Error removing document:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/lawyer/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      const updatedData = response.data.data;
      setLawyerData(updatedData);
      if (contextSetLawyerData) {
        contextSetLawyerData(updatedData);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading || !lawyerData) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>
      
      <div className="profile-section">
        <div className="profile-picture">
          <div className="avatar">
            {lawyerData.userId.profilePic ? (
              <img src={lawyerData.userId.profilePic} alt="Profile" />
            ) : (
              <span>
                {lawyerData.userId?.firstName?.charAt(0) || 'D'}
                {lawyerData.userId?.lastName?.charAt(0) || ''}
              </span>
            )}
          </div>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            onChange={handleProfilePicChange}
            style={{ display: "none" }}
          />
          <label htmlFor="profilePic" className="change-photo-btn">
            Change Photo
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>
            <div className="form-group">
              <label>Years of Experience</label>
              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
          </div>

          {isEditing ? (
            <div className="form-actions">
              <button type="submit" className="btn-save">
                Save Changes
              </button>
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              type="button" 
              className="btn-edit"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </form>
      </div>

      <div className="verification-section">
        <h3>Verification Documents</h3>
        <p>Status: <span className={`status ${lawyerData.verification.status}`}>
          {lawyerData.verification.status}
        </span></p>

        <div className="documents-list">
          {verificationDocs.length > 0 ? (
            verificationDocs.map((doc, index) => (
              <div key={index} className="document-item">
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  {doc.name}
                </a>
                <button 
                  onClick={() => handleRemoveDoc(index)}
                  disabled={lawyerData.verification.status === "approved"}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No verification documents uploaded</p>
          )}
        </div>

        {lawyerData.verification.status !== "approved" && (
          <div className="upload-documents">
            <input
              type="file"
              id="verificationDocs"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={handleVerificationUpload}
              style={{ display: "none" }}
            />
            <label htmlFor="verificationDocs" className="btn-upload">
              Upload Documents
            </label>
            <p className="hint">Upload your professional license or certifications (PDF, JPG, PNG)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;