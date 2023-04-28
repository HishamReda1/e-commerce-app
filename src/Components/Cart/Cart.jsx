
import React, { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';


const Cart = () => {

const navigate = useNavigate()
    const { getCart,numberOfCart, totalCartPrice, cartProducts, removeProduct, updateProductCount } = useContext(cartContext);
    console.log(cartProducts);

    useEffect(() => {
        getCart()
       
        return () => {

        };
    }, []);








    return (
        <>
            <Helmet>
                <title>cart</title>
               
            </Helmet>
            <div className="container py-5 my-5">
                <h2 className='text-center  py-5'>Welcome to your cart</h2>
                <div className="d-flex justify-content-between"> <h3 className=' py-2' >Total price:<span className='text-primary py-5'> {totalCartPrice}</span> EGP</h3>
                {numberOfCart=='0'?<button className='btn btn-success text-center btn-lg' disabled="disabled">confirm</button>:<button onClick={ function () {
                    navigate('/Payment')
                } }  className='btn btn-success text-center btn-lg'>confirm</button>}
                
                </div>




                {cartProducts ? cartProducts.map(function (pro, idx) {
                    return <div key={idx} > <div className="row ">
                        <div className="product py-3">
                            <div className='col-md-3'><img src={pro.product.imageCover} className='w-100' alt="" /></div>
                            
                            <div className="col-md-9 "> <h2 >title:{pro.product.title}</h2>

                                <h5>Price: <span className='text-primary'>{pro.price}</span> EGP</h5>
                                <h5>Count:{pro.count}</h5>
                             <div className="col-xs-2">  <input min={1} onChange={function
                                    (e) {
                                    updateProductCount(pro.product.id, e.target.value)
                                }} value={pro.count} type="number" className='form-control'  /></div>

                              
                                <button id='btnE' onClick={function () { removeProduct(pro.product.id) }} className='btn btn-danger text-center btn-lg my-3'>- Remove from cart</button>

                            </div>
                        </div> <hr /></div>  </div>

                }) : <LoadingScreen />}






            </div>
        </>
    );
}

export default Cart;
