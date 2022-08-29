
import { useSelector } from 'react-redux'
import {  useNavigate, } from 'react-router-dom'

const NonProtected = ({children}) => {
    const navigate=useNavigate()
  const{loginUser}=useSelector(state=>state.user)

    
 return   !loginUser?children :navigate('/')
}

export default NonProtected