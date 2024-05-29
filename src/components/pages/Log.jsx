// File: Login.jsx

import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from './../context/AuthContext';
import { useNavigate } from "react-router-dom";
// import {api} from "./../../api"

const Log = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/main");
    }
  }, [user]);


  return (
    <div id="loginPage" className='container'>
      <h1 className='logintext'>Explore the Movie library...</h1>
      <div className='button-container'>
        <button className="custom-google-button" onClick={handleGoogleSignIn}>
          <i class="fa-brands fa-google fa-bounce"></i>
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>

  );
};

export default Log;
