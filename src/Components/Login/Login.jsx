import axios, { Axios } from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import $ from 'jquery'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


const Login = ({saveUser, userdata}) => {
 
    async function forgetPassword() {
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{'email':document.querySelector("#email").value})
           if (data.statusMsg=='success') {
            $('#resetS').fadeIn(500)
            navigate('/verify')
           }
            console.log(data);
        } catch (error) {
             $('#resetE').fadeIn(500)
            console.log(error);
        }


    }
  





    const [loading, setloading] = useState(false);

    let user ={
  
    email:'',
    
    password:'',
     

    }
    const navigate= useNavigate()
    async function loginUser(obj) {
       
       
    try {
     
            let {data}= await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',obj)
            console.log(data);
           if (data.message=='success') {
            setloading(false)
            $('.errMsg').fadeOut(500)
            $('.sucMsg').fadeIn(1000,function () {
                navigate('/Home')
                localStorage.setItem('tkn',data.token)
                saveUser()
            })
           } {
         
       }
          
    } catch (error) {
        setloading(false)
        console.log(error.msg);
        $('.errMsg').fadeIn(500)
    }
     }

    
  let formik=  useFormik(
{

    initialValues:user,
    onSubmit:function(values){
         loginUser(values) ;
       
    },
    validate:function(values){
        let errors={}
       
        
        if (!values.email) {
            errors.email = 'Required';
          }
           else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
        
      
        return errors

    }
 
}


    )
    return (
        <>
        <Helmet>
                <title>Login</title>
               
            </Helmet>
            <div className="container mt-5 py-5">
              <form  className='py-2' action="" onSubmit={formik.handleSubmit}>
                <h2>Login form</h2>
                <div style={{display:'none',alignItems:'center'}} className="errMsg alert alert-danger text-center">Email or password invalid</div>
                <div style={{display:'none',alignItems:'center'}} className="sucMsg alert alert-success text-center">Congratulations!</div>
                <div style={{display:'none',alignItems:'center'}} id='resetS' className=" alert alert-success text-center">Reset code sent to your email</div>
                <div style={{display:'none',alignItems:'center'}} id='resetE' className=" alert alert-danger text-center">There is no user registered with this email address</div>
                 <label className='mt-3' htmlFor="email">Email</label>
                 <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control' id='email' type="email" placeholder='Enter your email' />
                 {formik.errors.email&& formik.touched.email?<div className="alert alert-danger text-center">{formik.errors.email}</div>:''}
                 <label className='mt-3' htmlFor="password">Password</label>
                 <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control' id='password' type="password" placeholder='Enter your password' />
                 {formik.errors.password && formik.touched.password?<div className="alert alert-danger text-center">{formik.errors.password}</div>:''}
              <button disabled={!formik.isValid &&!formik.dirty} className='btn btn-primary mt-4' onClick={()=>setloading(true)} type='submit'> {!loading?'Login':<><i className="fa fa-spinner fa-spin text-white"></i></>}</button>
              <button className='btn btn-outline-primary mt-4 mx-3' type='submit ' onClick={()=>{navigate('/Register')}}>Register</button>
            <div className="mt-3">
                 <Link className='text-center ' onClick={()=>{forgetPassword()} }>
                 Did you forget your password?
                </Link>
            </div>
              </form>




            </div>
        </>
    );
}


export default Login;
