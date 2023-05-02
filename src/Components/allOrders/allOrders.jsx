import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';

const AllOrders = ({ userdata }) => {
    const [allOrders, setallOrders] = useState([]);
    async function getAllorders() {
        try {


            const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userdata.id}`)
setallOrders(data)
        
        } catch (error) {
            
            console.log(error);
        }
    }
    useEffect(() => {
        getAllorders()

    }, []);
    return (
        <>
        
        <Helmet>
                <title>all orders</title>
               
            </Helmet>
            <div className="container py-5">
                <div className="row py-5">
                   
{allOrders?allOrders.map(function(order,idx){return <div key={idx} className="col-md-3 border rounded-3 mx-3 p-3 g-3">
                        <div className="order">
                             <div className="container">

                                 <div className="row">

                                    {order.cartItems.map(function(item,index){
                                        return <div key={index} className="col-sm-6">
                                        <div className="product">
                                            <img src={item.product.imageCover} className='w-100' alt="" />
                                        <h4>{item.product.title.slice(0,10)}</h4>
                                        <h5>Count:{item.count}</h5>
                                         <h5>Price: <span className='text-primary'>{item.price}</span> EGP</h5>
                                        </div>
                                    </div>
                                        
                                    })}
                                 </div>


                             </div>


                            <h5> total price: <span className='text-primary'>{order.totalOrderPrice}</span> EGP</h5>
                            <h6>Payment type: {order.paymentMethodType}</h6>
                            <p>This order was deliverd to {order.shippingAddress.details}</p>
                        </div>
                    </div> }):<LoadingScreen/>}
                </div>

            </div>
        </>
    );
}

export default AllOrders;
