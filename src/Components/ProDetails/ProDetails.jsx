import React from 'react';
import axios, { Axios } from 'axios';
import 'animate.css';
import  { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useParams } from 'react-router';
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';




const ProDetails = ( ) => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };  
    const { addProductwishlist,removeProductwishlist } = useContext(cartContext);
   
    const { addProduct,removeProduct} = useContext(cartContext);
   const{id}= useParams();
    const [product, setproduct] = useState(null);
    async function getProduct() {
        try {
            const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
            setproduct(data.data)
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getProduct()

    }, []);
    return (
        <>
            <Helmet>
                <title>Product details</title>
               
            </Helmet>
            <div className="container "><h2 className='py-5 mt-5 animate__animated animate__fadeInDown text-primary'>Product details</h2>
                {product?<>   <div className="row">
                    <div className="col-md-3">
                    <Slider {...settings}>
        {product.images.map(function(img,idx){return <img key={idx} src={img} className='w-100 col-md-9 pt-3 animate__animated animate__fadeInLeft animate__delay-2s ' alt={product.title}/>})}
      </Slider>
                    </div>
                    <div className="col-md-9 pt-3 animate__animated animate__fadeInRight animate__delay-2s">
                        <h2 className=''>{product.title}</h2>
                        <h5 style={{color:'gray'}} >{product.description}</h5>
                        <h5  className='pt-3 text-primary'>{product.category.name}</h5>
                        
                        <div className='d-flex justify-content-between'><h5>{product.price} EGP</h5><div><i onClick={ function(){addProductwishlist(product.id)} } id='loveS' className="fa-regular fa-heart"></i> <i onClick={ function(){removeProductwishlist(product.id)} } id='loveE' style={{display:'none'}} className="fa-solid fa-heart text-danger"></i> <i className='fa-solid fa-star ' style={{ color: 'gold' }}></i>{product.ratingsAverage}</div></div>

                        <div className="d-grid gap-2 pt-3">
                        <button id='btnS' onClick={function ( ) { addProduct(product.id) }} className='btn btn-success text-center btn-lg'>+ Add to cart</button>
                            <button id='btnE'onClick={function ( ) { removeProduct(product.id) }} style={{display:'none'}} className='btn btn-danger text-center btn-lg'>- Remove from cart</button>
                        </div></div>

                </div></>:<LoadingScreen/> }
              </div>
        </>
    );
}

export default ProDetails;
