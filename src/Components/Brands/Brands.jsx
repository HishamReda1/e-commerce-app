import React from 'react';
import 'animate.css';
import axios, { Axios } from 'axios';
import { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const Brands = () => {

    const [allbrands, setallbrands] = useState(null);

    async function getBrands() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            setallbrands(data.data)

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getBrands()

    }, []);




    return (
        <>
            <Helmet>
                <title>Brands</title>
               
            </Helmet>
            <div className="container pt-5 mt-5">
                <div className="row align-items-center">
                    <div className="col-md-3">
                        <div className="item ">
                            <div className="title animate__animated animate__fadeInDown">
                                <h2 className='text-primary' >Our Brands</h2>
                                <p>You can see our brands and each brand includes the product in it</p>             </div>
                        </div>
                    </div>
                    {allbrands ? allbrands.map(function (brand, idx) {
                        return <>
                            <div key={idx} className="col-md-3 proCard"><Link to={`/BrandProducts/${brand._id}`}>
                                <div  className="Brand p-3 carda">
                                    
                                    <img src={brand.image} alt="brandImg" className='w-100 rounded-5' />
                                    <h6 className='text-center text-primary'> {brand.name}</h6>
                                </div>
                            </Link ></div> </>

                    }):<LoadingScreen />}
            </div>
        </div >
        </>
    );
}

export default Brands;
