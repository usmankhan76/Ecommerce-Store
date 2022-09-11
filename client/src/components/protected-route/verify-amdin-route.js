import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const VerifyAdmin = ({children}) => {
  const{loginUser,loginUserTokenId,role}=useSelector(state=>state.user)
   return loginUser && loginUserTokenId && role==='admin' ?  children : <Navigate to={'/login'} />   
  
}

export default VerifyAdmin