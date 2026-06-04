import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (persisted in localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const expectedUser = process.env.REACT_APP_ADMIN_USERNAME;
    const expectedPass = process.env.REACT_APP_ADMIN_PASSWORD;

    // Diagnostic: If this error appears in the browser console (F12), 
    // the server definitely hasn't picked up your .env file.
    if (!expectedUser || !expectedPass) {
      console.error("Login failed: REACT_APP_ADMIN variables are undefined. Please restart 'npm start'.");
      return false;
    }

    if (username.trim().toLowerCase() === expectedUser.toLowerCase() && password.trim() === expectedPass) {
      const userData = { username: username.trim(), role: 'admin' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);