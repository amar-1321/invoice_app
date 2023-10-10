

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import arrowIcon from './icon/icons8-arrow-28.png'
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import DataPicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import "./styles/billwise.css";
import axios from 'axios';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import Scrollbars from 'rc-scrollbars';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/api';
import { API_URL } from './config/config';


const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  // new Date()
 function BillWiseSale() {
    const [billData, setBillData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateFilteredData, setDateFilteredData] = useState(billData);
    const [finalData, setFinaldata]= useState();

    const [selectedRowData, setSelectedRowData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [hasError, setHasError] = useState(false); 

    const [ filterData, setFilterData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
      const token = getToken(); // Call the getToken function to get the token value
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);
  
    const handleRowClick = async (finalData) => {
      try {
        const { cus_name: CName, date: CDate } = finalData;
        console.log("modal data cusname:", CName);
        console.log("modal data date:", CDate);
    
        const response = await axios.get(`${API_URL}/api/billDataview`, {
          params: {
            cus_name: CName,  // No need to encode here
            date: CDate,      // No need to encode here
          },
        });
    
        if (response.status === 200) {

          const filteredResponses = [];
          

          response.data.forEach((item) => {
            const isDuplicate = filteredResponses.some((responseItem) => {
              return (
                responseItem.cus_name === item.cus_name &&
                responseItem.balance === item.balance &&
                responseItem.bill_cash_amount === item.bill_cash_amount &&
                responseItem.bill_no === item.bill_no &&
                responseItem.cash_discount === item.cash_discount &&
                responseItem.date === item.date &&
                responseItem.payment_type === item.payment_type &&
                responseItem.round_off === item.round_off &&
                responseItem.sub_total === item.sub_total &&
                responseItem.taxable_value === item.taxable_value &&
                responseItem.total_item === item.total_item &&
                responseItem.total_paid === item.total_paid &&
                responseItem.total_qty === item.total_qty &&
                responseItem.total_bill_ammount === item.total_bill_ammount &&
                responseItem.upi_ammunt === item.upi_ammunt &&
                responseItem.date === item.date &&
                responseItem.time === item.time
              );
            });

            if(!isDuplicate){

              filteredResponses.push(item);

            }
          });
       
          setFilterData(filteredResponses);
          console.log("filterdata:", filterData);
          console.log("Filtered Response data:", filteredResponses);
          setSelectedRowData(response.data);
          
          console.log("Response data:", response.data);
        } else {
          console.error('API request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    
      
      setShowModal(true);
    };
    
    const closeModal = () => {
      setShowModal(false);
    };


    const columns = [
       
        {
            name: 'No',
            selector: row => row.bill_no,
            sortable: true
        },
        {
            name:'Date',
            selector: row => row.date,
            sortable: true
        },
        {
            name: 'Name',
            selector: row => row.cus_name,
            sortable: true
        },
        {
            name: 'by',
            selector: row => row.by,
            sortable: true
        },
        {
            name: 'Total Item',
            selector: row => row.total_item,
            sortable: true
        },
        {
            name:'Total Qty',
            selector: row => row.total_qty,
            sortable: true
        },
        {
            name: 'Ammount',
            selector: row => row.total_bill_ammount,
            sortable: true
        },
        {
            name: 'Payment',
            selector: row => row.payment_type,
            sortable: true
        },
        {
          name: 'Action',
          selector: row => row.action,
          sortable: true,
          button: true,
          cell: (row) => (
            <div>
              <Button
               style={{
                border:'none',
                fontSize:'20px',
                fontWeight:'500',
                paddingRight:'9px',
                paddingLeft:'9px',
                paddingTop:'2px',
                paddingBottom:'2px',
                marginBottom:'7px',
                borderRadius:'6px',
               background:"#e6e6e6"
                
               }}
               onClick={() => handleRowClick(row)}
              >👁</Button>
            </div>
          )

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
                minHeight: '50px',
                maxHeight:'60px', 
                fontSize:'16px',
                alignItems:"center"
            },
        },
        headCells: {
            style: {
                minHeight: '50px', 
                paddingLeft: '20px', 
                paddingRight: '20px',
                fontSize:"17px",
                fontWeight:"600", 
            },
        },
        cells: {
            style: {
                paddingLeft: '20px', 
                paddingRight: '20px',
                marginTop:"10px",
                
            },
        },
    };
    
    useEffect(() => {
   
        axios.get(`${API_URL}/fetchBillWise`)
        .then((response) => {
    
            const responseData = response.data;
            // console.log(responseData);
        
            setBillData(responseData);
    
             if (!startDate || !endDate ) {
                const AlldateData = responseData;
             
                setFinaldata(AlldateData)
               
             } else {
               const dateData = dateFilteredData;
               
                setFinaldata(dateData);
             }
    
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, [dateFilteredData, endDate, startDate]);

      // console.log(finalData);

     
     
      
    
    
   
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

      console.log(dateFilteredData)
    
      const resetFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setFinaldata(billData);
      };
    

function handleFilter(event) {
    const inputValue = event.target.value.toLowerCase();
    console.log('Input Value:', inputValue);
  
    const newData = finalData.filter((row) => {
      const lowerCaseName = row.name.toLowerCase();
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



  const generatePDF = (row) => {
    try {
      const doc = new jsPDF();
      const content = `Type: ${row.type}\nNo: ${row.no}\nDate: ${row.date}\nName: ${row.name}\nTotal: ${row.total}`;
      doc.text(content, 8, 8);
      // doc.save('item_details.pdf');
      setHasError(false); // Reset hasError to false if PDF generation is successful
    } catch (error) {
      setHasError(true); // Set the error flag to true if an error occurs
    }
  };
  
  return (
    <div>
        <section>
        <div className='heading_bill' >
          <span className='head-text'><img src={arrowIcon} alt="" />Bill Wise Sale Report</span>

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
                 dense
                 striped
                 pointerOnHover
                 customStyles={customStyles}
                />

<Modal show={showModal && !hasError} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             
             {filterData.map((item, index) => (
                 <div key={index}>
                 <Container>
      <Row>
        <Col><p><b>Name:</b> {item.cus_name}</p></Col>
        <Col> <p><b>Date:</b> {item.date}</p></Col>
      </Row>
      <Row>
        <Col><p><b>B.No:</b> {item.bill_no}</p> </Col>
        <Col><p><b>Time:</b> {item.time}</p> </Col>
      </Row>
    </Container>
               </div>

             ))}

             <div className='billWise-table column'>
            <Scrollbars>
        {selectedRowData && selectedRowData.length > 0 ? (
              <table >
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Rate</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRowData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.itemName}</td>
                      <td>{item.sell}</td>
                      <td>{item.qty}</td>
                      <td>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data to display</p>
            )}
          </Scrollbars>
        </div>
        {filterData.map((item, index) => (
                 <div key={index} style={{marginTop:"20px"}}>
                 <Container>
      <Row>
        <Col><p><b>SubTotal</b></p> </Col>
        <Col><b>{item.sub_total}</b></Col>
      </Row>
      <Row>
        <Col> <p><b>Discount</b></p></Col>
        <Col> <b>{item.cash_discount}</b></Col>
      </Row>
      <Row>
        <Col><p><b>Round Off</b></p></Col>
        <Col><b>{item.round_off}</b></Col>
      </Row>
      <Row>
        <Col><p><b>Total</b></p></Col>
        <Col><b>{item.total_bill_ammount}</b></Col>
      </Row>
      <Row>
        <Col><p><b>Cash</b></p></Col>
        <Col><b>{item.bill_cash_amount}</b></Col>
      </Row>
      <Row>
        <Col><p><b>Patym/Upi</b></p></Col>
        <Col><b>{item.upi_ammunt}</b></Col>
      </Row>
      <Row>
        <Col><p><b>Balance</b></p></Col>
        <Col><b>{item.balance} </b></Col>
      </Row>
      <Row>
        <Col><p><b>Total Paid</b></p></Col>
        <Col><b>{item.total_paid}</b></Col>
      </Row>
      <Row>
        <Col><p><b>Total Item:</b> <b>{item.total_item}</b></p></Col>
        <Col><p><b>Total Qty:</b> <b>{item.total_qty}</b></p> </Col>
      </Row>
      
    </Container>
               </div>

             ))}
         
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={(e) => generatePDF(selectedRowData)}>save</Button>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
       
        </div>
            </section>

         </form>

        </section>
     
   </div>
  )
}

export default BillWiseSale