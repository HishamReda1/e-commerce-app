import React from 'react';
import axios, { Axios } from 'axios';
import { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import 'animate.css'
import { Helmet } from 'react-helmet';

const CategoryProducts = () => {
    const { id } = useParams();
    const [Category, setCategory] = useState(null);
    async function getCategory() {
        try {
            const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/products', {
                params: {'category[in][]': `${id}`}

            }
            )
            setCategory(data.data)
       
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getCategory()
        console.log(Category);
    }, []);
    return (
        <>
            <Helmet>
                <title>category products</title>
               
            </Helmet>
            <div className="container"><h2 className='py-5 mt-5 animate__animated animate__fadeInDown text-primary'>Category products</h2><div className="row">
                {Category ? Category.map(function (data, idx) {
                    return <>
                        <div id='proCard' key={idx} className="col-md-2 m-3 proCard" >
                        <Link to={`/ProDetails/${data.id}`}>
                                <div className="carda position-relative w-100 bg-light">
                                    <div className='d-flex position-absolute  end-0 mt-2 '><i className='fa-solid fa-star ' style={{ color: 'gold' }}></i><div className="text-dark">{data.ratingsAverage}</div>
                                    </div>
                                    <div className="p-3">
                                    <img className=' w-100 rounded-5 w-100' src={data.imageCover} alt="" />
                                    <h5 className=' text-dark'>{data.title.slice(0, data.title.indexOf(' ', 20))}</h5>
                                    <h6 className='text-primary' >{data.category.name}</h6>
                                    <h6 className='pt-2 text-dark'>Price:{data.priceAfterDiscount ? <><span className=''>{data.priceAfterDiscount}</span><span className='px-2 text-decoration-line-through text-danger'>{data.price}</span></> : <span>{data.price}</span>}</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </>
                }) : <LoadingScreen />}</div>
            </div>
           
        </>)
}

export default CategoryProducts;
