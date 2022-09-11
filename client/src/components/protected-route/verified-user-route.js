import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const VerifiedUserToken = ({children}) => {
  const{loginUser,loginUserTokenId}=useSelector(state=>state.user)
   return loginUser && loginUserTokenId ? children : <Navigate to={'/login'} />   
  
}

export default VerifiedUserToken