import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import './verifyEmail.css'
import React, { useEffect } from 'react'
import { useState } from 'react';
import {useDispatch, useSelector}from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCurrentUser, setTimeActive } from '../../components/redux/features/user/user-slice';
import { auth } from '../../firebase';
const VerfiyEmail = () => {
    const navigate=useNavigate();
    const [time,setTime]=useState(60);
    const {loginUser,timeActive}=useSelector((state)=>state.user)
    console.log("check user",loginUser);
    const dispatch=useDispatch();

    useEffect(() => {
    const interval = setInterval(() => {
      loginUser?.reload()
      .then(() => {
        if(loginUser?.emailVerified){
          clearInterval(interval)
          dispatch(setCurrentUser(loginUser))
          toast.success("You successfully login")
          navigate('/')
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [navigate, loginUser])

  useEffect(()=>{
    let interval

    if (timeActive&& time!==0) {
        interval=setInterval(() => {
            setTime((time)=>time-1)
        }, 1000);
    }
    else if(time===0){
        setTime(60);
        dispatch(setTimeActive(false));
        clearInterval(interval);
    }

    return()=>clearInterval(interval)

  },[timeActive,time,dispatch])

  const resendEmailVerification=async()=>{
    try {
      await sendEmailVerification(auth.currentUser);
      dispatch(setTimeActive(false));
      toast.info("Please verify you Email")
    
    } catch (error) {
      toast.error(error.message)
    }
  }
   
  return (
     <div className='center'>
      <div className='verifyEmail'>
        <h1>Verify your Email Address</h1>
        <p>
          <strong>A Verification email has been sent to:</strong><br/>
          <span>{loginUser?.email}</span>
        </p>
        <span className='sp'>Follow the instruction in the email to verify your account</span>       
        <button 
          onClick={()=>resendEmailVerification()}
          disabled={timeActive}
        >Resend Email {timeActive && time}</button>
      </div>
    </div>
  )
}

export default VerfiyEmail