import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentIntents } from '../../services/payment-service';
import {toast}from 'react-toastify'
import TextField from '@mui/material/TextField';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {Link} from 'react-router-dom'
import { setCouponApply, setOrderConfirm } from '../../redux/features/coupon/coupon-slice';
import { Card, CardContent } from '@mui/material';
import { CardHeader } from '@mui/material';
import { addToCart } from '../../redux/features/cart/cart-slice';
import { generateOrder } from '../../services/order-service';
import { emptyCart } from '../../services/cart-service';
const StripeCheckoutComp = () => {
    const stripe=useStripe();
    const elements=useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret,setClientSecret]=useState("")
    const [total,setTotal]=useState(0)
    const [totalPayeable,setTotalPayeable]=useState(0)
    const {authUserToken}=useSelector(state=>state.user)
    // const [email,setEmail]=useState('')
    const dispatch=useDispatch();


    const handleSubmit=async (e)=>{
      e.preventDefault();
      setProcessing(true);

      const payload= await stripe.confirmCardPayment(clientSecret,{
        // receipt_email: email,
        payment_method:{
          card:elements.getElement(CardElement)
        }
      })

       if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {

      // make order 
      generateOrder(payload,authUserToken).then((res)=>{

        if(res.data.isOrderCreated==='ok'){
           //empty the localstorage
          if(typeof window !=='undefined') localStorage.removeItem('cart')
          //empty the redux
          dispatch(addToCart([]))
          dispatch(setCouponApply(false))
          //empty Database
          emptyCart(authUserToken)
          
          toast.success("Payment Successfull")
        }
      })
      .catch(err=>console.log("create order error"))
      
      
      
      dispatch(setOrderConfirm(false))
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      console.log("stripe payload",payload);
     
    }
  };

    
    const cartStyle = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: "Arial, sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };

    const handleChange=(event)=>{
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
      }
  

  const fetchPaymentIntent=()=>{
    getPaymentIntents(authUserToken).then((res)=>{
      const {total,totalPayeable,clientSecret}=res.data
      // console.log("payment intent response",res.data.clientSecret)
      setClientSecret(clientSecret)
      setTotal(total)
      setTotalPayeable(totalPayeable)
    }).catch(err=>{console.log('getPaymentIntents error',err.message)})
  }

  useEffect(()=>{
    fetchPaymentIntent()
  },[])

  return (
    <>
    <div className="text-center">
      <Card sx={{marginBottom:'30px'}}>
        <CardHeader
          title="Complete Your Order"
          />
        <CardContent sx={{display:'flex', flexDirection:'row',justifyContent:'space-around'}}>
            <span style={{width:'150px',fontFamily:'sans-serif'}}>
            <MonetizationOnOutlinedIcon style={{marginLeft:'15px'}} fontSize='small'/><br /> Total: ${total}
            </span>
            <span style={{width:'200px',fontFamily:'sans-serif'}} >
            <CheckCircleOutlineIcon fontSize='small'/><br /> Total Payeable: ${totalPayeable}
            </span>
        </CardContent>

      </Card>
    
      
    </div>

   
    <form id="payment-form" className='stripe-form' onSubmit={handleSubmit}>
      
      {/* <TextField 
        type="text"
        fullWidth
        variant='standard'
        sx={{marginBottom:'10px'}}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address For Reciept"
      /> */}
      <CardElement id='card-element ' 
        options={cartStyle}
        onChange={handleChange}
        />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
          className='stripe-button'
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
              )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      
      {/* Show a success message upon completion */}
       <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <Link
          to={'/user/dashboard/history'}
          // href={`https://dashboard.stripe.com/test/payments`}
          >
          {" "}
           History
        </Link> 
      </p>
    </form>
          </>
    
  )

      }
export default StripeCheckoutComp