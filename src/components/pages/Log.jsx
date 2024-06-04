import React, { useEffect, useState } from 'react';
import { useAuth } from './../context/AuthContext';
import { useNavigate } from "react-router-dom";
import Loader from './Loader'

const Log = () => {
  const { googleSignIn, user ,loading } = useAuth();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true); // Loading state

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading) { // Ensure loading is complete before checking user
      if (user) {
        navigate("/main");
      }
    }
  }, [user, loading, navigate]);


  if (loading) {
    return <Loader/>; // You can use a spinner or a loader here
  }

  return (
    <div className="backimg">
      <div id="loginPage" className='container'>
        <h1 className='logintext'>Explore the Movie library.....</h1>
        <div className='logbutton-container'>
          <button className="custom-google-button" onClick={handleGoogleSignIn}>
            <i className="fa-brands fa-google fa-bounce"></i> {/* Corrected className */}
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Log;
