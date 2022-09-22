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
export const getProductsbyCount=async(count)=>{
    const options={
        method: 'GET',
        url: `http://localhost:8000/api/products/${count}`,
        
       
    }
    return axios.request(options)
} 
export const getProduct=async(slug)=>{
    const options={
        method: 'GET',
        url: `http://localhost:8000/api/product/${slug}`,
        
       
    }
    return axios.request(options)
} 

export const removeProduct=async(slug,authtoken)=>{
    const options={
        method: 'DELETE',
        url: `http://localhost:8000/api/product/${slug}`,
         headers:{
            authtoken,
        }
       
    }
    return axios.request(options)
} 


export const updateProduct=async(slug,product,authtoken)=>{
    const options={
        method: 'PUT',
        url: `http://localhost:8000/api/product/${slug}`,
        data: {product},
        headers:{
            authtoken,
        }
    }
    return axios.request(options)
} 
export const getProducts=async(sort,order,page)=>{
    const options={
        method: 'POST',
        url: `http://localhost:8000/api/products`,
        data: {sort,order,page},
        
    }
    return axios.request(options)
} 
export const getProductsCounting=async()=>{
    const options={
        method: 'GET',
        url: `http://localhost:8000/api/products/total`,
       
        
    }
    return axios.request(options)
} 