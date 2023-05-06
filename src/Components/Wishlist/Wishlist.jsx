import React, { useContext, useEffect } from 'react';



import { cartContext } from '../../Context/CartContext';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';

const Wishlist = () => {
    
    const { wishlistProducts, wishlistCount, removeProductwishlist,getwishlist,addProduct,removeProduct } = useContext(cartContext);
    useEffect(() => {
        getwishlist()
        
        return () => {
            
        };
    }, []);
    return (
        <>


            <Helmet>
                <title>wishlist</title>

            </Helmet>
            <div className="container py-5 my-5">
                <h2 className='text-center  py-5'>Welcome to your Wishlist</h2>





                {wishlistProducts ? wishlistProducts.map(function (pro, idx) {
                    return <div key={idx} > <div className="row ">
                        {wishlistCount == 0?<div><h4 >There is no products in your wishlist </h4></div>  : <><div className="product py-3">
                            <div className='col-md-3'><img src={pro.imageCover} className='w-100' alt="" /></div>

                            <div className="col-md-9 "> <h2 >{pro.title}</h2>

                                <h5>Price: <span className='text-primary'>{pro.price}</span> EGP</h5>


                                <button id='loverE' onClick={function () { removeProductwishlist(pro.id) }} className='btn btn-danger text-center btn-lg me-3'>- Remove from wishlist</button>
                                <button id='btnS' onClick={function ( ) { addProduct(pro.id) }} className='btn btn-success text-center btn-lg '>+ Add to cart</button>
                            <button id='btnE'onClick={function ( ) { removeProduct(pro.id) }} style={{display:'none'}} className='btn btn-danger text-center btn-lg'><i className='fa-solid fa-heart' ></i> Remove from cart</button>
                            </div>
                        </div><hr /> </>}
                       
                    </div>
            </div>
                }) : <LoadingScreen />}






            </div>

        </>
    );
}

export default Wishlist;
