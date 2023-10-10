
import React, { useState } from 'react';
import {  Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/config';
;

const Login = ({setToken}) => {

    const navigation = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    
      const [errors, setErrors] = useState({
        username: '',
        password: '',
        general: '', // General error message for the form
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Reset previous error messages
        setErrors({
          username: '',
          password: '',
          general: '',
        });
    
        // Validate the form data (you can add more specific validation logic)
        if (formData.username === '') {
          setErrors({ ...errors, username: 'Username is required' });
          return;
        }
    
        if (formData.password === '') {
          setErrors({ ...errors, password: 'Password is required' });
          return;
        }
    
        // If the form data is valid, you can proceed with the API request
        try {
          const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.status === 200) {
            const data = await response.json();
            const {token, isAdmin } = data;
          
           
            console.log('token:', isAdmin);
      // Store the JWT token in localStorage
           localStorage.setItem('token', token);
           localStorage.setItem('isAdmin', isAdmin)
         
            navigation('/')
          } else {
            // Handle login errors
            const data = await response.json();
            if (data.error === 'Username not found' || data.error === 'Incorrect password') {
              setErrors({ ...errors, general: 'Invalid username or password' });
            } else {
              setErrors({ ...errors, general: 'An error occurred during login' });
            }
          }
        } catch (error) {
          console.error('Error during login:', error);
          setErrors({ ...errors, general: 'An error occurred during login' });
        }
      };

  return (
    <div class="container" style={{width:"1000px"}}>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Login</h2>
        <div class="card my-5">

          <form class="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>

            <div class="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="100px" alt="profile"/>
            </div>
            {errors.general && <Alert variant="danger">{errors.general}</Alert>}

            <div class="mb-3">
                <label style={{marginLeft:"20px", fontWeight:"400"}}>Username</label>
              <input 
              type="text" 
              class="form-control"
              id="username"
              name="username"
              aria-describedby="emailHelp"
              placeholder="User Name"
              value={formData.username}
              onChange={handleChange}
              style={{width:"300px",height:"35px",textAlign:"start", marginTop:"15px"}}
              />
                {errors.username && <small className="text-danger">{errors.username}</small>}
            </div>
            <div class="mb-3">
                <label htmlFor="" style={{marginLeft:"20px", fontWeight:"400"}}>Password</label>
              <input 
               type="password" 
               class="form-control" 
               id="password" 
               name="password"
               value={formData.password}
               onChange={handleChange}
               placeholder="password"
               style={{width:"300px",height:"35px",textAlign:"start", marginTop:"15px"}}
               />
                {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
            <div class="text-center">
                <button type="submit" class="btn"
                style={{
                    border:"none",
                    background:"#f1f2a0",
                    marginTop:"20px",
                    paddingLeft:"25px",
                    paddingRight:"25px",
            }}
                >
                Login
                </button>
            </div>
            <div><a href='##'>Forgot Password ?</a></div>
          </form>
        </div>

      </div>
    </div>
  </div>
  );
};

export default Login;
