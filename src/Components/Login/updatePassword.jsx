import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router';
import $ from 'jquery'
const UpdatePassword = () => {
    let user ={
  
        email:'',
        
        newPassword:'',
         
    
        }
    let formik=  useFormik(
        {
        
            initialValues:user,
            onSubmit:function(values){
                UpdatePassword(values) ;
               
            },
            validate:function(values){
                let errors={}
               
                
               
                if (values.password.length<6 &&values.password.length>12 ) {
                    errors.password= 'Password must be more than 6 charachters and less than 12 ';
                }
              
                return errors
        
            }
         
        }


        )

    
    const navigate = useNavigate()
    async function updatePassword() {
        try {
            const { data } = await axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,{
                "email":document.querySelector('#email').value,
                "newPassword": document.querySelector('#newPassword').value
          })
          navigate('/login')
          if (data.message=='success') {
            
            $('#updateS').fadeIn(500)}
         

    }
    catch (error) {
        $('#updateE').fadeIn(500)
       console.log(error);
   }
}
    return (

     
            <> <div className="container mt-5 py-5">
            <h3> update password</h3>
                        <div style={{display:'none',alignItems:'center'}} id='updateE' className=" alert alert-danger text-center">your email is invalid</div>
                        <div style={{display:'none',alignItems:'center'}} id='updateS' className=" alert alert-success text-center">congratulation !</div>
                 <input type='email'   className='form-control' id='email' placeholder='Enter your email' />
                 
                 <input type='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword}  className='form-control' id='newPassword' placeholder='Enter new password' />
                 {formik.errors.password && formik.touched.password?<div className="alert alert-danger text-center">{formik.errors.password}</div>:''}
                 <button className='btn btn-outline-primary mt-4 mx-3' type='submit ' onClick={()=>{updatePassword()}}>submit</button>

            </div>
        </>
      
    );
}

export default UpdatePassword;
