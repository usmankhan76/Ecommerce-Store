import { createSlice } from "@reduxjs/toolkit";



let initialState={
    loginUser:'',
    timeActive:false,
    loginUserToken:"",
    authUser:"",
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
            const {name,email,role,tokenId,id}=action.payload
            state.email=email
            state.name=name
            state.loginUserToken=tokenId
            state.role=role
            state.id=id

        }
           
    },
    // extraReducers:{
     
    // }
})


export const {setCurrentUser,setTimeActive,setlogingUserToken,setLogOut,setLoading,setUserCredientials}=userSlice.actions;
export default userSlice.reducer
