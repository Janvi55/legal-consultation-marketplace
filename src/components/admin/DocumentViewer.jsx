import React, { useState } from 'react';
import axios from 'axios';

const DocumentViewer = ({ document, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/documents/${document._id}/view`, 
          { responseType: 'blob' }
        );
        const url = URL.createObjectURL(response.data);
        setFileUrl(url);
      } catch (err) {
        console.error('Failed to load document:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [document]);

  return (
    <div className="document-viewer-overlay">
      <div className="document-viewer">
        <button onClick={onClose} className="close-btn">×</button>
        <h3>{document.name}</h3>
        {loading ? (
          <div className="loading">Loading document...</div>
        ) : fileUrl ? (
          <iframe 
            src={fileUrl} 
            title={document.name}
            className="document-frame"
          />
        ) : (
          <div className="error">Failed to load document</div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;