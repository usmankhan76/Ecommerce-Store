import axios from "axios"

export const crateCouponInDb=async(coupon,authtoken)=>{
    const options={
        method:'POST',
        url:'http://localhost:8000/api/coupon',
        data:{coupon},
        headers:{authtoken}

    }
   return axios.request(options)
}

export const getCoupons=async()=>{
    const options={
        method:'GET',
        url:'http://localhost:8000/api/coupons',
    }
    return axios.request(options)
}


export const removeCoupon=async(couponId,authtoken)=>{
    const options={
        method:'DELETE',
        url:`http://localhost:8000/api/coupon/${couponId}`,
        headers:{authtoken}
    }
    return axios.request(options)
}

export const applyCouponOnTotal=async(coupon,authtoken)=>{
    const options={
        method:'POST',
        url:`http://localhost:8000/api/apply-coupon`,
        data:{coupon},
        headers:{authtoken}
    }
    return axios.request(options)
}
