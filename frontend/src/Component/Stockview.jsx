import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import arrowIcon from './icon/icons8-arrow-28.png'
import { utils, writeFile } from 'xlsx';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"
import "./styles/billwise.css";
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/api';
import { API_URL } from './config/config';



 function Stockview() {
  
    const [stockData, setStockData] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
      const token = getToken(); // Call the getToken function to get the token value
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);


    const columns = [
        {
            name: 'Code',
            selector: row => row.code,
            sortable: true
        },
        {
            name: 'Product Name',
            selector: row => row.productName,
            sortable: true
        },
        {
            name:'Category',
            selector: row => row.category,
            sortable: true
        },
        {
            name: 'ActiveProduct',
            selector: row => row.active_stock,
            sortable: true
        },
    ];


    const customStyles = {

        table:{
            style: {
                border:"1px solid #e2e3e5",
                
            }
        },
       
        rows: {
            style: {
                minHeight: '40px',
                maxHeight:'45px', 
                fontSize:'16px',
                alignItems:"center"
            },
        },
        headCells: {
            style: {
                minHeight: '50px', 
                paddingLeft: '18px', 
                paddingRight: '18px',
                fontSize:"17px",
                fontWeight:"600",
                // border:"1px solid #e2e3e5",
              
            },
        },
        cells: {
            style: {
                paddingLeft: '18px', 
                paddingRight: '18px',
                marginTop:"10px"
            },
        },
    };
    


useEffect(() => {
   
    axios.get(`${API_URL}/fetchStockViewData`)
    .then((response) => {
        const responseData = response.data;
        setStockData(responseData);
       
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

 





  const exportToExcel = () => {
    const ws = utils.json_to_sheet(stockData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    writeFile(wb, 'table_data.csv');
  };
  
  return (
    <div sortActive={true}>
        <section>
        <div className='heading_bill' >
          <span className='head-text'><img src={arrowIcon} alt="" />Stock List</span>
      
        </div>
         <form action="">
            <section>
            <div className='container mt-5' >
              <div className="text-end">
                <div  style={{marginBottom:"40px"}}>
                <input type="text" 
               
                style={{
                    marginRight:'40px',
                    
                }}
                 />
                <button
                 onClick={exportToExcel}
                 style={{
                    backgroundColor:"#1f7335",
                    color:"white",
                    fontSize:'15px',
                    border:'none',
                    paddingRight:'14px',
                    paddingLeft:"14px",
                    paddingBottom:"4px",
                    paddingTop:'4px',
                    marginRight:'85px',
                    borderRadius:'7px'
                }}
                 >Exel</button>
                 </div>
   </div>
                <DataTable 
                 columns={columns}
                 data={stockData}
                 pagination
                 highlightOnHover
                 customStyles={customStyles}
                />
       
        </div>
            </section>

         </form>

        </section>
     
   </div>
  )
}

export default Stockview