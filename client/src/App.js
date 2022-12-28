import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/Header/NavBar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/Product/ProductDetails';
import Loader from "./components/Layout/Loader";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import ContactUs from "./components/Contact/ContactUs"
import Login from "./components/User/Login";
import Register from "./components/User/Register"
import store from './store'
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import Profile from './components/User/Profile'
import UpdateProfile from "./components/User/UpdateProfile"
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/ForgotPassword.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList";
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from "./components/Admin/UpdateProduct";
import Cart from "./components/Cart/Cart";
import UsersList from "./components/Admin/UsersList";
import ProductReviews from "./components/Admin/ProductReviews";
import OrderList from "./components/Admin/OrderList";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Shipping from "./components/Cart/Shipping";
import OrderSuccess from "./components/Cart/OrderSuccess";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import ProcessOrder from "./components/Admin/ProcessOrder";
import Payment from "./components/Cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UpdateUser from "./components/Admin/UpdateUser";
import './App.css'
import { Box, createTheme, ThemeProvider } from "@mui/material";
import NotFound from "./components/Layout/NotFound";
import About from "./components/About/About";
import "@fontsource/montserrat";

import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import Wishlist from "./components/Wishlist/wishlist";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();


  },[]);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  
  return (
  <Router>
    <div className="Header">
      <NavBar/>
    </div>

    <NotificationContainer/>

    <div className='Main'>
      <Routes>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/loader" element={<Loader/>}/>
      <Route exact path="/product/:id" element={<ProductDetails/>}/>
      <Route exact path="/products" element={<Products/>}/>
      <Route path="/products/:keyword" element={<Products/>}/>
      <Route exact path="/search" element={<Search/>}/>
      <Route exact path="/contact" element={<ContactUs/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/password/forgot" element={<ForgotPassword/>} />
      <Route exact path="/password/reset/:token" element={<ResetPassword/>} />

      {isAuthenticated && <Route exact path="/process/payment" element={ stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}><Payment/> </Elements>} />}
      {isAuthenticated && <Route exact path="/account" element={<Profile/>}/>}
      {isAuthenticated && <Route exact path="/me/update" element={<UpdateProfile/>}/>}
      {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword/>}/>}
      {isAuthenticated && <Route exact path="/cart" element={<Cart/>}/>}
      {isAuthenticated && <Route exact path="/orders" element={<MyOrders/>} />}
      {isAuthenticated && <Route exact path="/order/:id" element={<OrderDetails/>} />}
      {isAuthenticated && <Route exact path="/shipping" element={<Shipping/>} />}
      {isAuthenticated && <Route exact path="/success" element={<OrderSuccess/>} />}
      {isAuthenticated && <Route exact path="/order/confirm" element={<ConfirmOrder/>} />} 
      {isAuthenticated && <Route exact path="/favourite" element={<Wishlist/>} />}

      {isAuthenticated && user.role === "admin" && <Route exact path="/admin/dashboard" element={<Dashboard/>}/>}
      {isAuthenticated && user.role === "admin" && <Route exact path="/admin/products" element={<ProductList/>}/>}
      {isAuthenticated && user.role === "admin" && <Route exact path="/admin/product" element={<NewProduct/>}/>}
      {isAuthenticated && user.role === 'admin' && <Route exact path="/admin/product/:id" element={<UpdateProduct/>}/>}
      {isAuthenticated && user.role === 'admin' && <Route exact path="/admin/users" element={<UsersList/>}/>}
      {isAuthenticated && user.role === 'admin' && <Route exact path="/admin/user/:id"element={<UpdateUser/>}/>}
      {isAuthenticated && user.role === 'admin' && <Route exact path="/admin/reviews" element={<ProductReviews/>}/>}
      {isAuthenticated && user.role === 'admin' && <Route exact path="/admin/orders" element={<OrderList/>}/>}
      {isAuthenticated && user.role === 'admin' && <Route exact path="/admin/order/:id" element={<ProcessOrder/>}/>}

      <Route path='*' exact={true} element={<NotFound/>}/>

      </Routes>
    </div>

    <div className="Footer">
      <Footer/>
    </div>
  </Router>
    );
}

export default App;
