
import { createUserWithEmailAndPassword,sendEmailVerification,  } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import InputField from '../../components/input-field/input-field.component'
import { auth } from '../../firebase'
 import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'  
import {  setTimeActive,} from '../../redux/features/user/user-slice'
import { useDispatch } from 'react-redux'
import { Button } from 'antd'


const Register = () => {
  let [userData,setUserData]=useState({email:'',name:'',password:"",confirmPassword:""})
  const dispatch=useDispatch();
  let {name,email,password,confirmPassword}=userData;
  const navigate=useNavigate();


  const validatePassword=()=>{
    let isValid=true;
    if(password==="" || password!== confirmPassword){
      isValid=false
      toast.error("password doesn't Match")
    }
    return isValid
  }

  const handleOnChange=(event)=>{
    const{name,value}=event.target;
    setUserData({...userData,[name]:value})
    
  }
  const config={
        url:'http://localhost:3000/',
        handleOnChange:true
    }

  const handleSubmit=async (event)=>{
    
    event.preventDefault();


    // const actionCodeSettings={
    //   url:'http://localhost:3000/',
    //   handleCodeInApp:true,
    // }

    if(validatePassword()){
          createUserWithEmailAndPassword(auth,email,password).then(()=>{
              toast.info("Please Verify your Email");
              dispatch(setTimeActive(true));  
              
            sendEmailVerification(auth.currentUser,config).then(()=>{
              navigate('/verify-email')
            }).catch((err)=>toast.error(err))
            
            
          }
          ).catch(err=>toast.error(err.message))

      setUserData({email:'',name:'',password:'',confirmPassword:''})

    }
     
  }
  return (

    <div className='container py-5'>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Sign Up</h4>

          <form onSubmit={handleSubmit}>
            <InputField type='text' onChange={handleOnChange} label="Display Name" name='name' value={name}/>
        
            <InputField type='email' onChange={handleOnChange} label="Email Address" name='email' 
            value={email}  />

            <InputField type='password' onChange={handleOnChange} label="Password" name='password' 
            value={password}  />

            <InputField type='password' onChange={handleOnChange} label="Confirm Password" name='confirmPassword' 
            value={confirmPassword}  />

            
            <Button
           onClick={handleSubmit}
           type='primary'
           className='mb-3'
           block
           shape='round'
           size='large'
          >Submit</Button>
          </form>
          
          
          
          </div>
      </div>
    </div>
  )
}

export default Register