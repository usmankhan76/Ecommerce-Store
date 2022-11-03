import axios from "axios"

export const generateOrder=async(stripeResponse,authtoken)=>{
    const options={
        method:'POST',
        url:'http://localhost:8000/api/user/order',
        data:{stripeResponse},
        headers:{authtoken}

    }
   return axios.request(options)
}