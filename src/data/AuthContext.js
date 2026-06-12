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

    // Diagnostic check for environment variables (safe check)
    console.log("Auth System Initialization:");
    console.log("- Admin Username (Length):", (process.env.REACT_APP_ADMIN_USERNAME || "").length);
    console.log("- Admin Password (Length):", (process.env.REACT_APP_ADMIN_PASSWORD || "").length);

    setLoading(false);
  }, []);

  const login = (username, password) => {
    const expectedUser = (process.env.REACT_APP_ADMIN_USERNAME || "").trim();
    const expectedPass = (process.env.REACT_APP_ADMIN_PASSWORD || "").trim();

    if (!expectedUser || !expectedPass) {
      console.error("Login Error: REACT_APP_ADMIN_USERNAME or PASSWORD variables are missing from the build. Check your GitHub Secrets or local .env file.");
      return false;
    }

    if (username && password && username.trim().toLowerCase() === expectedUser.toLowerCase() && password.trim() === expectedPass) {
      const userData = { username: username.trim(), role: 'admin' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    console.warn("Invalid credentials attempted.");
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