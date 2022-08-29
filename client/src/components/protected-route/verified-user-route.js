import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const VerifiedUserToken = ({children}) => {
  const{loginUser,loginUserToken}=useSelector(state=>state.user)
   return loginUser && loginUserToken ? children : <Navigate to={'/login'} />   
  
}

export default VerifiedUserToken