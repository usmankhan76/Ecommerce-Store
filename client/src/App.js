import {Route,Routes, useNavigate} from "react-router-dom"
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
// import Header from "./components/nav/Header";
import Header from "./components/nav/Header-bots";
import { toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setCurrentUser, setlogingUserToken, setUserCredientials } from "./redux/features/user/user-slice";
import VerfiyEmail from "./pages/auth/verify-email";
import { useDispatch, useSelector } from "react-redux";
import ForgetPassword from "./pages/auth/forget-password";
import ProtectedRoute from "./components/protected-route/procted-route";
import { craeteUpdateUser } from "./services/auth-service";
import NonProtected from "./components/protected-route/protect-verifyEmail";
import UserDashboard from "./pages/user/user-dashboard";
import VerifiedUserToken from "./components/protected-route/verified-user-route";
import AdminDashboard from "./pages/admin/admin-dashboard";
import VerifyAdmin from "./components/protected-route/verify-amdin-route";
import UserProfile from "./pages/user/user-profile";
import UserWishlist from "./pages/user/user-wishlist";
import UserHistory from "./pages/user/user-history";
function App() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  function roleBasedRedirect(role){
    if(role==="admin"){
      navigate('/admin/dashboard')
    }else{
      navigate('/user/dashboard')
    }
  }
  const {loginUser}=useSelector(state=>state.user)
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user)=>{
      console.log("useEffect is chaling");
      if(user?.emailVerified){
        let name=user.displayName
          // user.reload();
       craeteUpdateUser(auth.currentUser,name).then((res)=>{
          console.log("response",res);
          const{name,email,role,tokenId,_id}=res.data
          dispatch(setUserCredientials({name,email,role,tokenId,_id}))
          dispatch(setCurrentUser(user))
          
            roleBasedRedirect(role)        
        }).catch(err=>toast.error(err)) 

      
      
      }
    })
    return()=>unsubscribe() 
  },[dispatch,auth,loginUser])

  return (
    <>
    <Header/>
    <ToastContainer autoClose={1500}/>
    <Routes>
     <Route path='/' element={<Home/>}  />;
     <Route path='login' element={
     <ProtectedRoute >

       <Login/>
     </ProtectedRoute>
     } />;
     <Route path='signup' element={
      <ProtectedRoute >
          <Register/>
     </ProtectedRoute>
    } 
     />;
     <Route path = 'verify-email' 
     element={
        <NonProtected> 
          <VerfiyEmail/>
        </NonProtected>
     } />;
     <Route path ='forget-password' element={
      <ProtectedRoute>
        <ForgetPassword/>
      </ProtectedRoute>
      } />;

     <Route path ='user/dashboard' element={
      <VerifiedUserToken>
        <UserDashboard/>
      </VerifiedUserToken>
      } />
        <Route path='/user/dashboard/history' element={<UserHistory/>}/>
        <Route path='/user/dashboard/wishlist' element={<UserWishlist/>}/>
        <Route path='/user/dashboard/profile' element={<UserProfile/>}/>
        
  
      <Route path ='admin/dashboard' element={
      <VerifyAdmin>
        <AdminDashboard/>
      </VerifyAdmin> 
      } />;
       
    
    </Routes>
    </>
  );
}

export default App;
