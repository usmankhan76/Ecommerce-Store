import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import './stripe-style.css'
import {Elements} from '@stripe/react-stripe-js'
import StripeCheckoutComp from '../../components/stripe-checkout/stripe-checkout-comp'


const stripePro=loadStripe('pk_test_51JiNDKJOFzTSTSSjQs3ywOJtqteWJhWFjPLzI7h1yxsWwoBgNv1xY7G98ltbp7kFczODfGVp5pkJxBud2hmNedrS00l5DaxDIH')
const PaymentPage = () => {
  

  return (
    <div className='container p-5 text-center'>
      {/* <h4>Complete You Order</h4> */}

        <Elements stripe={stripePro}>
            <div className="col-md-6 offset-md-3">
              
                <StripeCheckoutComp/>
            </div>
      </Elements>

  

    </div>
  )
}

export default PaymentPage