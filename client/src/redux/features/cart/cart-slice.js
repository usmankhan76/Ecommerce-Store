
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
            console.log("this is the cart item new",action.payload)
       
            return state=action.payload
        },

         addToCartFromDb:(state,action)=>{
              
            return state=state.concat(action.payload);
        },
        emptyCartStatate:(state,action)=>{
            return state=action.payload;
        },
    }
})

export const {addToCart,emptyCartStatate,addToCartFromDb}=cartSlice.actions
export default cartSlice.reducer