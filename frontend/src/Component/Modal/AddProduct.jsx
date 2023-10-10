import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { API_URL } from '../config/config';

function AddProduct(props) {

 // Replace with your API URL
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/fetchcategory`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  
  const [productData, setProductData] = useState({
   
    code:" ", 
    itemName:" ", 
    tax:" ", 
    unit:" ", 
    category:" ", 
    mrp:" ", 
    retail:" ", 
    retail_dis:" ", 
    dealer_dis:" ", 
    dealer:" ", 
    openStock:" ", 
    purchasePrice:" ", 
    notes:" "
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/addproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
       alert("Product add successfull")
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
          Add Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={6}>
                <Form.Label>Item Code</Form.Label>
            <Form.Control
          placeholder="Item Code"
          label="Recipient's ItemCode"
          aria-describedby="basic-addon2"
          value={productData.code}
          onChange={(e) =>
            setProductData({ ...productData, code: e.target.value })
          }
        />
            </Col>
            
            <Col xs={12} md={6}>
            <Form.Label>Item Name</Form.Label>
            <Form.Control
          placeholder="Item Name"
          aria-label="Recipient's ItemName"
          aria-describedby="basic-addon2"
          value={productData.itemName}
          onChange={(e) =>
            setProductData({ ...productData, itemName: e.target.value })
          }
        />
            </Col>
          </Row>
          <Row>
           
            <Col xs={12} md={6}>
            <Form.Label>Tax</Form.Label>
            <Form.Select aria-label="Default select example"
             value={productData.tax}
             onChange={(e) =>
               setProductData({ ...productData, tax: e.target.value })
             }
            >
      <option value="0">0</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="12">12</option>
      <option value="18">18</option>
    </Form.Select>
           
          </Col>
          <Col xs={12} md={6}>
            <Form.Label>Unit</Form.Label>
            <Form.Select aria-label="Default select example"
             value={productData.unit}
             onChange={(e) =>
               setProductData({ ...productData, unit: e.target.value })
             }
            >
              <option value=" " >Choose unit</option>
										<option value="BAG">BAG</option>
										<option value="BGS">BGS</option>
										<option value="BKL">BKL</option>
										<option value="BOU">BOU</option>
										<option value="BOX">BOX</option>
										<option value="BTL">BTL</option>
										<option value="BUN">BUN</option>
										<option value="CBM">CBM</option>
										<option value="CCM">CCM</option>
										<option value="CIN">CIN</option>
										<option value="CMS">CMS</option>
										<option value="CQM">CQM</option>
										<option value="CTN">CTN</option>
										<option value="DOZ">DOZ</option>
										<option value="DRM">DRM</option>
										<option value="FTS">FTS</option>
										<option value="GGR">GGR</option>
										<option value="GMS">GMS</option>
										<option value="GRS">GRS</option>
										<option value="GYD">GYD</option>
										<option value="HKS">HKS</option>
										<option value="INC">INC</option>
										<option value="KGS">KGS</option>
										<option value="KLR">KLR</option>
										<option value="KME">KME</option>
										<option value="LBS">LBS</option>
										<option value="LOT">LOT</option>
										<option value="LTR">LTR</option>
										<option value="MGS">MGS</option>
										<option value="MTR">MTR</option>
										<option value="MTS">MTS</option>
										<option value="NOS">NOS</option>
										<option value="ODD">ODD</option>
										<option value="PAC">PAC</option>
										<option value="PCS">PCS</option>
										<option value="PRS">PRS</option>
										<option value="QTL">QTL</option>
										<option value="ROL">ROL</option>
										<option value="SDM">SDM</option>
										<option value="SET">SET</option>
										<option value="SHT">SHT</option>
										<option value="SQF">SQF</option>
										<option value="SQI">SQI</option>
										<option value="SQM">SQM</option>
										<option value="SQY">SQY</option>
										<option value="TBS">TBS</option>
										<option value="THD">THD</option>
										<option value="TOL">TOL</option>
										<option value="TON">TON</option>
										<option value="TUB">TUB</option>
										<option value="UGS">UGS</option>
										<option value="UNT">UNT</option>
										<option value="VLS">VLS</option>
										<option value="YDS">YDS</option>

</Form.Select>
            </Col>
          </Row>
          <Row>
          <Col xs={12} md={6}>
            <Form.Label>Category</Form.Label>

           
               <Form.Select aria-label="Default select example"
            
               value={productData.category}
               onChange={(e) =>
                 setProductData({ ...productData, category: e.target.value })
               }
               >
         <option>Choose Category</option>
         {categories.map((category) =>(
         <option key={category.id}  value={category.category_name}>
          {category.category_name}
         </option>
        
        ))}
       </Form.Select>

        
           

            </Col>
            <Col xs={12} md={6}>
            <Form.Label>MRP</Form.Label>
            <Form.Control
          placeholder="Item MRP"
          aria-label="Recipient's itemMrp"
          aria-describedby="basic-addon2"
          value={productData.mrp}
          onChange={(e) =>
            setProductData({ ...productData, mrp: e.target.value })
          }
        />
            </Col>
         
           
          </Row>
          <Row>   
       
            <Col xs={12} md={6}>
            <Form.Label>Retail</Form.Label>
            <Form.Control
          placeholder="Retail"
          aria-label="Recipient's retail"
          aria-describedby="basic-addon2"
          value={productData.retail}
          onChange={(e) =>
            setProductData({ ...productData, retail: e.target.value })
          }
        />
            </Col>
           

            <Col xs={12} md={6}>
            <Form.Label>Retail Dis</Form.Label>
            <Form.Control
          placeholder="Dealer"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={productData.retail_dis}
          onChange={(e) =>
            setProductData({ ...productData, retail_dis: e.target.value })
          }
        />
           
            </Col>
          </Row>

          <Row>
            <Col  xs={12} md={6}>
            <Form.Label>Dealer</Form.Label>
            <Form.Control
          placeholder="Dealer"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={productData.dealer}
          onChange={(e) =>
            setProductData({ ...productData, dealer: e.target.value })
          }
        />
            </Col>
            <Col  xs={12} md={6}>
            <Form.Label>Dealer Dis</Form.Label>
            <Form.Control
          placeholder="Dealer"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={productData.dealer_dis}
          onChange={(e) =>
            setProductData({ ...productData, dealer_dis: e.target.value })
          }
        />
         
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
            <Form.Label>Open Stock</Form.Label>
            <Form.Control
          placeholder="Open Stock"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={productData.openStock}
          onChange={(e) =>
            setProductData({ ...productData, openStock: e.target.value })
          }
        />

            </Col>
            <Col xs={12} md={6}>
            <Form.Label>Purchase Price</Form.Label>
            <Form.Control
          placeholder="Purchase Price"
          aria-label="Recipient's PurchasePrice"
          aria-describedby="basic-addon2"
          value={productData.purchasePrice}
          onChange={(e) =>
            setProductData({ ...productData, purchasePrice: e.target.value })
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
          value={productData.notes}
          onChange={(e) =>
            setProductData({ ...productData, notes: e.target.value })
          }
        />

                </Col>
          </Row>
  
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Add</Button>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        
      </Modal.Footer>
    </Modal>
  );
}
export default AddProduct;

