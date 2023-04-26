import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "./navbar.css"
import logo from '../../images/logo.svg'
import { cartContext } from '../../Context/CartContext';
import { useEffect } from 'react';

const Navbar = ({removeUser,userdata}) => {
  const { numberOfCart} = useContext(cartContext);
 
    return (
        <>
<nav className="navbar navbar-expand-lg fw-bolder fixed-top bg-light  ">
  <div className="container-fluid">
    <Link className="navbar-brand active " aria-current="page" to="home"></Link>
    <button className="navbar-toggler  " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
     
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
      <li className="nav-logo ">
       <img className='navbar-logo' src={ logo} alt="navlogo" />
        </li>
        <li className="nav-item ">
          <Link className="nav-link " to="/Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/Brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/categories">Categories</Link>
        </li>
      
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
    {userdata?<> <li className="nav-item">
    <li className="nav-item">
          <Link className="nav-link " to="/allOrders">allOrders</Link>
        </li>
          <Link  className="nav-link t" to="/Cart"><i class="fa-solid fa-cart-shopping fa-xl pt-2 text-primary position-relative d-flex"></i> </Link>
        </li> 
        <Link className="nav-link " to="wishlist">Wishlist</Link>
        
        <li className="nav-item">
          <button onClick={removeUser } className="nav-link logout" >Logout</button>
        </li></>:<><li className="nav-item ">
          <Link className="nav-link " to="Login">Login</Link>
        </li>
        <li className="nav-item"> 
          <Link className="nav-link " to="Register">Register</Link>
        </li></>}
        
       
      </ul>
    </div>
  </div>
</nav>  

        </>
    );
}

export default Navbar;
