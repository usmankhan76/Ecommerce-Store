import axios from "axios"

export const getOrdersFromB=async(authtoken)=>{
    const options={
        method:'GET',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/admin/orders`,
        headers:{authtoken}

    }
   return axios.request(options)
}

export const updateOrderStatusInB=async(authtoken,orderId,orderStatus)=>{
    const options={
        method:'POST',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/admin/order-status`,
        data:{orderId,orderStatus},
        headers:{authtoken}

    }
   return axios.request(options)
}