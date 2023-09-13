import { Button } from 'antd';
import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react'
import { useState } from 'react';
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../../components/input-field/input-field.component';
import LoadingSipner from '../../components/spin/spin'
import { auth } from '../../firebase';

const ForgetPassword = () => {
    const {loading}=useSelector(state=>state.user);
    const [email,setEmail]=useState('')
    
    const handleOnChange=(event)=>{
        setEmail(event.target.value)
    }
    const navigate=useNavigate();
    const config={
        url:process.enn.REACT_APP_FROGET_PASSWORD_REDIRECT,
        handleOnChange:true
    }
    const handleSubmit=()=>{
        sendPasswordResetEmail(auth, email,config)
        .then(() => {
            toast.success("Email sent successfully")
            setEmail('')
            navigate('/')
        })
        .catch((error) => {
            toast.error(error.message);
        });
    }
    return( 
        loading ? (<LoadingSipner   />):(
            
            <div className='container col-md-6 offset-md-3 p-5'>
                <h4>Forget Password</h4>
                <form onSubmit={handleSubmit}>

                    <InputField type='email' onChange={handleOnChange} label="Email Address" name='email' 
                        value={email}  />

                    <Button
                        onClick={handleSubmit}
                        type='primary'
                        className='mb-3'
                        block
                        shape='round'
                        size='large'
                        disabled={!email|| email.length<6}

                    >Verify Email</Button>
                </form>
            </div>
        )
)
  
}

export default ForgetPassword