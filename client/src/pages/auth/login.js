import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setTimeActive } from '../../components/redux/features/user/user-slice';

const Login = () => {
  const navigate=useNavigate();

  const dispatch=useDispatch();
  const handleOn=()=>{
    // dispatch(setTimeActive(true))
    return navigate('/verify-email')
  }
  return (
    <div>Login
      <button onClick={()=>handleOn()}>Email </button>
    </div>
  )
}

export default Login