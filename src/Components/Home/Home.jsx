import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingScreen from './../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import Owldemo1 from './../Owldemo1/Owldemo1';
import { Helmet } from 'react-helmet';
const Home = () => {
  const [allProducts, setallProducts] = useState(null);
  async function getAllProducts() {
    try {
      let { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/products')
      setallProducts(data.data)
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts()
    return () => {

    };
  }, []);





  return (
    <>
   <Helmet>
                <title>Home</title>
               
            </Helmet>
            <div style={{display:'none',alignItems:'center'}} className="errMsgCart alert alert-danger text-center pt-5">There is no cart for you</div>
      <div className='mt-5 pt-3' >
      <div className="App">  
      <Owldemo1/> 

    </div>  
    
      </div>
      <div className="container pt-5 mt-5">
        <h2>Shop popular categories</h2>
        <div className="row">

          {allProducts ? allProducts.map(function (pro, idx) {
            return <>
              <div  key={idx} className="col-md-2 m-3 proCard" >
                <Link to={`/ProDetails/${pro.id}`}>
                  <div className="carda position-relative w-100 bg-light ">
                    <div className='d-flex position-absolute  end-0 mt-2 '><i className='fa-solid fa-star ' style={{ color: 'gold' }}></i><div className="text-dark">{pro.ratingsAverage}</div>
                    </div>
                    <div className='p-3'>
                    <img className=' w-100 rounded-5' src={pro.imageCover} alt="" />
                    <h5 className='  text-dark'>{pro.title.slice(0, pro.title.indexOf(' ', 20))}</h5>
                    <h6 className='text-primary' >{pro.category.name}</h6>
                    <h6 className='pt-2 text-dark'>Price:{pro.priceAfterDiscount ? <><span className=''>{pro.priceAfterDiscount}</span><span className='px-2 text-decoration-line-through'>{pro.price}</span></> : <span>{pro.price}</span>}</h6>
                  </div>
                 
                  
                  </div>
                </Link>
              </div>

            </>
          }) : <LoadingScreen />}
        </div>
      </div>
    </>

  );
}

export default Home;
