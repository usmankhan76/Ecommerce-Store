import axios from "axios"

export const crateCouponInDb=async(coupon,authtoken)=>{
    const options={
        method:'POST',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/coupon`,
        data:{coupon},
        headers:{authtoken}

    }
   return axios.request(options)
}

export const getCoupons=async()=>{
    const options={
        method:'GET',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/coupons`,
    }
    return axios.request(options)
}


export const removeCoupon=async(couponId,authtoken)=>{
    const options={
        method:'DELETE',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/coupon/${couponId}`,
        headers:{authtoken}
    }
    return axios.request(options)
}

export const applyCouponOnTotal=async(coupon,authtoken)=>{
    const options={
        method:'POST',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/apply-coupon`,
        data:{coupon},
        headers:{authtoken}
    }
    return axios.request(options)
}
