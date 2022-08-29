import axios from "axios";

export const craeteUpdateUser=async (authuser)=>{
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


export const getCurrentUser=async(authtoken)=>{
  
  const options = {
        method: 'POST',
        url: 'http://localhost:8000/api/current-user',
        headers: {authtoken}
  };

 return await axios.request(options);
}