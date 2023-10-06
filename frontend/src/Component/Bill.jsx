import React, { useState, useEffect } from 'react'
import "./styles/bill.css"
import Scrollbars from 'rc-scrollbars';
import { Button, Col, Container, Dropdown, Form, FormControl, InputGroup, Row, Tab, Tabs } from 'react-bootstrap';
import AddCustomer from './Modal/AddCustomer';
import axios from 'axios';
import Tablerow from './Tablerow';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import arrowIcon from './icon/icons8-arrow-28.png'
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/api';

function Bill() {

  const [modalShow, setModalShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [custType, setCusType] = useState(null);

  const [billNo, setBillNo] = useState(1);
  const [billDate, setBillDate] = useState('');
  const [qtyColumnTotal, setQtyColumnTotal] = useState(0);
  const [paymetType, setPaymentType] = useState('');
  const [mobileNum, setMobileNum] = useState('');



  const [grandTotal, setGrandTotal] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [taxableValue, setTaxableValue] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [totalBillAmmount, setTotalBillAmmount] = useState(0);
  const [totalItem, setTotalItem] = useState('');
  const [roundOff, setRoundOff] = useState(0);

  const [billPayAmmount, setBillPayAmmount] = useState(0);
  const [upiAmmount, setUpiAmmount] = useState(0);

  const [newData, setNewData] = useState('');
  const [balanceAmmount, setBalanceAmmount] = useState(0);
  const [payAmmont, setPayAmmount] = useState(0);

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
    price: '',
    inputQtyText: 0,
    totalValue: 0
  }));
  const [rowData, setRowData] = useState(initialRowData);

  let newDatas = [];

  const updatedRowData = (index, data) => {
    const updatedData = [...rowData];
    updatedData[index] = data;

    const filteredData = updatedData.filter(row => {
      // Modify this condition based on your data structure
      return (
        row.code !== '' &&
        row.itemName !== '' &&
        row.price !== '' &&
        row.inputQtyText !== '0' &&
        row.totalValue !== '0'
      );
    });

    newDatas = newDatas.concat(filteredData);

    setRowData(filteredData);
    setNewData(newDatas)
    console.log("New Data:", newData);


  };



  useEffect(() => {
    const orgPrice = parseFloat(grandTotal);
    const discountPrice = parseFloat(discountPercentage);
    const Sgst = parseFloat(sgst);
    const Cgst = parseFloat(cgst);
    const DeliveryCharge = parseFloat(deliveryCharge);
    const cashAmt = parseFloat(billPayAmmount);
    const upi = parseFloat(upiAmmount);



    if (![orgPrice !== ""].some(Number.isNaN)) {

      const billDataRow = rowData.filter(row => {
        // Modify this condition based on your data structure
        return row.code !== '' || row.itemName !== '' || row.price !== '' || row.inputQtyText !== 0 || row.totalValue !== 0;
      });

      const taxableValue = orgPrice - discountPrice;
      const withgst = taxableValue + Sgst + Cgst;
      const withdeliveycharge = withgst + DeliveryCharge;
      const roundoff = Math.round(withdeliveycharge);
      const billamount = roundoff;
      const balanceAmmount = billamount - (cashAmt + upi);
      const totalitem = billDataRow.length;
      const PayAmt = cashAmt + upi;
      setTotalBillAmmount(billamount);
      setTotalItem(totalitem);
      setRoundOff(roundoff);
      setPayAmmount(PayAmt)
      setTaxableValue(taxableValue.toFixed(0));

      setDiscountedPrice(discountPrice);

      setBalanceAmmount(balanceAmmount);

      setSalesBillDetails((salesData) => ({
        ...salesData,
        taxable_value: taxableValue,
      }));
      setSalesBillDetails((salesData) => ({
        ...salesData,
        discount: discountPrice,
      }));
      setSalesBillDetails((salesData) => ({
        ...salesData,
        total_bill_ammount: billamount,
      }));

      setSalesBillDetails((salesData) => ({
        ...salesData,
        cgst: Cgst,
      }));
      setSalesBillDetails((salesData) => ({
        ...salesData,
        sgst: Sgst,
      }));

      setSalesBillDetails((salesData) => ({
        ...salesData,
        balance_amt: balanceAmmount,
      }));
      setSalesBillDetails((salesData) => ({
        ...salesData,
        tot_item: totalitem,
      }));
      setSalesBillDetails((salesData) => ({
        ...salesData,
        delivery_charge: DeliveryCharge,
      }));
      setSalesBillDetails((salesData) => ({
        ...salesData,
        round_off: roundOff,
      }));
      setSalesBillDetails((salesData) => ({
        ...salesData,
        total_paid: payAmmont,
      }));
    }

  }, [billPayAmmount, cgst, deliveryCharge, discountPercentage, grandTotal, payAmmont, roundOff, rowData, sgst, upiAmmount]);

  //  console.log("Row data", rowData)

  const [billForm, setBillForm] = useState({
    bill_No: "",
    cus_name: " ",
    bill_date: " ",
    date: "",
    time: " "
  });


  const [salesBillDetails, setSalesBillDetails] = useState({

    bill_num: '',
    cust_Name: '',
    subTotal: '',
    discount: '',
    taxable_value: '',
    cgst: '',
    sgst: '',
    tot_item: '',
    total_qty: 0,
    delivery_charge: '',
    round_off: '',
    total_bill_ammount: '',
    mobile_num: '',
    payment_type: '',
    bill_pay_amt: '',
    upi_ammount: '',
    total_paid: '',
    balance_amt: '',
    Bill_Date: '',
    Bill_Time: '',
  });

  //  console.log("Sales Bill Details:", salesBillDetails);




  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  

      setBillForm((prevPurchaseData) => ({
        ...prevPurchaseData,
        time: formattedTime,
      }));

      setSalesBillDetails((salesData) => ({
        ...salesData,
        Bill_Time: formattedTime,
      }));

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
    

      setBillForm((prevPurchaseData) => ({
        ...prevPurchaseData,
        date: formattedDate,
      }));
      setSalesBillDetails((salesData) => ({
        ...salesData,
        Bill_Date: formattedDate,
      }));
    }, 1000); // Update the current date every second

    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component unmounts
    };
  }, []);



  const handleBillSave = () => {


    console.log("billDataRow", newData);
    console.log("billform", billForm);
    axios
      .post('http://localhost:4001/billEntey', {
        data: newData,
        ...billForm
      })
      .then(response => {
        const MySwal = withReactContent(Swal)
        // Handle success (e.g., show a success message)
        console.log('Data saved successfully:', response.data);
        MySwal.fire({
          title: <strong>Success</strong>,
          html: (
            <div>
              <p>Data saved successfully:</p>
              <pre>{JSON.stringify(response.data, null, 2)}</pre>
            </div>
          ),
          icon: 'success',
        });
      })
      .catch(error => {
        console.log("failed to save data", error)
      });

    axios
      .post('http://localhost:4001/salesBillDetails', {
        ...salesBillDetails
      })
      .then(response1 => {
        // Handle success (e.g., show a success message)
        console.log('salesBill detail Data saved successfully:', response1.data);
      })
      .catch(error => {
        console.log("sales bill date failed to save ", error)
      });

  }

  //  console.log(rowData);


  const updateTotalValueAndGrandTotal = (index, newTotalValue) => {
    const updatedRowData = [...rowData];
    updatedRowData[index].totalValue = newTotalValue;

    const newGrandTotal = updatedRowData.reduce((total, row) => total + row.totalValue, 0);
    setRowData(updatedRowData);
    setGrandTotal(newGrandTotal);
    //console.log("Grand Total:",grandTotal)
    setSalesBillDetails((salesData) => ({
      ...salesData,
      subTotal: newGrandTotal,
    }));
  }

  const updateQtyColumnTotal = (index, newQtyColumnTotal) => {
    // Calculate the total count for a specific column and set it in state
    const updatedRowData = [...rowData];
    updatedRowData[index].inputQtyText = newQtyColumnTotal;
    const newQtyGrandTotal = updatedRowData.reduce((total, row) => total + row.inputQtyText, 0);
    setRowData(updatedRowData);
    setQtyColumnTotal(newQtyGrandTotal);

    // console.log("total Qty :", qtyColumnTotal);
    setSalesBillDetails((salesData) => ({
      ...salesData,
      total_qty: newQtyGrandTotal
    }))

    // Add more conditions for other columns if needed
  };
  useEffect(() => {
    // Fetch supplier names from the API
    axios.get('http://localhost:4001/fetch/cust_name')
      .then(response => {
        setFilteredOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const filtered = filteredOptions.filter(option =>
      option.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSelect = (option) => {


    setSelectedOption(option);
    setSearchText('');

    setBillForm((prevPurchaseData) => ({
      ...prevPurchaseData,
      cus_name: option,
    }));

    setSalesBillDetails((salesData) => ({
      ...salesData,
      cust_Name: option,
    }));

    const custType = option;
    axios.get(`http://localhost:4001/fetchCustData/${custType}`)
      .then(response => {

        setCusType(response.data);

        console.log(response.data.cust_type);

      })
      .catch(error => {
        alert.error('API error: ', error);
      });

  };




  const handleBillNo = (e) => {

    const newBillNo = e.target.value;

    setBillNo(newBillNo);

    setBillForm((prevPurchaseData) => ({
      ...prevPurchaseData,
      bill_No: newBillNo,
    }));

    setSalesBillDetails((salesData) => ({
      ...salesData,
      bill_num: newBillNo,
    }));
  }

  const generateUniqueNumber = () => {
    setBillNo(prevNumber => prevNumber + 1);
  };
  useEffect(() => {
    generateUniqueNumber();
  }, [])



  const handleBillDate = (e) => {
    const newBillDate = e.target.value;
    setBillDate(newBillDate);
    setBillForm((prevPurchaseData) => ({
      ...prevPurchaseData,
      bill_date: newBillDate,
    }));
  }

  const handlePymentType = (e) => {
    const newPymentType = e.target.value;
    setPaymentType(newPymentType);
    setSalesBillDetails((salesData) => ({
      ...salesData,
      payment_type: newPymentType,
    }));

  }

  const handleBillAmmount = (e) => {
    const newBillPayAmmount = e.target.value;
    setBillPayAmmount(newBillPayAmmount)
    setSalesBillDetails((salesData) => ({
      ...salesData,
      bill_pay_amt: newBillPayAmmount,
    }));

  }

  const handlemonbilnum = (e) => {
    const newMobileNum = e.target.value;
    setMobileNum(newMobileNum)
    setSalesBillDetails((salesData) => ({
      ...salesData,
      mobile_num: newMobileNum,
    }));
  }

  const handleUpiAmmount = (e) => {
    const newUpiAmmount = e.target.value;
    setUpiAmmount(newUpiAmmount);
    setSalesBillDetails((salesData) => ({
      ...salesData,
      upi_ammount: newUpiAmmount,
    }))
  }

  return (
    <div style={{}}>
      <section >
        <div className='heading_bill' >
          <span className='head-text'><img src={arrowIcon} alt="" /> Bill Entry</span>
        </div>
        <div className='mainbill'>
          <form className='bill-form' >
            <div className='heading-bill'>
              <span className='head_text'>Sales Bill Entry</span>
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
                        <th> Qty</th>
                        <th> UQC</th>
                        <th> Sell</th>
                        <th>Value</th>
                        <th>x</th>
                      </tr>



                      {rowData.map((data, index) => (
                        <Tablerow
                          key={index}
                          index={index}
                          custType={custType}
                          rowData={data}
                          updatedRowData={updatedRowData}
                          updateQtyColumnTotal={updateQtyColumnTotal}
                          updateTotalValue={updateTotalValueAndGrandTotal} />

                      ))}
                    </tbody>

                  </table>



                </Scrollbars>

                <div className='bill-button-comp'

                >


                  <button className='bill-button' >Hold</button>
                  <button className='bill-button'>Clear</button>
                  <button className='bill-button' onClick={handleBillSave}>Save</button>

                </div>


              </div>

              <div className=' bill-sub column'>

                <Container  >
                  <Row style={{
                    marginLeft: "10px",
                    width: "610px"
                  }}>

                    <Col xs={12} md={8}>
                      <Dropdown>
                        <Dropdown.Toggle variant="blank" id="search-dropdown" align={{ lg: 'end' }}
                          style={{
                            width: 450,
                            height: "31px",
                            fontSize: "14px",
                            borderRadius: "none",
                            border: "1px solid #a8a8a8"
                          }}>
                          {selectedOption || 'Select an option'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                          style={{
                            width: 450,
                            fontSize: "14px",
                            border: "1px solid rgb(165, 164, 164)"
                          }}>
                          <FormControl
                            autoFocus
                            placeholder="Search options..."
                            value={searchText}
                            onChange={(e) => handleSearch(e.target.value)}
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
                    <Col xs={12} md={2}>
                      <Button onClick={() => setModalShow(true)}
                        style={{
                          color: "white",
                          background: "#0a83fc",
                          border: "none",
                          borderRadius: "10px",
                          textAlign: "center",
                          fontWeight: "500",
                          fontSize: "18px",
                          paddingRight: '6px',
                          paddingLeft: '6px',
                          paddingTop: "2px",
                          paddingBottom: "1px",
                          marginLeft: "48px"

                        }} >✚</Button>
                      <AddCustomer show={modalShow} onHide={() => setModalShow(false)} />
                    </Col>

                  </Row>

                  <div
                    style={{

                      height: "112px",
                      fontSize: "14px",
                      border: "1px solid  #a8a8a8",
                      marginTop: "5px",
                      marginLeft: "20px",
                      width: "610px"
                    }}>
                    <Tabs
                      defaultActiveKey="accounts"
                      transition={true}
                      id="noanim-tab-example"
                      className="mb-2"

                    >
                      <Tab eventKey="accounts" title="Accounts"

                      >
                        <Container>
                          <Row>
                            <Col>
                              <form action=" ">
                                <label style={{ fontSize: "13px", fontWeight: 600 }} for="vehicle1"> Whole Sale</label> <br />
                                <input
                                  type="checkbox"
                                  id="wholesale"
                                  name="wholesale"
                                  value=""
                                  style={{ width: "17px", height: "17px", marginLeft: "20px", marginTop: "8px" }} />
                              </form>
                            </Col>
                            <Col>
                              <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Bill Number</Form.Label>
                              <InputGroup style={{ width: 160 }}>

                                <Form.Control
                                  type="text"
                                  placeholder="bill No"
                                  className=" mr-sm-2"
                                  style={{ height: "25px", fontSize: "13px" }}
                                  value={billNo}
                                  onChange={handleBillNo}
                                  onFocus={generateUniqueNumber}

                                />

                              </InputGroup>
                            </Col>
                            <Col>
                              <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Bill Date</Form.Label>
                              <InputGroup style={{ width: 160 }}>

                                <Form.Control
                                  type="date"
                                  placeholder="Mobile"
                                  className=" mr-sm-2"
                                  style={{ height: "25px", fontSize: "13px" }}
                                  value={billDate}
                                  onChange={handleBillDate}
                                />

                              </InputGroup>
                            </Col>
                          </Row>
                        </Container>
                      </Tab>
                      <Tab eventKey="options" title="Options">
                        <form action="" style={{ marginLeft: "40px" }}>
                          <label style={{ fontSize: "13px", fontWeight: 600 }} for="vehicle1">Include Tax</label> <br />
                          <input
                            type="checkbox"
                            id="vehicle1"
                            name="vehicle1"
                            value="Bike"
                            style={{ width: "17px", height: "17px", marginLeft: "20px", marginTop: "8px" }} />
                        </form>

                      </Tab>

                    </Tabs>

                  </div>





                </Container>

                <section style={{
                  marginLeft: "35px",
                  width: "610px", display: "flex", marginTop: "9px", fontSize: "17px", fontWeight: "600"
                }}>
                  <div className="col-sm-6" align="left">
                    <p>Stock : <span id="stkqty">&nbsp;</span></p>
                  </div>
                  <div className="col-sm-4" align="right">
                    <p>Total MRP : <span id="totmrp"></span></p>
                  </div>
                </section>

                <section style={{
                  border: "1px solid #a7a7a8",
                  height: "210px",
                  marginTop: "4px",
                  marginLeft: "30px",
                  width: "610px"
                }}>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }} >
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>Sub Total</span></Col>
                        <Col xs="12" md="4"><input style={{ height: "22px", marginLeft: "25px", border: "1px solid #d9d9d9" }} value={grandTotal.toFixed(2)} /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="5" style={{ fontSize: "14px", fontWeight: "700" }}><span>Cash Discount ₹</span></Col>
                        <Col xs="12" md="2"><input style={{
                          height: "22px",
                          width: "65px",
                          marginLeft: "59px",
                          border: "1px solid #d9d9d9"
                        }}
                          value={discountPercentage}
                          onChange={(e) => setDiscountPercentage(e.target.value)}
                        /></Col>
                        <Col xs="12" md="3"><input style={{
                          height: "22px",
                          border: "1px solid #d9d9d9",
                          marginLeft: "25px"
                        }}
                          value={discountedPrice || ''}

                        />
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>Taxable Value</span></Col>
                        <Col xs="12" md="4"><input style={{
                          height: "22px",
                          border: "1px solid #d9d9d9",
                          marginLeft: "25px"
                        }}
                          value={taxableValue || ''}
                        /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>CGST</span></Col>
                        <Col xs="12" md="4"><input style={{
                          height: "22px",
                          border: "1px solid #d9d9d9",
                          marginLeft: "25px",
                        }}
                          value={cgst}
                          onChange={(e) => setCgst(e.target.value)}
                        /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>SGST</span></Col>
                        <Col xs="12" md="4"><input style={{
                          height: "22px",
                          marginLeft: "25px",
                          border: "1px solid #d9d9d9"
                        }}
                          value={sgst}
                          onChange={(e) => setSgst(e.target.value)}
                        /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>Delivery Charges</span></Col>
                        <Col xs="12" md="4"><input style={{
                          height: "22px",
                          marginLeft: "25px",
                          border: "1px solid #d9d9d9"
                        }}
                          value={deliveryCharge}
                          onChange={(e) => setDeliveryCharge(e.target.value)}
                        /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>Round off</span></Col>
                        <Col xs="12" md="4"><input style={{
                          height: "22px",
                          marginLeft: "25px",
                          border: "1px solid #d9d9d9"
                        }}
                          value={roundOff}
                        /></Col>
                      </Row>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #e1e2e3", height: "26px" }}>
                    <Container>
                      <Row>
                        <Col xs="12" md="7" style={{ fontSize: "14px", fontWeight: "700" }}><span>Bill Amount</span></Col>
                        <Col xs="12" md="4">
                          <input
                            id='billammount'
                            value={totalBillAmmount}
                            style={{ height: "22px", marginLeft: "25px", border: "1px solid #d9d9d9" }}
                          /></Col>
                      </Row>
                    </Container>
                  </div>
                </section>
                <section style={{
                  height: "40px", marginTop: "11px", marginLeft: "30px",
                  width: "610px"
                }}>
                  <Container>
                    <Row>
                      <Col><span style={{ fontSize: "18px", fontWeight: "700", textAlign: "center" }}>Total Item : {totalItem}</span></Col>
                      <Col style={{ fontSize: "18px", fontWeight: "700" }}><span>Total Qty : {qtyColumnTotal}</span></Col>
                    </Row>
                  </Container>
                </section>


              </div>

            </section>

            <div style={{
              width: "98.5%",
              border: "1px solid  #a8a8a8",
              display: "flex",
              height: "72px",
              marginTop: "25px",
              marginLeft: '12px'
            }}>


              <Container style={{ marginLeft: "-10px", width: "100%" }}>
                <Form>
                  <Row>
                    <Col >
                      <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Mobile</Form.Label>
                      <InputGroup style={{ width: 160 }}>

                        <Form.Control
                          type="text"
                          placeholder="Mobile"
                          className=" mr-sm-2"
                          style={{ height: "30px", fontSize: "13px" }}
                          value={mobileNum}
                          onChange={handlemonbilnum}

                        />

                      </InputGroup>
                    </Col >
                    <Col >
                      <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Payment Type</Form.Label>
                      <InputGroup style={{ width: 160 }}>
                        <Form.Select

                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          value={paymetType}
                          onChange={handlePymentType}
                          style={{ height: "30px", fontSize: "13px" }}

                        >
                          <option value="">Payment Type</option>
                          <option value="cash">Cash</option>
                          <option value="paytm/cash">Paytm/Cash</option>
                          <option value="paytm/cash">Paytm/UPI</option>
                          <option value="credit">Credit</option>

                        </Form.Select>
                      </InputGroup>
                    </Col>
                    <Col  >
                      <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Customer Paid</Form.Label>
                      <InputGroup style={{ width: 160 }}>
                        <Form.Control
                          type="text"
                          placeholder="Cash"
                          className=" mr-sm-2"
                          value={billPayAmmount}
                          onChange={handleBillAmmount}
                          style={{ height: "30px", fontSize: "13px" }}
                        />

                      </InputGroup>
                    </Col>
                    <Col >
                      <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Paytym/UPI</Form.Label>
                      <InputGroup style={{ width: 160 }}>
                        <Form.Control
                          type="text"
                          placeholder="UPI Cash"
                          className=" mr-sm-2"
                          value={upiAmmount}
                          onChange={handleUpiAmmount}
                          style={{ height: "30px", fontSize: "13px" }}
                        />

                      </InputGroup>
                    </Col>
                    <Col style={{ marginTop: "25px" }}>
                      <span
                        style={{ fontSize: "20px" }}
                      >Balance : {balanceAmmount}</span>
                    </Col>
                    <Col  >
                      <Form.Label style={{ fontSize: "13px", fontWeight: 600 }}>Bill Copy</Form.Label>
                      <InputGroup style={{ width: 160 }}>
                        <Form.Control
                          type="text"
                          placeholder="Product Search"
                          className=" mr-sm-2"
                          style={{ height: "30px", fontSize: "13px" }}
                        />
                      </InputGroup>
                    </Col>
                    <Col style={{ marginTop: "25px" }}>
                      <p style={{
                        fontSize: "18px",
                        fontWeight: "700"
                      }}> Total Price : {totalBillAmmount}</p>

                    </Col>


                  </Row>
                </Form>
              </Container>


            </div>
          </form>
        </div>

      </section>
    </div>
  )
}

export default Bill