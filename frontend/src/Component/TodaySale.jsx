import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import arrowIcon from './icon/icons8-arrow-28.png'
import { utils, writeFile } from 'xlsx';
import axios from 'axios';
import DataPicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css"
import "./styles/billwise.css";
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/api';
import { API_URL } from './config/config';



const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
 function TodaySale() {
  
    const [billData, setBillData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [dateFilteredData, setDateFilteredData] = useState(billData);
    const [finalData, setFinaldata]= useState();
    const navigate = useNavigate();

    useEffect(() => {
      const token = getToken(); // Call the getToken function to get the token value
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);


    const columns = [
        {
            name: 'Name',
            selector: row => row.itemName,
            sortable: true
        },
        {
            name: 'Qty',
            selector: row => row.qty,
            sortable: true
        },
        {
            name:'Sell.Rs',
            selector: row => row.sell,
            sortable: true
        },
        {
            name: 'P,Rate',
            selector: row => row.item_price,
            sortable: true
        },
        {
            name: 'Profit',
            selector: row => row.total,
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
   
    axios.get(`${API_URL}/fetchSalesBill`)
    .then((response) => {

        const responseData = response.data;
    
        setBillData(responseData);

         if (!startDate || !endDate ) {
            const groupedDatas = groupDataByName(responseData);
            setFinaldata(groupedDatas)
           
         } else {
           
            const groupedData = groupDataByName(dateFilteredData);
            setFinaldata(groupedData);
         }

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [dateFilteredData, endDate, startDate]);

  const groupDataByName = (data) => {
      const  groupedData = [];

      data.forEach((item) => {
        const existingEntry = groupedData.find((entry) => entry.itemName === item.itemName);
  
        if (existingEntry) {
         
          
          existingEntry.qty += parseInt(item.qty, 10);
          existingEntry.total += parseInt(item.total, 10);
          existingEntry.sell+= parseFloat(item.sell,10);
        } else {
        
          groupedData.push({
            itemName: item.itemName,
            qty: parseInt(item.qty, 10),
            sell:parseFloat(item.sell, 10),
            total: parseInt(item.total, 10),
          });
        }
      });
  
      return groupedData;
  };

  const applyDateFilter = () => {
    const filteredData = billData.filter((item) => {
      if (!item.date) {
        return true;
      }

      const itemDate = new Date(item.date);

      if (isNaN(itemDate.getTime())) {
        return false;
      }

      return startDate && endDate
        ? formatDate(itemDate) >= formatDate(startDate) && formatDate(itemDate) <= formatDate(endDate)
        : true;
    });

    setDateFilteredData(filteredData);
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    const groupedData = groupDataByName(billData);
    setFinaldata(groupedData);
  };

function handleFilter(event) {
    const inputValue = event.target.value.toLowerCase();
    console.log('Input Value:', inputValue);
  
    const newData = finalData.filter((row) => {
      const lowerCaseName = row.itemName.toLowerCase();
      console.log('Row Name:', lowerCaseName);
      return lowerCaseName.includes(inputValue);
    });
    console.log('Filtered Data:', newData);
  
  }

  const exportToExcel = () => {
    const ws = utils.json_to_sheet(finalData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    writeFile(wb, 'table_data.csv');
  };
  
  return (
    <div sortActive={true}>
        <section>
        <div className='heading_bill' >
          <span className='head-text'><img src={arrowIcon} alt="" />Today Sale Report</span>
        <div style={{
            marginLeft:"50px"
        }}>
         

          <DataPicker
           className='form-control form-control-solid w-250px '
           placeholderText='From Date'
           dateFormat={"yyyy-MM-dd"}
          selected={startDate} 
          onChange={(date) => setStartDate(date)}
          endDate={endDate}
            
         />
          <DataPicker
           className='form-control form-control-solid w-250px '
           placeholderText='To Date'
           dateFormat={"yyyy-MM-dd"}
          selected={endDate} 
          onChange={(date) => setEndDate(date)}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          />
          <button
           style={{
            width:"70px",
            height:"25px",
            marginLeft:"30px",
            border:"none",
            color:"white",
            backgroundColor:"#036bfc",
            borderRadius:"5px"

        }}
        onClick={applyDateFilter}
      >search</button>
    
         <button
           style={{
            width:"70px",
            height:"25px",
            marginLeft:"20px",
            border:"none",
            color:"white",
            backgroundColor:"#036bfc",
            borderRadius:"5px"

        }}
        onClick={resetFilters}
       >Clear</button>
     
        </div>
        </div>
         <form action="">
            <section>
            <div className='container mt-5' >
              <div className="text-end">
                <div  style={{marginBottom:"40px"}}>
                <input type="text" 
                onChange={handleFilter}
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
                 data={finalData}
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

export default TodaySale