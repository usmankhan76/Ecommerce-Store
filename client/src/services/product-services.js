import axios from "axios"

export const createProduct=async(product,authtoken)=>{
    const options={
        method: 'POST',
        url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/product`,
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
        url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/products/${count}`,

        
       
    }
    return axios.request(options)
} 
export const getProduct=async(slug)=>{
    const options={
        method: 'GET',
        url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/product/${slug}`,
        
       
    }
    return axios.request(options)
} 

export const removeProduct=async(slug,authtoken)=>{
    const options={
        method: 'DELETE',
        url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/product/${slug}`,
         headers:{
            authtoken,
        }
       
    }
    return axios.request(options)
} 


export const updateProduct=async(slug,product,authtoken)=>{
    const options={
        method: 'PUT',
        url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/product/${slug}`,
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
        url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/products`,
        data: {sort,order,page},
        
    }
    return axios.request(options)
} 
export const getProductsCounting=async()=>{
    const options={
        method: 'GET',
        url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/products/total`,
       
        
    }
    return axios.request(options)
} 

export const productStars=async(productId,stars,authtoken)=>{
    
    const options={
        method: 'PUT',
        url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/product/stars/${productId}`,
        data:{stars},
        headers:{authtoken}
        
    }
    return axios.request(options)
} 

export const getListRelatedProducts=async(productId)=>{
    
    const options={
        method: 'GET',
        url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/product/related/${productId}`,
        
        
    }
    return axios.request(options)
}

export const getProductsFromSearch=async(query)=>{
 
    console.log("query",query);
    const options = {
        method: 'POST',
        url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/product/search/filter`,
        data: {query}
    };

   return axios.request(options);
}