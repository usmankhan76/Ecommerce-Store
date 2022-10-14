
import { createSlice } from "@reduxjs/toolkit";

let initialState=[];

if(typeof window !== "undefined"){
    if(JSON.parse(localStorage.getItem('cart')) && JSON.parse(localStorage.getItem('cart')).length >0){
        initialState=JSON.parse(localStorage.getItem('cart'))
    }
}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            return state=action.payload
        }
    }
})

export const {addToCart}=cartSlice.actions
export default cartSlice.reducer