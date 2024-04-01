import React, { } from "react"
import { Route, Routes } from 'react-router-dom'
import Register from "./pages/register"
import './styles/App.css'
import Emailverify from "./pages/Emailverify"
import Error from "./pages/Error"
import HomePage from "./pages/HomePage"
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login"
import './index.css';
import Contact from "./pages/Contact"
import Navbar from "./components/Navbar"
import Logout from "./pages/Logout"
import SingleProduct from "./pages/SingleProduct"
import AddToCart from './pages/AddToCart.jsx'
import Products from "./pages/Products"
import ScrollToTopArrow from "./components/ScrollToTopArrow"
import Footer from "./components/Footer"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import ScrollToTop from "./components/ScrollToTop"

function App() {



  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path='*' element={<Error />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/register' element={<Register />} />
        <Route path='/:token/verify/:_id' element={< Emailverify />} />
        <Route path='/login' element={< Login />} />
        <Route path='/product/:id' element={< SingleProduct />} />
        <Route path='/cart' element={< AddToCart />} />
        <Route path='/products' element={< Products />} />
        <Route path='/forgotpassword' element={< ForgotPassword />} />
        <Route path='/resetpassword/:token' element={< ResetPassword />} />
      </Routes>
      <Footer />
      <ScrollToTopArrow />
    </>
  )
}

export default App
