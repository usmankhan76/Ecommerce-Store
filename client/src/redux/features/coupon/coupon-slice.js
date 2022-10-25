const { createSlice } = require("@reduxjs/toolkit");

let initialState={
    couponIsApplied:false,
    orderConfirmed:false
}
const couponSlice=createSlice({
    name:'couponSl',
    initialState,
    reducers:{
    setCouponApply:(state,action)=>{
            console.log('check payload',action.payload)
            return state={...state,couponIsApplied:action.payload}
        },
    
    setOrderConfirm:(state,action)=>{
            return state={...state,orderConfirmed:action.payload}
        }

    }
})

export const {setCouponApply,setOrderConfirm}=couponSlice.actions

export default couponSlice.reducer 