import axios, { Axios } from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import $ from 'jquery'
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';

const Register = () => {


    let user ={
    name:'',
    email:'',
    phone:'',
    password:'',
     rePassword:'',

    }
    const navigate= useNavigate()
    async function regNewUser(obj) {
       
       
    try {
     
            let {data}= await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',obj)
            console.log(data);
           if (data.message=='success') {
            $('.sucMsg').fadeIn(500,function () {
                navigate('/Login')
            })
           } 
          
    } catch (error) {
        console.log(error.response.data.errors.msg);
        $('.errMsg').fadeIn(500)
    }
     }
    
  let formik=  useFormik(
{

    initialValues:user,
    onSubmit:function(values){
         regNewUser(values) ;
       
    },
    validate:function(values){
        let errors={}
        if (values.name.length<3 ||values.name.length>10 ) {
            
            errors.name='Name must be more than 3 charachters and less than 10'
        }
         if(!values.phone.match(/^01[0125][0-9]{8}$/)) {
            errors.phone=' Invalid phone '
        }
        if (!values.email) {
            errors.email = 'Required';
          }
           else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
        if (values.password.length<6 &&values.password.length>12 ) {
            errors.password= 'Password must be more than 6 charachters and less than 12 ';
        }
        if (values.password!=values.rePassword) {
            errors.rePassword= 'Password is not matched ';
        }
        return errors

    }
 
}


    )
    return (
        <>
        <Helmet>
                <title>Register</title>
               
            </Helmet>
            <div className="container mt-5 py-5">
              <form  className='py-2' action="" onSubmit={formik.handleSubmit}>
                <h2>Registeration form</h2>
                <div style={{display:'none',alignItems:'center'}} className="errMsg alert alert-danger text-center">Email already in use</div>
                <div style={{display:'none',alignItems:'center'}} className="sucMsg alert alert-success text-center">Congratulations!</div>

               
                <label className='mt-3' htmlFor="name">Name</label>
                 <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}  className='form-control' id='name' type="text" placeholder='Enter your name' />
                 {formik.errors.name && formik.touched.name?<div className="alert alert-danger text-center">{formik.errors.name}</div>:''}
                 <label className='mt-3' htmlFor="email">Email</label>
                 <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control' id='email' type="email" placeholder='Enter your email' />
                 {formik.errors.email&& formik.touched.email?<div className="alert alert-danger text-center">{formik.errors.email}</div>:''}

                 <label className='mt-3' htmlFor="phone">Phone</label>
                 <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control' id='phone' placeholder='Enter your phone' />
                 {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger text-center">{formik.errors.phone}</div>:''}

                 
                 <label className='mt-3' htmlFor="password">Password</label>
                 <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control' id='password' type="password" placeholder='Enter your password' />
                 {formik.errors.password && formik.touched.password?<div className="alert alert-danger text-center">{formik.errors.password}</div>:''}

                 <label className='mt-3' htmlFor="rePassword">     rePassword</label>
                 <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='form-control' id='rePassword' type="password" placeholder='rePassword' />
                 {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger text-center">{formik.errors.rePassword}</div>:''}

              <button className='btn btn-outline-primary mt-4' type='submit'> Register</button>



              </form>




            </div>
        </>
    );
}

export default Register;
