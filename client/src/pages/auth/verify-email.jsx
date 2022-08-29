import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import './verifyEmail.css'
import React, { useEffect } from 'react'
import { useState } from 'react';
import {useDispatch, useSelector}from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCurrentUser, setTimeActive, setUserCredientials } from '../../redux/features/user/user-slice';
import { auth } from '../../firebase';
import { useCallback } from 'react';
import { craeteUpdateUser } from '../../services/auth-service';
const VerfiyEmail = () => {
    const navigate=useNavigate();
    const [time,setTime]=useState(60);
    const {loginUser,timeActive,}=useSelector((state)=>state.user)
   
    const dispatch=useDispatch();
    // const fin=useCallback(({loginUser,interval1})=>{if(loginUser.emailVerified){
    //       dispatch(setCurrentUser(loginUser))
    //       toast.success("You successfully login")
    //       clearInterval(interval1)
    //       navigate('/')
    //     }},[dispatch,navigate])
    

 
    useEffect(() => {
       console.log("check user",loginUser);
    const interval = setInterval(() => {
      
        if(loginUser?.emailVerified){
       
          dispatch(setCurrentUser(loginUser))
           toast.success(`${loginUser.email} successfully login`)
           clearInterval(interval)
           navigate('/')

        }
      
      
    }, 1000)

  },[loginUser,dispatch,navigate])
  
  useEffect(()=>{
    console.log("useEffect is chaling")
      let interval
      console.log("check user",loginUser.reloadUserInfo);
        // console.log("proptotype",Object.getPrototypeOf(loginUser).reload());

    // const interval1 = setInterval(() => {
      // if(Object.getPrototypeOf(loginUser).reload){if(loginUser?.emailVerified) { 
      //   dispatch(setCurrentUser(loginUser))
      //     toast.success("You successfully login")
      //     // clearInterval(interval1)
      //     navigate('/')
      // }}
      
    // }, 1000)

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

  },[timeActive,time,dispatch,navigate,loginUser])

 
  const resendEmailVerification=()=>{
   
      sendEmailVerification(auth.currentUser).then(()=>{
         toast.info("Verify your Email")
        dispatch(setTimeActive(true));

      }).catch(error=>
      toast.error(error.message)        
        )
     
    
   
    
  }
   
  return (
     <div className='center'>
      <div className='verifyEmail'>
        <h1>Verify your Email Address</h1>
        <h3>Reload page after verification</h3>
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