const { default: axios } = require("axios")

export const getPaymentIntents=async(authtoken)=>{
     const options={
        method:'POST',
        url:"http://localhost:8000/api/stripe-payment-intenet",
        data:{amount:210},
        headers:{authtoken}
    }
    return axios.request(options)
}