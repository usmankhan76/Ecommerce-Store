const { createSlice } = require("@reduxjs/toolkit");

let cashOnDSlice=createSlice({
    name:"CashOnD",
    initialState:false,
    reducers:{
        setCashOnD:(state,action)=>{
          return  state=action.payload
        }
    }
})

export const{setCashOnD}=cashOnDSlice.actions;
export default cashOnDSlice.reducer;
