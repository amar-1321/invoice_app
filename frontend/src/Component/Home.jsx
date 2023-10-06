import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/api';

function Home() {

  
   
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken(); // Call the getToken function to get the token value
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  

  return (
    <div>
    Home
    </div>
  )
}

export default Home