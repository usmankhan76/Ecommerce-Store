import './verifyEmail.css'
import { sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import InputField from '../../components/input-field/input-field.component';
import {  setCurrentUser, setTimeActive, setUserCredientials } from '../../redux/features/user/user-slice';
import { auth, provider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import {  GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { craeteUpdateUser } from '../../services/auth-service';
import { getUserCart } from '../../services/cart-service';
import {  addToCartFromDb } from '../../redux/features/cart/cart-slice';
import _ from 'lodash'


function Login(){
  // const {loginUer,loginUserToken}=useSelector(state=>state.user);
  const location=useLocation()
  const state=useSelector((state)=>state)
  const {authUserToken}=state.user
  
  const navigate=useNavigate()
  const dispatch=useDispatch();

  // useEffect(()=>{
    
  //   if(loginUer && loginUserToken ) navigate('/')
  // },[loginUer,navigate,loginUserToken])
  
  function roleBasedRedirect(role){
    const intended=location.state;
    if(intended){
      navigate(intended.goBack)
    }else{
       if(role==="admin"){
       navigate('/admin/dashboard')
      }else{
        navigate('/user/dashboard')
      }
    }
   
  }

  let [userData,setUserData]=useState({email:'',name:'',password:"",confirmPassword:""})
  let {email,password,name}=userData;

  const handleOnChange=(event)=>{
      const{name,value}=event.target;
      setUserData({...userData,[name]:value})
    
  }
  const login = (event) => {
      event.preventDefault();
     
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if(!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
          .then(() => {
            dispatch(setTimeActive(true))
            navigate('/verify-email')
          })
        .catch(err => alert(err.message))
      }else{

        craeteUpdateUser(auth.currentUser,name).then((res)=>{
          const{name,email,role,tokenId,_id}=res.data
          dispatch(setUserCredientials({name,email,role,tokenId,_id}))
          
          toast.success( `${auth.currentUser.email} Successfully Log in`)
          
          getUserCart(authUserToken).then((res)=>{
          const {products}=res.data
            let cart=[]
          if(typeof window !== 'undefined' ){
            if(JSON.parse(localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart').length>0 ))){

              cart=JSON.parse(localStorage.getItem('cart'))
            }

           
            cart=products.map(({product,count})=> ({...product,count}))
            let unique= _.uniqWith(cart, _.isEqual)  //sd
            localStorage.setItem('cart',JSON.stringify(unique)) //sd
            dispatch(addToCartFromDb(cart))

          }
      
          // dispatch(addToCart(products.product))
        }).catch(err=>console.log('getCart error',err.message))

          roleBasedRedirect(role)
          // navigate('/')
        }).catch(err=>toast.error(err))
      }


      }).catch(err => toast.error(err.message))

       
  }

 const googleSignIn= ()=>{
    
    signInWithPopup(auth,provider).then(({user})=>{
      craeteUpdateUser(auth.currentUser,name).then((res)=>{
          const{name,email,role,tokenId,_id}=res.data
          dispatch(setUserCredientials({name,email,role,tokenId,_id}))
          dispatch(setCurrentUser(user))

          return getUserCart(authUserToken).then((res)=>{
          const {products}=res.data
            let cart=[]
          if(typeof window !== 'undefined' ){
            if(JSON.parse(localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart').length>0 ))){

              cart=JSON.parse(localStorage.getItem('cart'))
            }

           
            cart=products.map(({product,count})=> ({...product,count}))
            let unique= _.uniqWith(cart, _.isEqual)  //sd
            localStorage.setItem('cart',JSON.stringify(unique)) //sd
            dispatch(addToCartFromDb(cart))

          }
      
          // dispatch(addToCart(products.product))
        }).catch(err=>console.log('getCart error',err.message))
          
         toast.success(`${user.email} is successful Login`)
          navigate('/')
        }).catch(err=>toast.error(err))   
    

    }).catch((err)=>toast.error(err))
     
   
  };

  return(
    <div className='container py-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
        <h1>Log in</h1>
        {/* {error && <div className='auth__error'>{error}</div>} */}
        <form onSubmit={login} >
          <InputField type='email' onChange={handleOnChange} label="Email Address" name='email' 
            value={email}  />

            <InputField type='password' onChange={handleOnChange} label="Password" name='password' 
            value={password}  />

          {/* <button type='submit' className='butn'>Login</button> */}
          <Button
           onClick={login}
           type='primary'
           className='mb-3'
           block
           shape='round'
           icon={<MailOutlined style={{fontSize:20}} />}
           size='large'
           disabled={!email|| password.length<6}
          >Login with Email/Password</Button>
          
        </form>
        <Button
           onClick={googleSignIn}
           type='primary'
           className='mb-3'
           block
           shape='round'
           icon={<GoogleOutlined  style={{fontSize:20}}/>}
           size='large'
          >Login with Google</Button>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <p>
          Don't have and account? 
          {/* <Link to='/verify-email' style={{textDecoration:'none'}}> Create one here</Link> */}
          <Link to='/signup' style={{textDecoration:'none'}}> Create one here</Link>
        </p>
        <Link to='/forget-password' className='float-right text-danger' style={{textDecoration:'none'}}>Forget Password</Link>
          </div>  
          </div>
      </div>
    </div>
  )
}

export default Login