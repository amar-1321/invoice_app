import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { API_URL } from '../config/config';

function AddSupplier(props) {

  // Replace with your API URL

    const [supplierData, setSupplierData] = useState({
        bshortName: '',
        bfullName:'',
        addr1:'', 
        addr2:'', 
        city:'', 
        pincode:'', 
        state:'', 
        statecode:'', 
        mobile:'', 
        contactPerson:'', 
        gstNo:'', 
        panNo:'',
        email:'', 
        website:''
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(`${API_URL}/addsupplier`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(supplierData)
        });
  
        if (response.ok) {
          console.log('Data inserted successfully');
          props.onHide(); // Close the modal
        } else {
          console.error('Error inserting data');
        }
      } catch (error) {
        console.error('Error inserting data:', error);
      }
    };
  

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Supplier
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={6}>
                <Form.Label>Billing Short Name</Form.Label>
            <Form.Control
          placeholder="First Name"
          label="Recipient's username"
          aria-describedby="basic-addon2"
          value={supplierData.bshortName}
          onChange={(e) =>
            setSupplierData({ ...supplierData, bshortName: e.target.value })
          }
        />
            </Col>
            
            <Col xs={12} md={6}>
            <Form.Label>Billing Full Name</Form.Label>
            <Form.Control
          placeholder="Last Name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={supplierData.bfullName}
          onChange={(e) =>
            setSupplierData({ ...supplierData, bfullName: e.target.value })
          }
        />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
            <Form.Label>Address 1</Form.Label>
            <Form.Control
          placeholder="Address 1"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={supplierData.addr1}
          onChange={(e) =>
            setSupplierData({ ...supplierData, addr1: e.target.value })
          }
        />
            </Col>

            <Col xs={12} md={6}>
            <Form.Label>Address 2</Form.Label>
            <Form.Control
          placeholder="Address 2"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={supplierData.addr2}
          onChange={(e) =>
            setSupplierData({ ...supplierData, addr2: e.target.value })
          }
        />

            </Col>
           
          
          </Row>
          <Row>
            <Col xs={12} md={6}>
            <Form.Label>City</Form.Label>
            <Form.Control
          placeholder="City"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={supplierData.city}
          onChange={(e) =>
            setSupplierData({ ...supplierData, city: e.target.value })
          }
        />
            </Col>
            <Col xs={12} md={6}>
            <Form.Label>Pin Code</Form.Label>
            <Form.Control
          placeholder="Pin Code"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={supplierData.pincode}
          onChange={(e) =>
            setSupplierData({ ...supplierData, pincode: e.target.value })
          }
        />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
            <Form.Label>State</Form.Label>
            <Form.Select 
            aria-label="Default select example"
            value={supplierData.state}
            onChange={(e) =>
              setSupplierData({ ...supplierData, state: e.target.value })
            }>
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
            aria-label="Default select example"
            value={supplierData.statecode}
            onChange={(e) =>
              setSupplierData({ ...supplierData, statecode: e.target.value })
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
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={supplierData.mobile}
          onChange={(e) =>
            setSupplierData({ ...supplierData, mobile: e.target.value })
          }
        />
            </Col>
            <Col xs={12} md={6}>
            <Form.Label>Contact Person</Form.Label>
            <Form.Control
          placeholder="Contact Person"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={supplierData.contactPerson}
          onChange={(e) =>
            setSupplierData({ ...supplierData, contactPerson: e.target.value })
          }
        />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
            <Form.Label>GST No</Form.Label>
            <Form.Control
          placeholder="GST No"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={supplierData.gstNo}
          onChange={(e) =>
            setSupplierData({ ...supplierData, gstNo: e.target.value })
          }
        />

            </Col>
            <Col xs={12} md={6}>
            <Form.Label>PAN No</Form.Label>
            <Form.Control
          placeholder="PAN No"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={supplierData.panNo}
          onChange={(e) =>
            setSupplierData({ ...supplierData, panNo: e.target.value })
          }
        />

                </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control
          placeholder="Email"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={supplierData.email}
          onChange={(e) =>
            setSupplierData({ ...supplierData, email: e.target.value })
          }
        />

            </Col>
            <Col xs={12} md={6}>
            <Form.Label>Web Site</Form.Label>
            <Form.Control
          placeholder="Website"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={supplierData.website}
          onChange={(e) =>
            setSupplierData({ ...supplierData, website: e.target.value })
          }
        />

                </Col>
          </Row>
  
        </Container>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={handleSubmit}>Save</Button>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddSupplier;

