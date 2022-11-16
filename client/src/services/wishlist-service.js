import axios from "axios"

export const addToWishlist=async(productId,authtoken)=>{
    const options={
        method:'POST',
        url:'http://localhost:8000/api/user/wishlist',
        data:{productId},
        headers:{authtoken}

    }
   return axios.request(options)
}

export const getWishlistFromB=async(authtoken)=>{
    const options={
        method:'GET',
        url:'http://localhost:8000/api/user/wishlist',
       headers:{authtoken}

    }
   return axios.request(options)
}

export const removeFromWishlist=async(productId,authtoken)=>{
    const options={
        method:'PUT',
        url:`http://localhost:8000/api/user/wishlist/${productId}`,
        data:{},
       headers:{authtoken}

    }
   return axios.request(options)
}
