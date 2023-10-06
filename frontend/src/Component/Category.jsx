import React, { useEffect, useState } from 'react'
import "./styles/category.css"
import axios from 'axios';
import arrowIcon from './icon/icons8-arrow-28.png'
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/api';
function Category() {


  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken(); // Call the getToken function to get the token value
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
    const apiUrl = 'http://localhost:4001'; // Replace with your API URL

    const [categoryData, setCategoryData] = useState({ id: null, category_name: '' });
    const [category, setCategory] = useState([]);
  
    const handleCategorySubmit = async (e) => {
      e.preventDefault();
  
      try {
        if (categoryData.id === null) {
          
          const response = await axios.post(`${apiUrl}/addcategory`, categoryData);
          if (response.data === 'Data inserted successfully') {
            alert('Data inserted successfully');
            setCategoryData({ id: null, category_name: '' }); 
            fetchCategoryData(); 
          } else {
            console.error('Error inserting data');
          }
        } else {
         
          const response = await axios.put(`${apiUrl}/updatecategory/${categoryData.id}`, categoryData);
          if (response.data === 'Data updated successfully') {
            alert('Data updated successfully');
            setCategoryData({ id: null, category_name: '' }); 
            fetchCategoryData(); 
          } else {
            console.error('Error updating data');
          }
        }
      } catch (error) {
        console.error('Error handling category data:', error);
      }
    };
  
    const handleEditCategory = (row) => {
    
      setCategoryData({ id: row.id, category_name: row.category_name });
    };
  
    const handleDeleteCategory = async (id) => {
      try {
        const response = await axios.delete(`${apiUrl}/deletecategory/${id}`);
        if (response.data === 'Data deleted successfully') {
          alert('Data deleted successfully');
          fetchCategoryData(); 
        } else {
          console.error('Error deleting data');
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    };
  
    const fetchCategoryData = () => {
      axios.get(`${apiUrl}/fetchcategory`)
        .then(response => {
          setCategory(response.data);
        })
        .catch(error => {
          console.error('Error fetching data: ' + error);
        });
    };
  
    useEffect(() => {
     
      fetchCategoryData();
    }, []);

    const tableStyle = {
      borderCollapse: 'collapse',
      width: '600px',
      textAlign: 'center',
  
    };
    const headcellStyle = {
      border: '1px solid black',
      padding: '10px',
      textAlign: 'center',
      position: 'sticky',
      top: '0',
      background: 'white', 
    };
    
    const cellStyle = {
      border: '1px solid black',
      padding: '10px',
      textAlign: 'center',
    };

      
     
  return (
    <div >
         <div >
      
   <div className='heading_bill' >
          <span className='head-text'><img src={arrowIcon} alt="" /> Category</span>
          <div style={{marginLeft:"70px"}}>

        <button style={{
          paddingLeft:"15px", 
          paddingRight:"15px",
          paddingTop:"2px",
          paddingBottom:"2px",
          border:"none",
          background:"#03b1fc",
          borderRadius:"15px",
          fontSize:"16px",
          color:"#ffff",
          fontWeight:"600",
          marginLeft:"20px"

        }}>Tax</button>    
        <button style={{
          paddingLeft:"15px", 
          paddingRight:"15px",
          paddingTop:"2px",
          paddingBottom:"2px",
          border:"none",
          background:"#03b1fc",
          borderRadius:"15px",
          fontSize:"16px",
          color:"#ffff",
          marginLeft:"20px"

        }}
        ><a style={{
          textDecoration:"none", 
          color:"#ffff",  
          fontSize:"16px",
          fontWeight:"600"}} href='/category'> category</a></button>  
        <button style={{
          paddingLeft:"15px", 
          paddingRight:"15px",
          paddingTop:"2px",
          paddingBottom:"2px",
          border:"none",
          background:"#03b1fc",
          borderRadius:"15px",
          marginLeft:"20px"

        }}> <a style={{
          textDecoration:"none",
           color:"#ffff",  
           fontSize:"16px",
           fontWeight:"600"}} href='/category'>View category</a></button> 
  
          </div>
        </div>
        </div>

        <div style={{
          background:"#e3e8e6", 
          height:"600px", 
          width:"800px",
          display:"flex",
          justifyContent:"center",
          marginTop:"50px",
          marginLeft:"550px",
           
           }}>

            <section>
                <div style={{
                  marginLeft:"100px",
                  marginTop:"30px",
                  alignItems:"center",
                  
                  }}>
                    <span style={{
                      fontSize:"24px",
                      fontWeight:'700',
                      marginLeft:"100px",
                     
                    }}
                    
                    >Category List</span>
                   
                </div>

                <div style={{display:"flex", marginLeft:"130px",marginTop:"50px"}}>
                        <input placeholder='category Name'
                         value={categoryData.category_name}
                         onChange={(e) =>
                           setCategoryData({ ...categoryData, category_name: e.target.value })
                         } style={{
                          borderRadius:"5px",
                          border: '1px solid #ccc',
                          fontSize:"16px",
                          outline:"none",
                          padding: '4px',
                          width:"200px"
                          
                         }}/>
                       <button style={{
          paddingLeft:"15px", 
          paddingRight:"15px",
          paddingTop:"5px",
          paddingBottom:"5px",
          border:"none",
          background:"#08a66c",
          borderRadius:"15px",
          marginLeft:"20px",
          color:"#fff",
          fontWeight:"600"

        }}
                       onClick={handleCategorySubmit}>submit</button>
                    </div>
                    <div
                    style={{ marginTop:"50px", width:"700px", maxHeight:"300px",  overflow:"auto"}}
                    
                    >
                    <table style={tableStyle}>
        <thead>
            <tr>
                <th  style={headcellStyle}>No</th>
                <th  style={headcellStyle}>Category Name</th>
                <th  style={headcellStyle}>Action</th>
            </tr>
        </thead>
        <tbody>
        {category.map((row) => (
          <tr key={row.id}>
            <td  style={cellStyle}>{row.id}</td>
            <td  style={cellStyle}>
              {categoryData.id === row.id ? (
                <input
                  type="text"
                  style={{
                    borderRadius:"5px",
                    border: '1px solid #ccc',
                    fontSize:"16px",
                    outline:"none",
                    padding: '4px',
                   width:"150px"
                    
                   }}

                  value={categoryData.category_name}
                  onChange={(e) =>
                    setCategoryData({
                      ...categoryData,
                      category_name: e.target.value,
                    })
                  }
                />
              ) : (
                row.category_name
              )}
            </td>
            <td  style={cellStyle}>
            
                  <button 
                  style={{
                    paddingLeft:"15px", 
                    paddingRight:"15px",
                    paddingTop:"5px",
                    paddingBottom:"5px",
                    border:"none",
                    background:"#08a66c",
                    borderRadius:"15px",
                    marginRight:"8px",
                    color:"#fff",
                    fontWeight:"600"
          
                  }}
                  
                   onClick={() => handleEditCategory(row)}>Edit</button>
                  <button style={{
          paddingLeft:"15px", 
          paddingRight:"15px",
          paddingTop:"5px",
          paddingBottom:"5px",
          border:"none",
          background:"#08a66c",
          borderRadius:"15px",
          marginLeft:"20px",
          color:"#fff",
          fontWeight:"600"

        }}
                  
                  onClick={() => handleDeleteCategory(row.id)}>Delete</button>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
                    </div>
            </section>
        </div>
    </div>
  )
}

export default Category