import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/api';
import AddSupplier from './Modal/AddSupplier';
import arrowIcon from './icon/icons8-arrow-28.png'

function SupplierList() {
    const [supplier, setSupplier] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const token = getToken(); // Call the getToken function to get the token value
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);

    useEffect(() => {
      // Make the API request when the component mounts
      axios.get('http://localhost:4001/fetchsuppliers')
        .then(response => {
          // Handle the response by setting the data in state
          setSupplier(response.data);
          console.log(supplier)
        })
        .catch(error => {
          console.error('Error fetching data: ' + error);
        });
    }, [supplier]);
   
      const [modalShow, setModalShow] = useState(false);
    
      const [selectedRow, setSelectedRow] = useState(null);
    
  
    
    
      const handleDelete = (id) => {
        axios.delete(`http://localhost:4001/deletesupplier/${id}`)
      .then(response => {
        console.log(response.data); // Data deleted successfully message
        // Update the supplier list after deletion
        setSupplier(prevData => prevData.filter(supplier => supplier.id !== id));
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
      };
    
      const handleEdit = (row) => {
        setSelectedRow(row);
      };

      const handleUpdate = () => {
       
        axios.put(`http://localhost:4001/updatesupplier/${selectedRow.id}`, selectedRow)
          .then(response => {
           
            setSupplier(prevsupplier =>
              prevsupplier.map(supplier =>
                supplier.id === selectedRow.id ? selectedRow : supplier
              )
            );
            handleCloseModal();
          })
          .catch(error => {
            console.error('Error updating supplier:', error);
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
          <span className='head-text'><img src={arrowIcon} alt="" /> Supplier List</span>
          <Button 
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
          onClick={()=>setModalShow(true)}
          >
            Add supplier</Button>
            <AddSupplier show={modalShow} onHide={() => setModalShow(false)}/>
        </div>



        </div>
        <div style={{width:"90%",marginTop:"30px", display:"flex",justifyContent:"center",margin: "auto"}}>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th >Name</th>
            <th >City</th>
            <th >State</th>
            <th >Contact Person</th>
            <th >Mobile</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {supplier.map((row) => (
            <tr key={row.id}>
             <td>{row.id}</td>
              <td >{row.bfullName}</td>
              <td >{row.city}</td>
              <td >{row.state}</td>
              <td >{row.contactPerson} </td>
              <td >{row.mobile}</td>    
              
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
          <Modal.Title>Edit supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         

          {selectedRow && (

            <>
            <Container>
          <Row>
            <Col xs={12} md={6}>
                <Form.Label>FullName</Form.Label>
            <Form.Control
          placeholder="Name"
          label="Recipient's Name"
          aria-describedby="basic-addon2"
          value={selectedRow.bfullName}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, bfullName: e.target.value })
          }
          
        />
            </Col>
            <Col xs={12} md={6}>
                <Form.Label>ShortName</Form.Label>
            <Form.Control
          placeholder="Name"
          label="Recipient's Name"
          aria-describedby="basic-addon2"
          value={selectedRow.bshortName}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, bshortName: e.target.value })
          }
          
        />
            </Col>
            
          
          </Row>
          <Row>
           
           <Col >
           <Form.Label>Address 1</Form.Label>
           <Form.Control 
           placeholder='address'
           aria-label="Default select example"
            value={selectedRow.addr1
            }
            onChange={(e) =>
               setSelectedRow({ ...selectedRow, addr1
                : e.target.value })
             }
           
          />
               
   
          
         </Col>
        
         </Row>
          <Row>
           
            <Col >
            <Form.Label>Address 2</Form.Label>
            <Form.Control 
            placeholder='address'
            aria-label="Default select example"
             value={selectedRow.addr2
             }
             onChange={(e) =>
                setSelectedRow({ ...selectedRow, addr2
                  : e.target.value })
              }
            
           />
                
    
           
          </Col>
         
          </Row>
          <Row>
          <Col xs={12} md={6}>
            <Form.Label>City</Form.Label>
            <Form.Control 
            placeholder='city'
            aria-label="Default select example"
            value={selectedRow.city}
            onChange={(e) =>
                setSelectedRow({ ...selectedRow, city: e.target.value })
              }
            />
            </Col>
            <Col xs={12} md={6}>
            <Form.Label>Pincode</Form.Label>
            <Form.Control
          placeholder="pincode"
          aria-label="Recipient's itemMrp"
          aria-describedby="basic-addon2"
          value={selectedRow.pincode}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, pincode: e.target.value })
          }
        />
            </Col>
         
           
          </Row>
          <Row>
         
            <Col xs={12} md={6}>
            <Form.Label>State</Form.Label>
            <Form.Select
          placeholder="Retail"
          aria-label="Recipient's retail"
          aria-describedby="basic-addon2"
          value={selectedRow.state}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, state: e.target.value })
          }
        >
            <option>State</option>
      <option value="Andhra Pradesh">Andhra Pradesh</option>
  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
  <option value="Assam">Assam</option>
  <option value="Bihar">Bihar</option>
  <option value="Chhattisgarh">Chhattisgarh</option>
  <option value="Goa">Goa</option>
  <option value="Gujarat">Gujarat</option>
  <option value="Haryana">Haryana</option>
  <option value="Himachal Pradesh">Himachal Pradesh</option>
  <option value="Jharkhand">Jharkhand</option>
  <option value="Karnataka">Karnataka</option>
  <option value="Kerala">Kerala</option>
  <option value="Madhya Pradesh">Madhya Pradesh</option>
  <option value="Maharashtra">Maharashtra</option>
  <option value="Manipur">Manipur</option>
  <option value="Meghalaya">Meghalaya</option>
  <option value="Mizoram">Mizoram</option>
  <option value="Nagaland">Nagaland</option>
  <option value="Odisha">Odisha</option>
  <option value="Punjab">Punjab</option>
  <option value="Rajasthan">Rajasthan</option>
  <option value="Sikkim">Sikkim</option>
  <option value="Tamil Nadu">Tamil Nadu</option>
  <option value="Telangana">Telangana</option>
  <option value="Tripura">Tripura</option>
  <option value="Uttar Pradesh">Uttar Pradesh</option>
  <option value="Uttarakhand">Uttarakhand</option>
  <option value="West Bengal">West Bengal</option>
  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
  <option value="Chandigarh">Chandigarh</option>
  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
  <option value="Lakshadweep">Lakshadweep</option>
  <option value="Delhi">Delhi</option>
  <option value="Puducherry">Puducherry</option>
          </Form.Select>
            </Col>
           
            <Col xs={12} md={6}>
            <Form.Label>State Code</Form.Label>
            <Form.Select
          placeholder="Dealer"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={selectedRow.statecode}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, statecode: e.target.value })
          }
        >
            <option>State Code</option>
      <option value="01-Jammu & Kashmir">01-Jammu & Kashmir</option>
<option value="02-Himachal Pradesh">02-Himachal Pradesh</option>
<option value="03-Punjab">03-Punjab</option>
<option value="04-Chandigarh">04-Chandigarh</option>
<option value="05-Uttarakhand">05-Uttarakhand</option>
<option value="06-Haryana">06-Haryana</option>
<option value="07-Delhi">07-Delhi</option>
<option value="08-Rajasthan">08-Rajasthan</option>
<option value="09-Uttar Pradesh">09-Uttar Pradesh</option>
<option value="10-Bihar">10-Bihar</option>
<option value="11-Sikkim">11-Sikkim</option>
<option value="12-Arunachal Pradesh">12-Arunachal Pradesh</option>
<option value="13-Nagaland">13-Nagaland</option>
<option value="14-Manipur">14-Manipur</option>
<option value="15-Mizoram">15-Mizoram</option>
<option value="16-Tripura">16-Tripura</option>
<option value="17-Meghalaya">17-Meghalaya</option>
<option value="18-Assam">18-Assam</option>
<option value="19-West Bengal">19-West Bengal</option>
<option value="20-Jharkhand">20-Jharkhand</option>
<option value="21-Odisha">21-Odisha</option>
<option value="22-Chhattisgarh">22-Chhattisgarh</option>
<option value="23-Madhya Pradesh">23-Madhya Pradesh</option>
<option value="24-Gujarat">24-Gujarat</option>
<option value="25-Daman & Diu">25-Daman & Diu</option>
<option value="26-Dadra & Nagar Haveli">26-Dadra & Nagar Haveli</option>
<option value="27-Maharashtra">27-Maharashtra</option>
<option value="29-Karnataka">29-Karnataka</option>
<option value="30-Goa">30-Goa</option>
<option value="31-Lakshdweep">31-Lakshdweep</option>
<option value="32-Kerala">32-Kerala</option>
<option value="33-Tamil Nadu">33-Tamil Nadu</option>
<option value="34-Pondicherry">34-Pondicherry</option>
<option value="35-Andaman & Nicobar Islands">35-Andaman & Nicobar Islands</option>
<option value="36-Telengana">36-Telengana</option>
<option value="37-Andhra Pradesh">37-Andhra Pradesh</option>
<option value="98-Other Territory">98-Other Territory</option>
          </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
            <Form.Label>Mobile</Form.Label>
            <Form.Control
          placeholder="Mobile"
          aria-label="Recipient's mobile"
          aria-describedby="basic-addon2"
          value={selectedRow.mobile}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, mobile: e.target.value })
          }
        />

            </Col>
            <Col xs={12} md={6}>
            <Form.Label>Contact Person</Form.Label>
            <Form.Control
          placeholder="C Person"
          aria-label="Recipient's PurchasePrice"
          aria-describedby="basic-addon2"
          value={selectedRow.contactPerson}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, contactPerson: e.target.value })
          }
        />

            </Col>
          
          </Row>
          <Row>
            <Col xs={12} md={6}>
            <Form.Label>Gst No</Form.Label>
            <Form.Control
          placeholder="Gst No"
          aria-label="Recipient's gst no"
          aria-describedby="basic-addon2"
          value={selectedRow.gstNo}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, gstNo: e.target.value })
          }
        />

            </Col>
            <Col xs={12} md={6}>
            <Form.Label>Pan No</Form.Label>
            <Form.Control
          placeholder="Pan no"
          aria-label="Recipient's pan no"
          aria-describedby="basic-addon2"
          value={selectedRow.panNo}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, panNo: e.target.value })
          }
        />

            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control
          placeholder="Email"
          aria-label="Recipient's Email"
          aria-describedby="basic-addon2"
          value={selectedRow.email}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, email: e.target.value })
          }
        />

            </Col>
            <Col xs={12} md={6}>
            <Form.Label>Website</Form.Label>
            <Form.Control
          placeholder="Website"
          aria-label="Recipient's website"
          aria-describedby="basic-addon2"
          value={selectedRow.website}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, website: e.target.value })
          }
        />

            </Col>
          </Row>
          <Row>
          
          <Col xs={12} md={12}>
            <Form.Label>Notes</Form.Label>
            <Form.Control
          placeholder="Notes"
          aria-label="Recipient's Notes"
          aria-describedby="basic-addon2"
          value={selectedRow.notes}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, notes: e.target.value })
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

export default SupplierList