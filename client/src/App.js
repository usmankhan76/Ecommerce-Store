import {Route,Routes, useNavigate} from "react-router-dom"
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
// import Header from "./components/nav/Header";
import Header from "./components/nav/Header-bots";
import { toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setAuthUserToken, setCurrentUser, setUserCredientials } from "./redux/features/user/user-slice";
import VerfiyEmail from "./pages/auth/verify-email";
import { useDispatch, useSelector } from "react-redux";
import ForgetPassword from "./pages/auth/forget-password";
import ProtectedRoute from "./components/protected-route/procted-route";
import { craeteUpdateUser, GetCurrentUser } from "./services/auth-service";
import NonProtected from "./components/protected-route/protect-verifyEmail";
import UserDashboard from "./pages/user/user-dashboard";
import VerifiedUserToken from "./components/protected-route/verified-user-route";
import AdminDashboard from "./pages/admin/admin-dashboard";
import VerifyAdmin from "./components/protected-route/verify-amdin-route";
import UserProfile from "./pages/user/user-profile";
import UserWishlist from "./pages/user/user-wishlist";
import UserHistory from "./pages/user/user-history";
import CreateCategory from "./pages/admin/categories/create-category";
import UpdateCategoryItem from "./pages/admin/categories/update-category";
import CreateSubCategory from "./pages/admin/sub-categories/create-sub-category";
import UpdateSubCategoryItem from "./pages/admin/sub-categories/update-sub-category";
import CreateProduct from "./pages/admin/product/create-product";
import AllProducts from "./pages/admin/product/all-products";
import UpdateProduct from "./pages/admin/product/update-product";
import ViewProduct from "./pages/view-product";
import CategoryHome from "./pages/category/category-home";
import SubCategoryHome from "./pages/sub-category/sub-category-home";
import ShopPage from "./pages/shop";
import CartPage from "./pages/cart";
import SideDrawer from "./components/side-drawer/side-drawer";
import CheckoutPage from "./pages/checkout";
import CouponPage from "./pages/admin/coupon/coupon-page";
import PaymentPage from "./pages/payment/payment";
// import PaymentPage from "./pages/payment";
function App() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {loginUser,authUserToken}=useSelector(state=>state.user)

  function roleBasedRedirect(role){
    if(role==="admin"){
      navigate('/admin/dashboard')
    }else{
      navigate('/user/dashboard')
    }
  }

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user)=>{
      console.log("useEffect is chaling",user);
      if(user?.emailVerified){
        let name=user.displayName
          // user.reload();
        

       craeteUpdateUser(auth.currentUser,name).then((res)=>{
          console.log("response in app",res);
          const{name,email,role,tokenId,_id}=res.data
          dispatch(setUserCredientials({name,email,role,tokenId,_id}))
          dispatch(setCurrentUser(user))
          dispatch(setAuthUserToken(user.accessToken))

          
          //  roleBasedRedirect(role)        
        }).catch(err=>toast.error(err))
        
        // GetCurrentUser(authUserToken).then((res)=>{
        //  console.log("get current user Response",res);
        //   const{name,email,role,tokenId,_id}=res.data
        //   dispatch(setUserCredientials({name,email,role,tokenId,_id}))
        //   dispatch(setCurrentUser(user))
        //   dispatch(setAuthUserToken(user.accessToken))
        
        // }).catch((err)=>{console.log(err.message)})
        
        
      
      
      }
    })
    return()=>unsubscribe() 
  },[loginUser,])

  return (
    <>
    <Header/>
    <SideDrawer/>
    <ToastContainer autoClose={1500}/>
    <Routes>
      <Route path='/' element={<Home/>}  />;
      <Route path='/shop' element={<ShopPage/>}  />;
      <Route path='/cart' element={<CartPage/>}  />;
      <Route 
          path='/checkout' 
          element={<VerifiedUserToken> <CheckoutPage/> </VerifiedUserToken>} />;
        <Route 
          path='/payment' 
          element={<VerifiedUserToken> <PaymentPage/> </VerifiedUserToken>} />;
      <Route 
          path='login' 
          element={<ProtectedRoute > <Login/> </ProtectedRoute>} />;

      <Route 
        path='signup' 
        element={<ProtectedRoute > <Register/>  </ProtectedRoute>} 
      />;
        

      <Route path = 'verify-email' 
        element={
            <NonProtected> 
              <VerfiyEmail/>
            </NonProtected>} 
      />;

      <Route path ='forget-password' element={
          <ProtectedRoute>
            <ForgetPassword/>
          </ProtectedRoute>
          } />;

      <Route path ='user/dashboard' element={<VerifiedUserToken> <UserDashboard/> </VerifiedUserToken>} />
      <Route path='/user/dashboard/history' element={<UserHistory/>}/>
      <Route path='/user/dashboard/wishlist' element={<UserWishlist/>}/>
      <Route path='/user/dashboard/profile' element={<UserProfile/>}/>
        
  
      <Route 
            path ='admin/dashboard' 
            element={<VerifyAdmin> <AdminDashboard/> </VerifyAdmin> } 
      />;

      <Route 
            path ='/admin/dashboard/category' 
            element={<VerifyAdmin> <CreateCategory/> </VerifyAdmin> }
      />; 
            
       <Route path ='/admin/dashboard/sub-category' 
            element={ <VerifyAdmin> <CreateSubCategory/> </VerifyAdmin> }
      />; 

      <Route 
            path ='/admin/catergory/:slug' 
            element={<VerifyAdmin><UpdateCategoryItem/> </VerifyAdmin> }/>;

      <Route 
            path ='/admin/sub-catergory/:slug' 
            element={<VerifyAdmin><UpdateSubCategoryItem/> </VerifyAdmin> }/>; 

       <Route path ='/admin/dashboard/product' element={<VerifyAdmin> <CreateProduct/> </VerifyAdmin> }/>; 
      <Route 
            path ='/admin/dashboard/products' 
            element={<VerifyAdmin> <AllProducts/> </VerifyAdmin> }
      />; 
      <Route 
            path ='/admin/dashboard/product/:slug' 
            element={<VerifyAdmin> <UpdateProduct/> </VerifyAdmin> }
      />;

      <Route 
          path ='/admin/dashboard/coupons' 
          element={<VerifyAdmin> <CouponPage/> </VerifyAdmin> }
      />;
      

      <Route path ='product/:slug' element={ <ViewProduct/>  }/>;             
      <Route path ='category/:slug' element={ <CategoryHome/>  }/>;             
      <Route path ='sub-category/:slug' element={ <SubCategoryHome/>  }/>;             


    
    </Routes>
    </>
  );
}

export default App;
