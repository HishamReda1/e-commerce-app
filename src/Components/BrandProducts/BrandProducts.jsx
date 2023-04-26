import React from 'react';
import axios, { Axios } from 'axios';
import { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import 'animate.css'
import {Helmet} from "react-helmet";


const BrandProducts = () => {
    const { id } = useParams();
    const [Brands, setBrands] = useState(null);
    async function getBrands() {
        try {
            const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`, {
                params: { 'brand': id }


            }
            )
            setBrands(data.data)
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getBrands()
        console.log(Brands);
    }, []);
    return (
        <>
           <Helmet>
                <title>Brand product</title>
               
            </Helmet>
            <div className="container "><h2 className='py-5 mt-5 animate__animated animate__fadeInDown text-primary'>Brand products</h2><div className="row">
                {Brands ? Brands.map(function (Brand, idx) {
                    return <>
                        <div id='proCard' key={idx} className="col-md-2 m-3 proCard" >
                            <Link to={`/ProDetails/${Brand.id}`}>
                                <div className="carda position-relative p-3 w-100 ">
                                    <div className='d-flex position-absolute  end-0 mt-2 '><i className='fa-solid fa-star ' style={{ color: 'gold' }}></i><div className="text-dark">{Brand.ratingsAverage}</div>
                                    </div>
                                    <img className=' w-100' src={Brand.imageCover} alt="" />
                                    <h5 className=' text-dark'>{Brand.title.slice(0, Brand.title.indexOf(' ', 20))}</h5>
                                    <h6 className='text-primary' >{Brand.category.name}</h6>
                                    <h6 className='pt-2 text-dark'>Price:{Brand.priceAfterDiscount ? <><span className='text-decoration-line-through'>{Brand.priceAfterDiscount}</span><span className='px-2'>{Brand.price}</span></> : <span>{Brand.price}</span>}</h6>
                                </div>
                            </Link>
                        </div>

                    </>
                }) : <LoadingScreen />}</div>
            </div>
           
        </>)
}

export default BrandProducts;
