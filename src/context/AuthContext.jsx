import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const res = await axios.post('/users/login', credentials);
      const token = res.data.token;
      const userData = res.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify({
        id: userData._id,
        role: userData.roleId.name
      }));
      
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      
      return { 
        success: true,
        user: {
          ...decodedUser,
          role: userData.roleId.name // Ensure role is included
        }
      };
    } catch (err) {
      return { 
        success: false,
        error: err.response?.data?.message || 'Login failed',
        response: err.response // Pass the full response for error handling
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    isAdmin,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);