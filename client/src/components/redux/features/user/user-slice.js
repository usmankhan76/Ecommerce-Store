import {  createSlice } from "@reduxjs/toolkit";


let initialState={
    loginUser:'',
    timeActive:false,
    password:'',
    email:''
  
}
// export const userVerificationFlow=createAsyncThunk('/user/verifyEmail', async(props,thunkApi)=>{
//     console.log('props',props);
//     const {email,password}=props
//     let user=await createUserWithEmailAndPassword(auth,email,password)
//             return user
// })


const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setCurrentUser:(state,action)=>{state.loginUser=action.payload},
        setTimeActive:(state,action)=>{state.timeActive=action.payload},
        // setTimeActive:(state,action)=>{return console.log("type",state);},   
    },
    // extraReducers:{
    //    [userVerificationFlow.pending]:state=>{toast.info("please wait")}, 
    //    [userVerificationFlow.fulfilled]:(state,action)=>{
    //     state.loginUser=action.payload
    //    }, 
    //    [userVerificationFlow.rejected]:(state,action)=>{toast.error("USer Error")} 
    // }
})


export const {setCurrentUser,setTimeActive}=userSlice.actions;
export default userSlice.reducer
