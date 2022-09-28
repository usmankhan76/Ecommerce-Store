import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { auth } from "../../firebase"


const ProtectedRoute = ({children}) => {
  const{loginUser}=useSelector(state=>state.user)
 

    if(loginUser){
      // if(state){
        // return <Navigate to={state.goBack} />

      // }else{
        return  <Navigate to={'/'} />
      // }
    }  
   
    
  return  children    
  
}

export default ProtectedRoute