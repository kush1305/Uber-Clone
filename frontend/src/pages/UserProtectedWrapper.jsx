import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Fixed string key

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      {children}
    </>
  );
};

export default UserProtectedWrapper;
