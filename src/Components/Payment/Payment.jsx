import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { cartContext } from '../../Context/CartContext';
import { useNavigate, useParams } from 'react-router';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';

const Payment = () => {
   const navigate= useNavigate()
   const {cartId,getCart} = useContext(cartContext);

   useEffect(() => {
    getCart()
   
    return () => {

    };
}, []);
    async function confirmCash() {
        try {
            const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
                "shippingAddress":{
                    "details":document.querySelector("#addDetails").value,
                    "phone": document.querySelector("#phoneN").value,
                    "city":document.querySelector("#city").value
                    }
            },{
                headers:{'token':localStorage.getItem('tkn')}
            })
            if (data.status=='success') {
                navigate('/allOrders')
            }
        } catch (error) {
            console.log(error);
          console.log(cartId);
          
        }
    }
    async function confirmCredit() {
        try {
            const {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?`,{
                "shippingAddress":{
                    "details":document.querySelector("#addDetails").value,
                    "phone": document.querySelector("#phoneN").value,
                    "city":document.querySelector("#city").value
                    }
            },{
                headers:{'token':localStorage.getItem('tkn')}
            },{params:{'url':"http://localhost:4200"}}
            
            
            )
            if (data.status=='success') {
             window.open(data.session.url)
            }
        } catch (error) {
            console.log(error);
          console.log(cartId);
          
        }
    }

    return (
        <>
        <Helmet>
                <title>payment</title>
               
            </Helmet>
            <div className="container ">
               <h2 className='mt-5 pt-3 text-primary'>Payment form</h2>
              <div className="w-50 m-auto">
             {cartId?<form action="">
<label  className='mt-3' htmlFor="addDetails">Address</label>
<input className='form-control' type="text"name='addDetails' id='addDetails' placeholder='Enter your address' />
<label className='mt-3' htmlFor="phone">Phone</label>
<input className='form-control' type="number"name='phone'id='phoneN' placeholder='Enter your phone' />
<label className='mt-3' htmlFor="city">City</label>
<input className='form-control' type="text"name='city'id='city' placeholder='Enter your city' />

<button onClick={
    function(){ confirmCash()}
}  type='button'className='btn btn-outline-primary my-3'>Confirm cash</button>
<button onClick={
    function(){ confirmCredit()}
}  type='button'className='btn btn-outline-primary my-3 m-3'>Confirm credit cart</button>
              </form>:<LoadingScreen/>} 



              </div>


            </div>
        </>
    );
}

export default Payment;
