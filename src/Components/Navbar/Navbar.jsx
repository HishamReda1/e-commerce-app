import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "./navbar.css"
import logo from '../../images/logo.svg'
import { cartContext } from '../../Context/CartContext';


const Navbar = ({removeUser,userdata}) => {
  const { numberOfCart,wishlistCount} = useContext(cartContext);


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
    {userdata?<>
    <li className="nav-item">
          <Link className="nav-link " to="/allOrders">allOrders</Link>
        </li>

 <li className="nav-item">

          <Link  className="nav-link " to="/Cart"><i class="fa-solid fa-cart-shopping fa-xl pt-2 text-primary position-relative d-flex"><div className="notback "><span  className='position-absolute not'>{numberOfCart}</span></div> </i> </Link>
        </li> 
        
 <li className="nav-item">
        <Link className="nav-link  position-relative d-flex" to="wishlist"><i className='fa-solid fa-heart fa-xl pt-2 text-danger'></i><div className='pt-2'><div className=" end-0  notback  "><span  className='position-absolute not '>{wishlistCount}</span></div></div> </Link>
        </li>
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
