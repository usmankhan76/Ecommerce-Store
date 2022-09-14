import axios from "axios"

export const createProduct=async(product,authtoken)=>{
    const options={
        method: 'POST',
        url: 'http://localhost:8000/api/product',
        data: {product},
        headers:{
            authtoken,
        }
    }
    return axios.request(options)
} 