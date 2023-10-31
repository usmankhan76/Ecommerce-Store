import axios from "axios"

export const getOrdersFromB=async(authtoken)=>{
    const options={
        method:'GET',
        url:`/api/admin/orders`,
        headers:{authtoken}

    }
   return axios.request(options)
}

export const updateOrderStatusInB=async(authtoken,orderId,orderStatus)=>{
    const options={
        method:'POST',
        url:`/api/admin/order-status`,
        data:{orderId,orderStatus},
        headers:{authtoken}

    }
   return axios.request(options)
}