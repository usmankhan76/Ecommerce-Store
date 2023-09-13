import axios from "axios"

export const saveCartToDb=async(cart,authtoken)=>{
    const options={
        method:'POST',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/user/cart`,
        data:{cart},
        headers:{authtoken}

    }
   return axios.request(options)
}

export const getUserCart=async(authtoken)=>{
    const options={
        method:'GET',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/user/cart`,
        headers:{authtoken}
    }
    return axios.request(options)
}


export const emptyCart=async(authtoken)=>{
    const options={
        method:'DELETE',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/user/cart`,
        headers:{authtoken}
    }
    return axios.request(options)
}

export const saveUserAddress=async(cartAddress,authtoken)=>{
    const options={
        method:'POST',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/user/address`,
        data:{cartAddress},
        headers:{authtoken}

    }
   return axios.request(options)
}