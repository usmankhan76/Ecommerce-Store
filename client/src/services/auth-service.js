import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { setAuthUserToken } from "../redux/features/user/user-slice";


export const craeteUpdateUser=async (authuser)=>{
  console.log("service user",authuser)

//   await auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
//       const authtoken=idToken
  
//   const name=authuser.displayName
//   const {photoURL}=authuser.providerData[0];
//   // console.log("service",props);
//   const options = {
//     method: 'POST',
//     url: 'http://localhost:8000/api/create-update-user',
//     headers: {authtoken,name,photoURL}
//   };

//    return axios.request(options);      
  
// }).catch(function(error) {
//   // Handle error
// });
  const authtoken=authuser.accessToken
  
  const name=authuser.displayName
  const {photoURL}=authuser.providerData[0];
  // console.log("service",props);
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/api/create-update-user',
    headers: {authtoken,name,photoURL}
  };

 return await axios.request(options);
}


export const GetCurrentUser=async()=>{
  

  await auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    // dispatch(setAuthUserToken(idToken))
    console.log("current id token",idToken)
  // Send token to your backend via HTTPS
  const options = {
        method: 'POST',
        url: 'http://localhost:8000/api/current-user',
        headers: {authtoken:idToken}
  };
 return   axios.request(options)
  // ...
}).catch(function(error) {
  // Handle error
  console.log(error)
});
  

//  return await axios.request(options);
}