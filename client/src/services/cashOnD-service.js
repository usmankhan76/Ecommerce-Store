import axios from "axios"

export const createCashOrderInB=async(authtoken,COD)=>{
    const options={
        method:'POST',
        url:'http://localhost:8000/api/user/cash-order',
        data:{COD},
        headers:{authtoken}

    }
   return axios.request(options)
}