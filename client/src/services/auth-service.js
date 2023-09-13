// eslint-disable-next-line
import React from "react";
import axios from "axios";



export const craeteUpdateUser=async (authuser)=>{

  const authtoken=authuser.accessToken
  
  const name=authuser.displayName
  const {photoURL}=authuser.providerData[0];
 
  const options = {
    method: 'POST',
    url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/create-update-user`,
    headers: {authtoken,name,photoURL}
  };

 return await axios.request(options);
}


export const GetCurrentUser=async(authtoken)=>{
  const options = {
        method: 'POST',
        url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/current-user`,
        headers: {authtoken}
  };
 return   axios.request(options)
}