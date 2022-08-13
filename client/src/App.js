import {Route,Routes} from "react-router-dom"
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Header from "./components/nav/Header";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setCurrentUser } from "./components/redux/features/user/user-slice";
import VerfiyEmail from "./pages/auth/verify-email";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const dispatch=useDispatch();
  const {password,user}=useSelector((state)=>state.user)
  
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
     dispatch(setCurrentUser(user));
    })
  },[])

  return (
    <>
    <Header/>
    <ToastContainer/>
    <Routes>
     <Route path='/' element={<Home/>}  />;
     <Route path='login' element={<Login/>} />;
     <Route path='signup' element={<Register/>} />;
     <Route path='verify-email' element={<VerfiyEmail/>} />;
      
    
    </Routes>
    </>
  );
}

export default App;
