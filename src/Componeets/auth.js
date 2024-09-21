// src/Components/auth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Assuming user information is stored in localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.usertype === 'admin';
  const isPmm = user?.usertype === 'pmm';

  return { user, isAuthenticated, isAdmin, isPmm };
};
