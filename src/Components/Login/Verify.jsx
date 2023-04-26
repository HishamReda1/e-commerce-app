import React from 'react';
import $ from 'jquery'
import axios from 'axios';
import { useNavigate } from 'react-router';
const Verify = () => {
    const navigate = useNavigate()
    async function verifyPassword() {
        try {
            const { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,{"resetCode":document.querySelector("#resetCode").value})
           if (data.status=='Success') {
            $('#verifyS').fadeIn(500)
            navigate('/updatePassword')
           }
            console.log(data);
        } catch (error) {
             $('#verifyE').fadeIn(500)
            console.log(error);
        }

    }


    
    return (
        <> <div className="container mt-5 py-5">
            <h3> verfication</h3>
                        <div style={{display:'none',alignItems:'center'}} id='verifyE' className=" alert alert-danger text-center">your code is invalid</div>
                        <div style={{display:'none',alignItems:'center'}} id='verifyS' className=" alert alert-success text-center">verification is done !</div>
                 <input   className='form-control' id='resetCode' placeholder='Enter the code' />
                 <button className='btn btn-outline-primary mt-4 mx-3' type='submit ' onClick={()=>{verifyPassword()}}>send</button>

            </div>
        </>
    );
}

export default Verify;
