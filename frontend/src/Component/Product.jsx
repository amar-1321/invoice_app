import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal,  Row, Table } from 'react-bootstrap'
import {  FiEye } from "react-icons/fi";
import AddProduct from '././Modal/AddProduct';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/api';
import arrowIcon from './icon/icons8-arrow-28.png'
import { API_URL } from './config/config';
function Product() {


    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
      const token = getToken(); // Call the getToken function to get the token value
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);

    useEffect(() => {
     
      axios.get(`${API_URL}/fetchProduct`)
        .then(response => {
          
          setProducts(response.data);
        })
        .catch(error => {
          console.error('Error fetching data: ' + error);
        });
    }, []);
   
      const [modalShow, setModalShow] = useState(false);
    
      const [selectedRow, setSelectedRow] = useState(null);
    
  
    
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
      const handleDelete = (id) => {
        axios.delete(`${API_URL}/delete/${id}`)
      .then(response => {
        console.log(response.data); // Data deleted successfully message
        // Update the products list after deletion
        setProducts(prevData => prevData.filter(product => product.id !== id));
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
      };
    
      const handleEdit = (row) => {
        setSelectedRow(row);
      };

      const handleUpdate = () => {
        // Send a PUT request to update the product
        axios.put(`${API_URL}/update/${selectedRow.id}`, selectedRow)
          .then(response => {
            // Update the products list with the updated product
            setProducts(prevProducts =>
              prevProducts.map(product =>
                product.id === selectedRow.id ? selectedRow : product
              )
            );
            handleCloseModal();
          })
          .catch(error => {
            console.error('Error updating product:', error);
          });
      };
      
    
      const handleCloseModal = () => {
        setSelectedRow(null);
      };

      const handleCheckboxClick = (id, isChecked) => {
        // Send a request to the server to toggle the checkbox state
        fetch(`${API_URL}/productcheckbox`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, isChecked }),
        })
          .then((response) => response.json())
          .then(() => {
            // Update the state to reflect the checkbox change
            const updatedData = products.map((item) => {
              if (item.id === id) {
                item.is_checked = isChecked;
              }
              return item;
            });
            setProducts(updatedData); // Use the setProducts function to update the state
          })
          .catch((error) => {
            console.error('Error toggling checkbox:', error);
          });
      };

    
      
  return (
    <div>
    <div>    
    <div className='heading_bill' >
          <span className='head-text'><img src={arrowIcon} alt="" /> Product List</span>
          <Button variant="primary"  style={{
      paddingLeft:"17px",
      paddingRight:"17px",
      paddingBottom:'3px',
      paddingTop:'3px',
      border:'none',
      backgroundColor:"#3e94f7",
      color:'#fff',
      borderRadius:"15px",
      marginLeft:"1270px",
      textDecoration:"none"
    }}>Tax</Button>
    <a href='/category'>
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
      marginLeft:"20px",
      textDecoration:"none"
    }}
    
    variant="primary" > <FiEye />Category</Button></a>
    <Button variant="primary"  style={{
      paddingLeft:"17px",
      paddingRight:"17px",
      paddingBottom:'3px',
      paddingTop:'3px',
      border:'none',
      backgroundColor:"#3e94f7",
      color:'#fff',
      borderRadius:"15px",
      marginLeft:"20px",
      textDecoration:"none"
    }}  onClick={()=>setModalShow(true)}>  New +</Button>
    <AddProduct show={modalShow} onHide={() => setModalShow(false)}/>
            
        </div> 
      
        <div style={{width:"90%",marginTop:"30px", maxHeight:"700px",overflow:"auto",display:"flex",justifyContent:"center",margin: "auto"}}>
        <Table  bordered hover>
        <thead  style={{position: "sticky", top: 0}}>
          <tr>
       
            <th  style={{position: "sticky", top: "-1px"}} colSpan={1}>Code</th>
            <th  style={{position: "sticky", top: "-1px"}} colSpan={5}>Name</th>
            <th  style={{position: "sticky", top: "-1px"}} colSpan={1}>Tax</th>
            <th  style={{position: "sticky", top: "-1px"}} colSpan={1}>Category</th>
            <th  style={{position: "sticky", top: "-1px"}} colSpan={1}>Purchase</th>
            <th  style={{position: "sticky", top: "-1px"}} colSpan={1}>Retail</th>
            <th  style={{position: "sticky", top: "-1px"}} colSpan={1}>Dealer</th>
            <th  style={{position: "sticky", top: "-1px"}} colSpan={1}>Active</th>
            <th  style={{position: "sticky", top: "-1px"}} colSpan={1}>Photo</th>
            <th  style={{position: "sticky", top: "-1px"}} colSpan={1}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((row) => (
            <tr key={row.id}>
             
              <td colSpan={1}>{row.code}</td>
              <td colSpan={5}>{row.itemName}</td>
              <td colSpan={1}>{row.tax}</td>
              <td colSpan={1}>{row.category} </td>
              <td colSpan={1}> {row.purchasePrice}</td>
              <td colSpan={1}>{row.retail}</td>
              <td colSpan={1}>{row.dealer}</td>
              <td>
              <input type='checkbox'
              
              checked={row.is_checked}
              onChange={(e) =>
                handleCheckboxClick(row.id, e.target.checked)
              }/>
              </td>
              <td>
                <input type='file' accept="image/*" />
              </td>
             
              
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
                      marginLeft:"20px",
                      textDecoration:"none"
                    }}
                    onClick={() => handleEdit(row)}>Edit</Button>
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
                      marginLeft:"20px",
                      textDecoration:"none"
                    }}
                    onClick={() => handleDelete(row.id)}>Del</Button>
                  </>
    
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={!!selectedRow} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         

          {selectedRow && (

            <>
            <Container>
          <Row>
            <Col xs={12} md={6}>
                <Form.Label>Item Code</Form.Label>
            <Form.Control
          placeholder="Item Code"
          label="Recipient's ItemCode"
          aria-describedby="basic-addon2"
          value={selectedRow.code}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, code: e.target.value })
          }
          
        />
            </Col>
            
            <Col xs={12} md={6}>
            <Form.Label>Item Name</Form.Label>
            <Form.Control
          placeholder="Item Name"
          aria-label="Recipient's ItemName"
          aria-describedby="basic-addon2"
          value={selectedRow.itemName}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, itemName: e.target.value })
          }
        />
            </Col>
          </Row>
          <Row>
           
            <Col xs={12} md={6}>
            <Form.Label>Tax</Form.Label>
            <Form.Select aria-label="Default select example"
             value={selectedRow.tax}
             onChange={(e) =>
                setSelectedRow({ ...selectedRow, tax: e.target.value })
              }
            
            >
                
     
      <option vlaue="0">0</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="12">12</option>
      <option value="18">18</option>
    </Form.Select>
           
          </Col>
          <Col xs={12} md={6}>
            <Form.Label>HSN/SAC</Form.Label>
            <Form.Control
          placeholder="HSN/SAC"
          aria-label="Recipient's HSN/SAC"
          aria-describedby="basic-addon2"
          value={selectedRow.hsn}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, hsn: e.target.value })
          }
        />
            </Col>
          </Row>
          <Row>
          <Col xs={12} md={6}>
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Default select example"
            value={selectedRow.category}
            onChange={(e) =>
                setSelectedRow({ ...selectedRow, category: e.target.value })
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
          value={selectedRow.mrp}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, mrp: e.target.value })
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
          value={selectedRow.retail}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, retail: e.target.value })
          }
        />
            </Col>
           
            <Col xs={12} md={6}>
            <Form.Label>Dealer</Form.Label>
            <Form.Control
          placeholder="Dealer"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={selectedRow.dealer}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, dealer: e.target.value })
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
          value={selectedRow.openStock}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, openStock: e.target.value })
          }
        />

            </Col>
            <Col xs={12} md={6}>
            <Form.Label>Purchase Price</Form.Label>
            <Form.Control
          placeholder="Purchase Price"
          aria-label="Recipient's PurchasePrice"
          aria-describedby="basic-addon2"
          value={selectedRow.purchasePrice}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, purchasePrice: e.target.value })
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

export default Product