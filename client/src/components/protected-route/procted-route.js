import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { auth } from "../../firebase"


const ProtectedRoute = ({children}) => {
  const{loginUser}=useSelector(state=>state.user)
    if(loginUser){
      return <Navigate to={'/'} />
    }
    
  return  children    
  
}

export default ProtectedRoute