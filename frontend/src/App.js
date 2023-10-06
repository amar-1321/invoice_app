
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';
import Bill from './Component/Bill';
import Header1 from './partial/header';
import Home from './Component/Home';
import Product from './Component/Product';
import PurchaceEntry from './Component/PurchaceEntry';
import Stockview from './Component/Stockview';
import Customer from './Component/Customer';
import SupplierList from './Component/SupplierList';
import TodaySale from './Component/TodaySale';
import BillWiseSale from './Component/BillWiseSale';
import ProductWiseSale from './Component/ProductWiseSale';
import Category from './Component/Category';
import StockHistory from './Component/StockHistory';
import Userlist from './Component/User/Userlist';
import Register from './Component/User/Register';
import Login from './Component/User/Login';

import MachineEntry from './Component/MachineEntry';



function App() {

  
  const isAdmins = localStorage.getItem('isAdmin')
  // Set to true when the user is authenticated
  const isAdmin = JSON.parse(isAdmins);
console.log(isAdmin)
  return (
    <Router>
    <Header1 />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/bill' element={<Bill/>}/>
      <Route path='/machine' element={<MachineEntry/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route
          path="/UserList"
          element={
         isAdmin ? (
              <Userlist />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/purchaseEnt' element={<PurchaceEntry/>}/>
      <Route path='/stockview' element={<Stockview/>}/>
      <Route path='/customer' element={<Customer/>}/>
      <Route path='/supplier' element={<SupplierList/>}/>
      <Route path='/todaysale' element={<TodaySale/>}/>
      <Route path='/billsale' element={<BillWiseSale/>}/>
      <Route path='/productsale' element={<ProductWiseSale/>}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/StockHistory' element={<StockHistory/>}/>

    </Routes>
    </Router>
  );
}

export default App;
