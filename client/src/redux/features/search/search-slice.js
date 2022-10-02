const { createSlice } = require("@reduxjs/toolkit")



const initialState={text:''}

const searchSlice=createSlice({
    name:"Search",
    initialState,
    reducers:{
        setSearchQuery:(state,action)=>{
            state.text=action.payload
        },
    }

})

export const{setSearchQuery}=searchSlice.actions
export default searchSlice.reducer