import React from 'react'
import "./header.css"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { getToken } from '../services/api';
import { useNavigate } from 'react-router-dom';
function Header1() {

  const navigation = useNavigate();


  const handleLogout = () => {
   
    localStorage.removeItem('token');

    navigation('/login')
  
  };

  const isLoggedIn = getToken() ? true : false;


  return (
    <>



      <nav className="navbar">



        <div className='nav-logo'>
          <a href='##'>
            <span className='logo'>logo</span>
          </a>
        </div>


        <div className='nav-list-comp'>
          <ul className="nav-list">

            <li className="dropdown">
              <a className='headLink' href="##">Invoice &#9662;</a>
              <ul className="dropdown-content">
                <li className='dl' ><a className='dla' href="/bill">Bill</a></li>
                <li className='dl'><a className='dla' href="/machine">MachineEntry</a></li>
                <li className='dl'><a className='dla' href="/customer">Customer</a></li>
                <li className='dl'><a className='dla' href="##">Estimate</a></li>
                <li className='dl'><a className='dla' href="##">SalesReturn</a></li>
                <li className='dl'><a className='dla' href="/purchaseEnt">PurchaseEntry</a></li>
                <li className='dl'><a className='dla' href="/supplier">Suplier</a></li>
                <li className='dl'><a className='dla' href="##">PurchaseReturn</a></li>
                <li className='dl'><a className='dla' href="/product">Product</a></li>
                <li className='dl'><a className='dla' href="/stockview">Stock View</a></li>
                <li className='dl'><a className='dla' href="##">Stock Entry</a></li>
                <li className='dl'><a className='dla' href="/StockHistory">Stock History</a></li>
                <li className='dl'><a className='dla' href="##">Transfer Entry</a></li>
                <li className='dl'><a className='dla' href="##">Expire-Damage</a></li>
                <li className='dl'><a className='dla' href="##">Delivery Note</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a className='headLink' href="##" >Reports &#9662;</a>
              <ul className="dropdown-content">
                <li className='dl'><a className='dla' href="/todaysale">TodaySale</a></li>
                <li className='dl'><a className='dla' href="/billsale">BillWiseSale</a></li>
                {/* <li className='dl'><a className='dla' href="/productsale">ProductWiseSale</a></li> */}

              </ul>

            </li>
            <li className="dropdown">
              <a className='headLink' href="##">Acounts &#9662;</a>
              <ul className="dropdown-content">
                <li className='dl'><a className='dla' href="##">Service 1</a></li>
                <li className='dl'><a className='dla' href="##">Service 2</a></li>
                <li className='dl'><a className='dla' href="##">Service 3</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a className='headLink' href="##">Utility &#9662;</a>
              <ul className="dropdown-content">
                <li className='dl'><a className='dla' href="##">Service 1</a></li>
                <li className='dl'><a className='dla' href="##">Service 2</a></li>
                <li className='dl'><a className='dla' href="##">Service 3</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a className='headLink' href="##">Master &#9662;</a>
              <ul className="dropdown-content">
                <li className='dl'><a className='dla' href="/UserList">UserList</a></li>
                <li className='dl'><a className='dla' href="##">Service 2</a></li>
                <li className='dl'><a className='dla' href="##">Service 3</a></li>
              </ul>
            </li>


          </ul>


        </div>



        <div className='nav-list-comp-2'>
          <div className="mb-2" style={{ marginRight: "300px" }}>
            {[DropdownButton].map((DropdownType, idx) => (
              <DropdownType
                as={ButtonGroup}
                key={idx}
                id={`dropdown-button-drop-${idx}`}
                size="sm"
                title="Drop large"
              >
                <Dropdown.Item href='/'>Home</Dropdown.Item>

                <Dropdown.Divider />
                {isLoggedIn ? (
                    <Dropdown.Item onClick={handleLogout} >Logout</Dropdown.Item>
                ):(

                  <Dropdown.Item href='/login'>Login</Dropdown.Item>
                )}
              

              



               






              </DropdownType>
            ))}
          </div>

        </div>





      </nav>
    </>
  )
}

export default Header1