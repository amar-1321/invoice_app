import React, { useEffect, useState } from 'react'
import Scrollbars from 'rc-scrollbars';
import { Button, Col, Container, Dropdown, Form, FormControl, InputGroup, Row, Tab, Tabs } from 'react-bootstrap';
import AddSupplier from './Modal/AddSupplier';
import axios from 'axios';
import PurchaseTableRow from './PurchaseTableRow';
import arrowIcon from './icon/icons8-arrow-28.png'
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/api';
import { API_URL } from './config/config';


function PurchaceEntry() {

  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [qtyColumnTotal, setQtyColumnTotal] = useState(0);

  const [billno, setBillno] = useState('P0');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [transportName, setTransportName] = useState('');
  const [LrNo, setLrNo] = useState('');
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [igst, setIgst] = useState(0);
  const [purchasOrderNum, setPurchaseOrderNum] = useState('');
  const [purchasOrderDate, setPurchaseOrderDate] = useState('');
  const [eComGstIn, setEcomGstIn] = useState('');
  const [ewaybillNum, setEwayBillNum] = useState('');
  const [eWayBillDate, setEwayBillDate] = useState('');
  const [notes, setNotes] = useState('');
  const [freightCharge, setFreightCharge] = useState(0);
  const [roundOff, setRoundOff] = useState(0);
  const [netAmt, setNetAmt] = useState(0);
  const [newPurchaseData, setNewPurchaseData] = useState('');




  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken(); // Call the getToken function to get the token value
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const initialRowData = Array.from({ length: 50 }, () => ({
    code: '',
    itemName: '',
    inputPriceText: 0,
    inputQtyText: 0,
    discount: '',
    Transportcost: 0,
    totalValue: 0,
  }));

  const [PurchaserowData, setPurchaseRowData] = useState(initialRowData);

  let newPurchaseDatas = [];
  const updatedRowData = (index, data) => {
    const updatedData = [...PurchaserowData];
    updatedData[index] = data;

    const filteredData = updatedData.filter(row => {
      // Modify this condition based on your data structure
      return (
        row.code !== '' &&
        row.itemName !== '' &&
        row.inputPriceText !== '0' &&
        row.inputQtyText !== '0' &&
        row.discount !== '' &&
        row.Transportcost !== '0' &&
        row.totalValue !== '0'
      );
    });

    newPurchaseDatas = newPurchaseDatas.concat(filteredData)


    setPurchaseRowData(filteredData);
    setNewPurchaseData(newPurchaseDatas);

    console.log("updated row data:", newPurchaseDatas)

  }




  const [formData, setFormData] = useState({
    bill_No: "",
    invoice_date: "",
    sup_name: "",
    lr_no: "",
    trans_name: "",
    pur_order_no: "",
    pur_order_date: "",
    due_date: "",
    eCom_gst: "",
    eway_bill_no: "",
    eway_bill_date: "",
    item_total_price: "",
    notes: "",
    current_date: "",
    current_time: ""

  });
  // Inside your React component when saving data

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  

      setFormData((prevPurchaseData) => ({
        ...prevPurchaseData,
        current_time: formattedTime,
      }));

      console.log(formattedTime)
    }, 1000); // Update the current time every second
    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component unmounts
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
     

      setFormData((prevPurchaseData) => ({
        ...prevPurchaseData,
        current_date: formattedDate,
      }));
      console.log(formattedDate)
    }, 1000); // Update the current date every second

    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component unmounts
    };
  }, []);



  const [discountedPrice, setDiscountedPrice] = useState('');
  const [taxableValue, setTaxabledValue] = useState('');
  const [totalItem, setTotalItem] = useState('')

  useEffect(() => {
    const orginalPrice = parseFloat(grandTotal)
 
    const frechrg = parseFloat(freightCharge);
    const discount = parseFloat(discountedPrice);
    const sGst = parseFloat(sgst);
    const cGst = parseFloat(cgst);
    const iGst = parseFloat(igst)

    const nonEmptyRows = PurchaserowData.filter(row => {
      // Modify this condition based on your data structure
      return row.code !== '' || row.itemName !== '' || row.inputPriceText !== 0 || row.inputQtyText !== 0 || row.discount !== '' /* Add other conditions if needed */;
    });

    if (orginalPrice !== '') {

      const frieghtChrg = orginalPrice + frechrg;
      const taxabledValue = frieghtChrg - discount;
      const withgst = taxabledValue + sGst + cGst + iGst;
      const roundoff = Math.round(withgst);
      const netAmmount = roundoff;
      const totalitem = nonEmptyRows.length;

      setDiscountedPrice(discountedPrice);
      setTaxabledValue(taxabledValue);
      setRoundOff(roundoff);
      setNetAmt(netAmmount);
      setTotalItem(totalitem)

    }

  }, [PurchaserowData, cgst, discountedPrice, freightCharge, grandTotal, igst, sgst])



  const handleSave = () => {

    const nonEmptyRows = newPurchaseData.filter(row => {
      // Modify this condition based on your data structure
      return row.code !== '' || row.itemName !== '' || row.inputPriceText !== 0 || row.inputQtyText !== 0 || row.discount !== '' /* Add other conditions if needed */;
    });

    console.log(nonEmptyRows);
    console.log("response:", formData);


    axios
      .post(`${API_URL}/purchase`, {
        data: nonEmptyRows,
        ...formData

      })


      .then(response => {
        // Handle success (e.g., show a success message)
        console.log('Data saved successfully:', response.data);

      })
      .catch(error => {
        console.log("failed to save data", error)
      });
  };


  // ********** Total Value *********


  const updateTotalValueAndGrandTotal = (index, newTotalValue) => {
    const updatedRowData = [...PurchaserowData];
    updatedRowData[index].totalValue = newTotalValue;

    const newGrandTotal = updatedRowData.reduce((total, row) => total + row.totalValue, 0);
    setPurchaseRowData(updatedRowData);
    setGrandTotal(newGrandTotal);

    // setPurchaseData((prevPurchaseData) => ({
    //   ...prevPurchaseData,
    //   net_amt:newGrandTotal
    //  }))

  }

  // ********* Total Qty **********

  const updateQtyColumnTotal = (index, newQtyColumnTotal) => {
    // Calculate the total count for a specific column and set it in state
    const updatedRowData = [...PurchaserowData];
    updatedRowData[index].inputQtyText = newQtyColumnTotal;

    const newQtyGrandTotal = updatedRowData.reduce((total, row) => total + row.inputQtyText, 0);
    setPurchaseRowData(updatedRowData);
    setQtyColumnTotal(newQtyGrandTotal);


  };

  //  Total Item Count 
  useEffect(() => {
    // Fetch supplier names from the API
    axios.get(`${API_URL}/fetch/sup_name`)
      .then(response => {
        setFilteredOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log("filtered option", selectedOption);

    setFormData((prevPurchaseData) => ({
      ...prevPurchaseData,
      sup_name: option,
    }))

  };


  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const filtered = filteredOptions.filter(option =>
      option.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOptions(filtered);

  };





  const handleBillNO = (e) => {
    // 👇 Store the input value to local state
    const newBillNo = e.target.value;
    setBillno(newBillNo)
    setFormData((prevPurchaseData) => ({
      ...prevPurchaseData,
      bill_No: newBillNo,
    }))
  };
 
  useEffect(() => {
    const generateUniqueNumber = () => {
      const currentNumber = parseInt(billno.slice(1));
  
      // Increment the numeric part by 1 and create the next identifier
      const nextNumber = currentNumber + 1;
      const nextIdentifier = `P${nextNumber}`;
  
      // Update the state with the next identifier
      setBillno(nextIdentifier);
    };
    generateUniqueNumber();
  },[billno] );


  const handleInvoiceDate = (e) => {

    const newInvoiceDate = e.target.value;
    // 👇 Store the input value to local state
    setInvoiceDate(newInvoiceDate);
    setFormData((prevPurchaseData) => ({
      ...prevPurchaseData,
      invoice_date: newInvoiceDate,

    }))
  };


  const handleDueDate = (e) => {

    const newDuedate = e.target.value;
    // 👇 Store the input value to local state
    setDueDate(newDuedate);
    setFormData((prevPurchaseData) => ({
      ...prevPurchaseData,
      due_date: newDuedate,
    }))
  };
  const handleTransportName = (e) => {
    // 👇 Store the input value to local state
    setTransportName(e.target.value);
    setFormData((prevPurchaseData) => ({
      ...prevPurchaseData,
      trans_name: transportName,
    }))
  };
  const handleLrNum = (e) => {
    // 👇 Store the input value to local state
    setLrNo(e.target.value);
    setFormData((prevPurchaseData) => ({
      ...prevPurchaseData,
      lr_no: LrNo,
    }))
  };
  const handlePONum = (e) => {
    // 👇 Store the input value to local state
    setPurchaseOrderNum(e.target.value);
    setFormData((prevPurchaseData) => ({
      ...prevPurchaseData,
      pur_order_no: purchasOrderNum,
    }))
  };

  const handlePODate = (e) => {

    const newPoDate = e.target.value
    // 👇 Store the input value to local state
    setPurchaseOrderDate(newPoDate);
    setFormData((prevPurchaseData) => ({
      ...prevPurchaseData,
      pur_order_date: newPoDate,
    }))
  };
  const handleEcomGstn = (e) => {
    // 👇 Store the input value to local state
    setEcomGstIn(e.target.value);
    setFormData((prevPurchaseData) => ({
      ...prevPurchaseData,
      eCom_gst: eComGstIn,
    }))
  };

  const handleEwaybillNum = (e) => {

    // 👇 Store the input value to local state
    setEwayBillNum(e.target.value);
    setFormData((prevPurchaseData) => ({
      ...prevPurchaseData,
      eway_bill_no: ewaybillNum,
    }))
  };

  const handleEwayBillDate = (e) => {
    const newEwaybillDate = e.target.value;
    // 👇 Store the input value to local state
    setEwayBillDate(newEwaybillDate);
    setFormData((prevPurchaseData) => ({
      ...prevPurchaseData,
      eway_bill_date: newEwaybillDate,
    }))
  };

  const handleNotes = (e) => {
    // 👇 Store the input value to local state
    setNotes(e.target.value);
    setFormData((prevPurchaseData) => ({
      ...prevPurchaseData,
      notes: notes,
    }))
  };





  return (
    <div style={{}}>
      <section >
        <div className='heading_bill' >
          <span className='head-text'><img src={arrowIcon} alt="" /> Purchase Entry</span>
        </div>
        <div className='mainbill'>
          <form className='bill-form'>
            <div className='heading-bill'>
              <span className='head_text'>Purchase Entry</span>
            </div>
            <div style={{ width: "99.9%", border: "1px solid  #a8a8a8", display: "flex", height: "72px", margin: "1px", }}>

              <Form>
                <Container>
                  <Row >
                    <Col style={{ marginLeft: "40px" }}>
                      <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Bill Number</Form.Label>
                      <InputGroup style={{ width: 160 }}>

                        <Form.Control
                          type="text"
                          placeholder="Bill No"
                          className=" mr-sm-2"
                          style={{ height: "30px", fontSize: "13px" }}
                          Value={billno}
                          onChange={handleBillNO}

                        />

                      </InputGroup>
                    </Col >
                    <Col style={{ marginLeft: "100px" }}>
                      <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Invoice Date</Form.Label>

                      <InputGroup style={{ width: 160 }}>
                        <Form.Control
                          type="date"
                          placeholder="Product Search"
                          className=" mr-sm-2"
                          style={{ height: "30px", fontSize: "13px" }}
                          Value={invoiceDate}
                          onChange={handleInvoiceDate}
                        />
                      </InputGroup>
                    </Col>
                    <Col style={{ marginLeft: "100px" }}>

                      <Col>

                        <Dropdown  >
                          <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Suplier's Name</Form.Label>
                          <Dropdown.Toggle variant="blank" id="search-dropdown" align={{ lg: 'end' }} style={{ width: 400, height: "30px", fontSize: "14px", border: "1px solid #a8a8a8", }}>
                            {selectedOption || 'Select an option'}
                          </Dropdown.Toggle>

                          <Dropdown.Menu style={{ width: 400, fontSize: "14px", border: "1px solid rgb(165, 164, 164)" }}>
                            <FormControl
                              autoFocus
                              placeholder="Search options..."
                              value={searchText}
                              onChange={handleSearch}
                            />
                            <Dropdown.Divider />
                            {filteredOptions.map((option, index) => (
                              <Dropdown.Item
                                key={index}
                                onClick={() => handleSelect(option)}

                              >
                                {option}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>

                      </Col>






                    </Col>
                    <Col >
                      <Button onClick={() => setModalShow(true)} style={{ marginTop: "30px", fontSize: "14px", padding: "5px" }}>Add</Button>
                      <AddSupplier show={modalShow} onHide={() => setModalShow(false)} />
                    </Col>
                    <Col style={{ marginLeft: "40px" }} >
                      <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Due Date</Form.Label>
                      <InputGroup style={{ width: 160 }}>
                        <Form.Control
                          type="date"
                          placeholder="Product Search"
                          className=" mr-sm-2"
                          style={{ height: "30px", fontSize: "13px" }}
                          Value={dueDate}
                          onChange={handleDueDate}
                        />
                      </InputGroup>
                    </Col>

                  </Row>
                </Container>
              </Form>

            </div>
            <section className="panel-body slim-scroll" data-size="10px"
              style={{
                overflow: "auto",
                overflowX: "hidden",
                width: "auto",
                paddingRight: "0px"
              }}>


              <div className='bill-table column' >
                <Scrollbars >
                  <table
                    className="tables table-striped m-b-none "
                    id="normalinvoice">
                    <tbody id="addinvoiceItem">
                      <tr>
                        <th >Code</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Disc</th>
                        <th>Transport Cost</th>
                        <th>Value</th>
                        <th>x</th>
                      </tr>
                      {PurchaserowData.map((data, index) => (
                        <PurchaseTableRow
                          key={index}
                          index={index}
                          PurchaserowData={data}
                          updatedRowData={updatedRowData}
                          updateTotalValue={updateTotalValueAndGrandTotal}
                          updateQtyColumnTotal={updateQtyColumnTotal}

                        />
                      ))}




                    </tbody>

                  </table>

                </Scrollbars>

                <div className='bill-button-comp'>
                  <button className='bill-button'>Clear</button>
                  <button className='bill-button' onClick={handleSave} >Save</button>
                </div>
              </div>

              <div className=' bill-sub column'>

                <Container>


                  <div style={{ width: "100%", height: "150px", marginRight: "30px", fontSize: "14px", border: "1px solid  #a8a8a8", marginTop: "10px" }}>
                    <Tabs
                      defaultActiveKey="home"
                      transition={false}
                      id="noanim-tab-example"
                      className="mb-2"

                    >
                      <Tab eventKey="home" title="Product Check" >
                        <div style={{ fontSize: "17px", fontWeight: "700", marginBottom: "16px" }}>
                          <span >Total Item : {totalItem}</span>
                        </div>
                        <div>
                          <span
                            style={{ fontSize: "17px", fontWeight: "700" }}

                          >Total Qty :{qtyColumnTotal}</span>
                        </div>

                      </Tab>
                      <Tab eventKey="Transport" title="Transport">
                        <Container>
                          <Row>
                            <Col>
                              <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Transport Name</Form.Label>
                              <InputGroup style={{ width: 180 }}>

                                <Form.Control
                                  type="text"
                                  placeholder="Transport Name"
                                  className=" mr-sm-2"
                                  style={{ height: "30px", fontSize: "13px" }}
                                  defaultValue={transportName}
                                  onChange={handleTransportName}


                                />

                              </InputGroup>
                            </Col>
                            <Col>
                              <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>L.R.No</Form.Label>
                              <InputGroup style={{ width: 150 }}>

                                <Form.Control
                                  type="text"
                                  placeholder="L.R.No"
                                  className=" mr-sm-2"
                                  style={{ height: "30px", fontSize: "13px" }}
                                  defaultValue={LrNo}
                                  onChange={handleLrNum}


                                />

                              </InputGroup>
                            </Col>

                          </Row>
                        </Container>
                      </Tab>
                      <Tab eventKey="P.O" title="P.O">
                        <Container>
                          <Row>
                            <Col>
                              <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Purchase Order No</Form.Label>
                              <InputGroup style={{ width: 200 }}>

                                <Form.Control
                                  type="text"
                                  placeholder="P.O.No"
                                  className=" mr-sm-2"
                                  style={{ height: "30px", fontSize: "13px" }}
                                  defaultValue={purchasOrderNum}
                                  onChange={handlePONum}

                                />

                              </InputGroup>
                            </Col>
                            <Col>
                              <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>P.O.Date</Form.Label>
                              <InputGroup style={{ width: 200 }}>

                                <Form.Control
                                  type="Date"
                                  placeholder="Date"
                                  className=" mr-sm-2"
                                  style={{ height: "30px", fontSize: "13px" }}
                                  defaultValue={purchasOrderDate}
                                  onChange={handlePODate}


                                />

                              </InputGroup>
                            </Col>
                          </Row>
                        </Container>
                      </Tab>
                      <Tab eventKey="E-Com" title="E-Com">
                        <Container>
                          <Row>
                            <Col>
                              <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>E-Commerce GSTN</Form.Label>
                              <InputGroup style={{ width: 280 }}>

                                <Form.Control
                                  type="text"
                                  placeholder="E-Commerce GSTN"
                                  className=" mr-sm-2"
                                  style={{ height: "30px", fontSize: "13px" }}
                                  defaultValue={eComGstIn}
                                  onChange={handleEcomGstn}


                                />

                              </InputGroup>
                            </Col>

                          </Row>
                        </Container>
                      </Tab>
                      <Tab eventKey="E-Way Bill" title="E-Way Bill">
                        <Container>
                          <Row>
                            <Col>
                              <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>E-way Bill No</Form.Label>
                              <InputGroup style={{ width: 200 }}>

                                <Form.Control
                                  type="text"
                                  placeholder="E-way Bill No"
                                  className=" mr-sm-2"
                                  style={{ height: "30px", fontSize: "13px" }}
                                  defaultValue={ewaybillNum}
                                  onChange={handleEwaybillNum}


                                />

                              </InputGroup>
                            </Col>
                            <Col>
                              <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>E-way Bill Date</Form.Label>
                              <InputGroup style={{ width: 200 }}>

                                <Form.Control
                                  type="date"
                                  placeholder="E-way Bill Date"
                                  id='ewaybillDate'
                                  className=" mr-sm-2"
                                  style={{ height: "30px", fontSize: "13px" }}
                                  Value={eWayBillDate}
                                  onChange={handleEwayBillDate}
                                />

                              </InputGroup>
                            </Col>
                          </Row>
                        </Container>
                      </Tab>
                      <Tab eventKey="Notes" title="Notes">
                        <Container>
                          <Row>
                            <Col>
                              <Form.Label style={{ marginLeft: "30px", fontWeight: "700" }}>Notes</Form.Label>
                              <InputGroup style={{ width: "400px", marginLeft: "30px" }}>

                                <Form.Control as="textarea"
                                  aria-label="With textarea"
                                  defaultValue={notes}
                                  onChange={handleNotes}

                                />
                              </InputGroup>
                            </Col>

                          </Row>
                        </Container>
                      </Tab>

                    </Tabs>

                  </div>





                </Container>



                <section style={{ border: "1px solid #a7a7a8", height: "236px", marginTop: "5px" }}>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }} >
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>Sub Total</span></Col>
                        <Col xs="12" md="4"><input name='subtotal' value={grandTotal} style={{ height: "22px", border: "1px solid #d9d9d9" }} /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>Discount </span></Col>

                        <Col xs="12" md="4">
                          <input
                            value={discountedPrice}
                            onChange={(e) => setDiscountedPrice(e.target.value)}
                            style={{ height: "22px", border: "1px solid #d9d9d9" }} />

                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>Freight Charges</span></Col>
                        <Col xs="12" md="4"><input
                          value={freightCharge}
                          onChange={(e) => setFreightCharge(e.target.value)}
                          style={{ height: "22px", border: "1px solid #d9d9d9" }} /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>Taxable Value</span></Col>
                        <Col xs="12" md="4">
                          <input
                            value={taxableValue || ''}
                            style={{ height: "22px", border: "1px solid #d9d9d9" }} /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>CGST</span></Col>
                        <Col xs="12" md="4"><input
                          value={cgst}
                          onChange={(e) => setCgst(e.target.value)}
                          style={{ height: "22px", border: "1px solid #d9d9d9" }} /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>SGST</span></Col>
                        <Col xs="12" md="4"><input
                          value={sgst}
                          onChange={(e) => setSgst(e.target.value)}
                          style={{ height: "22px", border: "1px solid #d9d9d9" }} /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>IGST</span></Col>
                        <Col xs="12" md="4"><input
                          value={igst}
                          onChange={(e) => setIgst(e.target.value)}
                          style={{ height: "22px", border: "1px solid #d9d9d9" }} /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>Round off</span></Col>
                        <Col xs="12" md="4"><input
                          value={roundOff || ''}
                          onChange={(e) => setRoundOff(e.target.value)}
                          style={{ height: "22px", border: "1px solid #d9d9d9" }} /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>Net Ammount</span></Col>
                        <Col xs="12" md="4"><input
                          value={netAmt || ''}
                          style={{ height: "22px", border: "1px solid #d9d9d9" }} /></Col>
                      </Row>
                    </Container>
                  </div>
                </section>
                <section style={{ height: "40px", marginTop: "3px" }}>
                  <Container>
                    <Row>
                      <Col><span style={{ fontSize: "18px", fontWeight: "700", textAlign: "center" }}>Stock :</span></Col>

                    </Row>
                  </Container>
                </section>


              </div>






            </section>

          </form>
        </div>

      </section>
    </div>
  )
}

export default PurchaceEntry