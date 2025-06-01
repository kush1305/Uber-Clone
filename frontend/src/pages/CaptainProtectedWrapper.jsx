import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/captain-login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setCaptain(response.data);
          setIsLoading(false);
        } else {
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      } catch (error) {
        console.error('Error fetching captain profile:', error);
        localStorage.removeItem('token');
        navigate('/captain-login');
      }
    };

    fetchProfile();
  }, [navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
