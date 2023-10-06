import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] =useState('');
  

  const navigate = useNavigate();

 
  useEffect(() => {
    const user = localStorage.getItem('user');

    if(user) {
      navigate('/')
    }

  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      // Handle the response, e.g., store the token or show an error message
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login Failed ')
      // Handle the error, e.g., display an error message to the user
    }
     
  };

 

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center", width:"500px", margin:"auto" }}>
    <Container className="mt-5"  style={{width:350, padding:"10px"}}>
      <Form onSubmit={handleLogin}>
        <h3 style={{textAlign:"center", marginBottom:"30px",fontWeight:"600"}}>Login </h3>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button style={{marginTop:"30px"}} variant="primary" type="submit">
          Login
        </Button>
         
         {error && 
         <span style={{color:"red"}}>
          {error}
         </span>
         }
        

      </Form>

       
    </Container>
    </div>
  );
};

export default LoginPage;
