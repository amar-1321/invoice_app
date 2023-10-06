import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';
import { getToken } from '../../services/api';

import arrowIcon from '../icon/icons8-arrow-28.png'

function Userlist() {
    const [userlist, setUserlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const token = getToken(); 
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);

    useEffect(() => {
      // Make the API request when the component mounts
      axios.get('http://localhost:4001/fetchuser')
        .then(response => {
          // Handle the response by setting the data in state
          setUserlist(response.data);
          console.log(userlist)
        })
        .catch(error => {
          console.error('Error fetching data: ' + error);
        });
    }, [userlist]);
 
    
      const [selectedRow, setSelectedRow] = useState(null);
    
  
    
    
      const handleDelete = (id) => {
        axios.delete(`http://localhost:4001/userdelete/${id}`)
      .then(response => {
        console.log(response.data); // Data deleted successfully message
        // Update the userlist list after deletion
        setUserlist(prevData => prevData.filter(userlist => userlist.id !== id));
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
      };
    
      const handleEdit = (row) => {
        setSelectedRow(row);
      };

      const handleUpdate = () => {
       
        axios.put(`http://localhost:4001/userupdate/${selectedRow.id}`, selectedRow)
          .then(response => {
           
            setUserlist(prevuserlist =>
              prevuserlist.map(userlist =>
                userlist.id === selectedRow.id ? selectedRow : userlist
              )
            );
            handleCloseModal();
          })
          .catch(error => {
            console.error('Error updating userlist:', error);
          });
      };
      
    
      const handleCloseModal = () => {
        setSelectedRow(null);
      };

   
  return (
    <div>
    <div>     
        <div >
      
        <div className='heading_bill' >
          <span className='head-text'><img src={arrowIcon} alt="" /> User List</span>
          <a 
          type='submit'
          href='/register'
          style={{
            paddingLeft:"17px",
            paddingRight:"17px",
            paddingBottom:'3px',
            paddingTop:'3px',
            border:'none',
            backgroundColor:"#3e94f7",
            color:'#fff',
            borderRadius:"15px",
            marginLeft:"1400px",
            textDecoration:"none"
          }}
          >
            Add User</a>
           
        </div>



        </div>
        <div style={{width:"50%",marginTop:"30px", display:"flex",justifyContent:"center",margin: "auto"}}>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th >UserName</th>
            <th >Password</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {userlist.map((row) => (
            <tr key={row.id}>
             <td>{row.id}</td>
              <td >{row.username}</td>
              <td >{row.password}</td>
              <td>
              
                  <>
                    
                    <Button  
                     style={{
                      paddingLeft:"17px",
                      paddingRight:"17px",
                      paddingBottom:'3px',
                      paddingTop:'3px',
                      border:'none',
                      backgroundColor:"#3e94f7",
                      color:'#fff',
                      borderRadius:"15px",
                      marginLeft:"14px",
                      textDecoration:"none"
                    }}
                    
                    onClick={() => handleEdit(row)}>Edit</Button>
                    <Button  style={{
                      paddingLeft:"17px",
                      paddingRight:"17px",
                      paddingBottom:'3px',
                      paddingTop:'3px',
                      border:'none',
                      backgroundColor:"#3e94f7",
                      color:'#fff',
                      borderRadius:"15px",
                      marginLeft:"14px",
                      textDecoration:"none"
                    }} onClick={() => handleDelete(row.id)}>Del</Button>
                  </>
    
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={!!selectedRow} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit userlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         

          {selectedRow && (

            <>
            <Container>
         
          <Row>
           
           <Col xs={12} md={10}>
           <Form.Label>UserName</Form.Label>
           <Form.Control 
           placeholder='user name'
           aria-label="Default select example"
            value={selectedRow.username
            }
            onChange={(e) =>
               setSelectedRow({ ...selectedRow, username : e.target.value })
             }
           
          />
               
   
          
         </Col>
        
         </Row>
          <Row>
           
            <Col xs={12} md={10} >
            <Form.Label>Password</Form.Label>
            <Form.Control 
            placeholder='Password'
            aria-label="Default select example"
             value={selectedRow.password
             }
             onChange={(e) =>
                setSelectedRow({ ...selectedRow, password
                  : e.target.value })
              }
            
           />
                
    
           
          </Col>
         
          </Row>
          
        
         
          
          
  
        </Container>
            </>
          )}




        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpdate}>Update</Button>

          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

  
        </div>
    </div>
    </div>
  )
}

export default Userlist