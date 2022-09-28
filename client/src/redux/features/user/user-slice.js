import { createSlice } from "@reduxjs/toolkit";



let initialState={
    loginUser:'',
    timeActive:false,
    loginUserTokenId:"",
    authUserToken:"",
    loading:false,
    name:'',
    email:'',
    role:'',
    id:'',
  
}



const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setCurrentUser:(state,action)=>{state.loginUser=action.payload},
        setTimeActive:(state,action)=>{state.timeActive=action.payload},
        setlogingUserToken:(state,action)=>{state.loginUserToken=action.payload},
        setLogOut:(state,action)=>{
            state.loginUser="";
            state.loginUserToken=""
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setUserCredientials:(state,action)=>{
            const {name,email,role,tokenId,_id}=action.payload
            state.email=email
            state.name=name
            state.loginUserTokenId=tokenId
            state.role=role
            state.id=_id

        },
        setAuthUserToken:(state,action)=>{
            state.authUserToken=action.payload

        }
           
    },
    // extraReducers:{
     
    // }
})


export const {setCurrentUser,setTimeActive,setlogingUserToken,setLogOut,setLoading,setUserCredientials,setAuthUserToken}=userSlice.actions;
export default userSlice.reducer
