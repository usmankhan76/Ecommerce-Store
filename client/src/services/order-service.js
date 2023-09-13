import axios from "axios"

export const generateOrder=async(stripeResponse,authtoken)=>{
    const options={
        method:'POST',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/user/order`,
        data:{stripeResponse},
        headers:{authtoken}

    }
   return axios.request(options)
}

export const getUserOrders=async(authtoken)=>{
    const options={
        method:'GET',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/user/orders`,
       headers:{authtoken}

    }
   return axios.request(options)
}