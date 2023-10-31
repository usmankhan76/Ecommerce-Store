import axios from "axios"

export const crateCouponInDb=async(coupon,authtoken)=>{
    const options={
        method:'POST',
        url:`/api/coupon`,
        data:{coupon},
        headers:{authtoken}

    }
   return axios.request(options)
}

export const getCoupons=async()=>{
    const options={
        method:'GET',
        url:`/api/coupons`,
    }
    return axios.request(options)
}


export const removeCoupon=async(couponId,authtoken)=>{
    const options={
        method:'DELETE',
        url:`/api/coupon/${couponId}`,
        headers:{authtoken}
    }
    return axios.request(options)
}

export const applyCouponOnTotal=async(coupon,authtoken)=>{
    const options={
        method:'POST',
        url:`/api/apply-coupon`,
        data:{coupon},
        headers:{authtoken}
    }
    return axios.request(options)
}
