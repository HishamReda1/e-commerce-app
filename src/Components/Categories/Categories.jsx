import React from 'react';
import 'animate.css';
import axios, { Axios } from 'axios';
import { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Categories = () => {

    const [allCategory, setallCategory] = useState(null);

    async function getCategories() {
        try {
            const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
            setallCategory(data.data)

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getCategories()

    }, []);




    return (
        <>
         <Helmet>
                <title>Categories</title>
               
            </Helmet>
            <div className="container pt-5 mt-5">
                <div className="row align-items-center">
                    <div className="col-md-3">
                        <div className="item ">
                            <div className="title animate__animated animate__fadeInDown">
                                <h2 className='text-primary' >Our Categories</h2>
                                <p>You can see our Category and each one includes the product in it</p>             </div>
                        </div>
                    </div>
                    {allCategory ? allCategory.map(function (data, idx) {
                        return <>
                            <div key={idx} className="col-md-3 proCard"><Link to={`/CategoryProducts/${data._id}`}>
                                <div className="Brand p-3 carda">
                                    
                                    <img src={data.image} alt="cadattg" className='w-100 rounded-5' />
                                    <h6 className='text-center text-primary'> {data.name}</h6>
                                </div>
                            </Link ></div> </>

                    }):<LoadingScreen />}
            </div>
        </div >
        </>
    );
}

export default Categories;
