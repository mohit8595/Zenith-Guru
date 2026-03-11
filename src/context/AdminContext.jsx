import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@zenithguru.com' && password === 'admin123') {
          const adminData = {
            id: 1,
            name: 'Admin User',
            email: 'admin@zenithguru.com',
            role: 'admin',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
          };
          setAdmin(adminData);
          setIsAuthenticated(true);
          localStorage.setItem('admin', JSON.stringify(adminData));
          setIsLoading(false);
          resolve(adminData);
        } else {
          setIsLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin');
  };

  const checkAuth = () => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
      setIsAuthenticated(true);
    }
  };

  return (
    <AdminContext.Provider value={{
      admin,
      isAuthenticated,
      isLoading,
      login,
      logout,
      checkAuth
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
