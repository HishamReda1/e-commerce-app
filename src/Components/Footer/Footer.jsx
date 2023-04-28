import React from 'react';

const Footer = () => {
    return (
        <>
              <footer className='bg-light mt-5 pb-5'>
            <h2 className='ms-2 pt-2'>Get the FreshCart App</h2>
            
             <p className='ms-2'>We will send you a link ,open it on your phone to download the app</p>
<div className="container d-flex justify-content-between"> 
<input type="text" placeholder='Email'className='form-control w-75' />
<button className='btn btn-success btn-lg ms-5 w-25'>Share app link</button>
</div>
<div className="container py-5 my-5 border-top border-bottom border-2 border-ternary py-2 d-flex justify-content-between">
<div className="left-part d-flex mx-2 align-items-center">
    <h6>Payment partners</h6>
     <i className='fa-brands fa-paypal mx-2 text-primary'></i>
     <i className='fa-brands fa-cc-amazon-pay mx-2 text-primary'></i>
     <i className='fa-brands fa-cc-mastercard mx-2 text-primary'></i>
</div>
<div className="right-part d-flex mx-2 me-2 align-items-center">
<h6 className='me-2 '>Get deliveries with FreshCart </h6>
<button className='btn  btn-dark me-2'> <i className='fa-brands fa-app-store'></i> Avaliable on App Store </button>
<button className='btn  btn-dark me-2'> <i className='fa-brands fa-google-play'></i> Get it on Google Play </button>

</div>


</div>
            </footer>
        </>
    );
}

export default Footer;
