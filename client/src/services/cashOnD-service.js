import axios from "axios"

export const createCashOrderInB=async(authtoken,COD)=>{
    const options={
        method:'POST',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/user/cash-order`,
        data:{COD},
        headers:{authtoken}

    }
   return axios.request(options)
}