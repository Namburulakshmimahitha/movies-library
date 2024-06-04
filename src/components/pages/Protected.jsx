import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './../context/AuthContext';
import Loader from './Loader'; // Assuming you have a Loader component for showing loading state

const Protected = ({ children }) => {
  const { user, checkAuthentication, loading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    checkAuthentication()
      .then(() => setAuthChecked(true))
      .catch(() => setAuthChecked(true));
  }, [checkAuthentication]);

  if (loading || !authChecked) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected;
