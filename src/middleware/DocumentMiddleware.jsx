import axios from 'axios';

export const uploadSingle = async (file, endpoint, fieldName = 'file') => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append(fieldName, file);

    const response = await axios.post(endpoint, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'File upload failed'
    };
  }
};

export const uploadMultiple = async (files, endpoint, fieldName = 'files') => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    // Append all files
    Array.from(files).forEach(file => {
      formData.append(fieldName, file);
    });

    const response = await axios.post(endpoint, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Files upload failed'
    };
  }
};