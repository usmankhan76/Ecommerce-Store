import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const VerifyAdmin = ({children}) => {
  const{loginUser,loginUserToken,role}=useSelector(state=>state.user)
   return loginUser && loginUserToken && role==='admin' ?  children : <Navigate to={'/login'} />   
  
}

export default VerifyAdmin