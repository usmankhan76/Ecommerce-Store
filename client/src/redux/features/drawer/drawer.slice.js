import { createSlice } from "@reduxjs/toolkit";

const drawerSlice=createSlice({
    name:'drawer',
    initialState:false,
    reducers:{
        showDarwer:(state,action)=>{
            return state=action.payload
        }
    }
})

export const {showDarwer}=drawerSlice.actions
export default drawerSlice.reducer