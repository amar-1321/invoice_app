
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/config';


const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    isAdmin: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData,  [name]: type === 'checkbox' ? checked : value, });
  };

  const[error, setError]= useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    try {
        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
          password: formData.password,
          isAdmin: formData.isAdmin, 
          }),
        });
  
        if (response.status === 201) {
          const data = await response.json();
          console.log('Registration successful',data.token);
          navigate('/login')
          // You can redirect the user or show a success message here
        } else {
          const Errordata = await response.json();
          setError(Errordata.error);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setError('An error occurred during registration.');
      }
  };

  return (
    <div className="container" style={{width:"1000px"}}>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center text-dark mt-5">Register</h2>
        <div className="card my-5">

          <form className="card-body cardbody-color p-lg-5">

            <div className="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="100px" alt="profile"/>
            </div>

            <div className="mb-3">
                <label style={{marginLeft:"20px", fontWeight:"400"}}>Username</label>
              <input 
              type="text" 
              className="form-control"
              id="username"
              name="username"
              aria-describedby="emailHelp"
              placeholder="UserName"
              value={formData.username}
              onChange={handleChange}
              style={{width:"300px",height:"35px",textAlign:"start", marginTop:"15px"}}
              />
            </div>
            <div className="mb-3">
                <label htmlFor="" style={{marginLeft:"20px", fontWeight:"400"}}>Password</label>
              <input 
               type="password" 
               className="form-control" 
               name="password"
               id="password"
               placeholder="password"
               value={formData.password}
               onChange={handleChange}
               style={{width:"300px",height:"35px",textAlign:"start", marginTop:"15px"}}
               />
            </div>
            <div className="mb-3">

            <label>
  Admin:
  <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} />
</label>

            </div>
            <div className="text-center">
                <button type="submit" className="btn"
                style={{
                    border:"none",
                    background:"#f1f2a0",
                    marginTop:"20px",
                    paddingLeft:"25px",
                    paddingRight:"25px",
            }}
             onClick={handleSubmit}
                >
                Register
                </button>
            </div>

            {error && (
          <div classNameName="text-danger mt-3">{error}</div>
        )}
         
          </form>
        </div>

      </div>
    </div>
  </div>
  );
};

export default Register;
