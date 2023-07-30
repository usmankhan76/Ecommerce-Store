import {Route,Routes, useNavigate} from "react-router-dom"
import { lazy, useEffect, useState } from "react";
import { auth } from "./firebase";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer} from 'react-toastify'
import { onAuthStateChanged } from "firebase/auth";
import { setAuthUserToken, setCurrentUser, setUserCredientials } from "./redux/features/user/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { craeteUpdateUser, GetCurrentUser } from "./services/auth-service";
import { Suspense } from "react";



// import Home from './pages/home';
// import Login from './pages/auth/login';
// import Header from "./components/nav/Header-bots";
// import Register from './pages/auth/register';
// import VerfiyEmail from "./pages/auth/verify-email";
// import ForgetPassword from "./pages/auth/forget-password";
// import ProtectedRoute from "./components/protected-route/procted-route";
// import NonProtected from "./components/protected-route/protect-verifyEmail";
// import UserDashboard from "./pages/user/user-dashboard";
// import VerifiedUserToken from "./components/protected-route/verified-user-route";
// import AdminDashboard from "./pages/admin/admin-dashboard";
// import VerifyAdmin from "./components/protected-route/verify-amdin-route";
// import UserProfile from "./pages/user/user-profile";
// import UserWishlist from "./pages/user/user-wishlist";
// import UserHistory from "./pages/user/user-history";
// import CreateCategory from "./pages/admin/categories/create-category";
// import UpdateCategoryItem from "./pages/admin/categories/update-category";
// import CreateSubCategory from "./pages/admin/sub-categories/create-sub-category";
// import UpdateSubCategoryItem from "./pages/admin/sub-categories/update-sub-category";
// import CreateProduct from "./pages/admin/product/create-product";
// import AllProducts from "./pages/admin/product/all-products";
// import UpdateProduct from "./pages/admin/product/update-product";
// import ViewProduct from "./pages/view-product";
// import CategoryHome from "./pages/category/category-home";
// import SubCategoryHome from "./pages/sub-category/sub-category-home";
// import ShopPage from "./pages/shop";
// import CartPage from "./pages/cart";
// import SideDrawer from "./components/side-drawer/side-drawer";
// import CheckoutPage from "./pages/checkout";
// import CouponPage from "./pages/admin/coupon/coupon-page";
// import PaymentPage from "./pages/payment/payment";


// with react lazy

const LoadingSipner= lazy(()=>import("./components/spin/spin")) ;
const Home =lazy(()=>import('./pages/home')) ;
const Login =lazy(()=>import('./pages/auth/login')) ;
const Header =lazy(()=>import("./components/nav/Header-bots")) ;
const Register =lazy(()=>import('./pages/auth/register')) ;
const VerfiyEmail =lazy(()=>import("./pages/auth/verify-email")) ;
const ForgetPassword =lazy(()=>import( "./pages/auth/forget-password"));
const ProtectedRoute =lazy(()=>import("./components/protected-route/procted-route")) ;
const NonProtected =lazy(()=>import("./components/protected-route/protect-verifyEmail")) ;
const UserDashboard =lazy(()=>import("./pages/user/user-dashboard")) ;
const VerifiedUserToken =lazy(()=>import("./components/protected-route/verified-user-route")) ;
const AdminDashboard =lazy(()=>import( "./pages/admin/admin-dashboard"));
const VerifyAdmin =lazy(()=>import("./components/protected-route/verify-amdin-route")) ;
const UserProfile =lazy(()=>import("./pages/user/user-profile")) ;
const UserWishlist =lazy(()=>import("./pages/user/user-wishlist")) ;
const UserHistory =lazy(()=>import("./pages/user/user-history")) ;
const CreateCategory =lazy(()=>import( "./pages/admin/categories/create-category"));
const UpdateCategoryItem =lazy(()=>import("./pages/admin/categories/update-category")) ;
const CreateSubCategory =lazy(()=>import( "./pages/admin/sub-categories/create-sub-category"));
const UpdateSubCategoryItem =lazy(()=>import( "./pages/admin/sub-categories/update-sub-category"));
const CreateProduct =lazy(()=>import("./pages/admin/product/create-product")) ;
const AllProducts =lazy(()=>import("./pages/admin/product/all-products")) ;
const UpdateProduct =lazy(()=>import( "./pages/admin/product/update-product"));
const ViewProduct =lazy(()=>import("./pages/view-product")) ;
const CategoryHome =lazy(()=>import("./pages/category/category-home")) ;
const SubCategoryHome =lazy(()=>import("./pages/sub-category/sub-category-home")) ;
const ShopPage =lazy(()=>import("./pages/shop")) ;
const CartPage =lazy(()=>import("./pages/cart")) ;
const SideDrawer =lazy(()=>import("./components/side-drawer/side-drawer")) ;
const CheckoutPage =lazy(()=>import("./pages/checkout")) ;
const CouponPage =lazy(()=>import( "./pages/admin/coupon/coupon-page"));
const PaymentPage =lazy(()=>import("./pages/payment/payment")) ;



// import PaymentPage from "./pages/payment";
function App() {
  const dispatch=useDispatch();
  // const navigate=useNavigate();

  const {loginUser,authUserToken}=useSelector(state=>state.user)
  // function roleBasedRedirect(role){
  //   if(role==="admin"){
  //     navigate('/admin/dashboard')
  //   }else{
  //     navigate('/user/dashboard')
  //   }
  // }

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user)=>{
      // console.log("useEffect is chaling",user);
      


      if(user?.emailVerified){
        let name=user.displayName
          // user.reload();
        

       craeteUpdateUser(auth.currentUser,name).then((res)=>{
          console.log("response in app",res.data);
          console.log("response in of user",user);
          const{name,email,role,tokenId,_id}=res.data
          dispatch(setUserCredientials({name,email,role,tokenId,_id}))
          // dispatch(setCurrentUser(user))
          // dispatch(setCurrentUser(JSON.stringify(user)))
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
  },[loginUser])

    // useEffect(() => {
    //     getUserCart(authUserToken).then(res=>{
    //     const{products}=res.data;
    //     dispatch(addToCart(products.product))
    //     console.log("___________CART AFter LOGIN",res.data.products)

    //   }).catch(err=>console.log('getCart error',err.message))
    // }, [authUserToken,loginUser])
    

  // useEffect(()=>{
  //    getUserCart(authUserToken).then(res=>{
  //       const{products}=res.data;
  //       console.log("___________CART AFter LOGIN First",res.data)
  //       dispatch(addToCart(products.product))
  //       console.log("___________CART AFter LOGIN",products.product)


  //     }).catch(err=>console.log('getCart error',err.message))
  // },[authUserToken])

  return (
    <>
    <Header/>
    <SideDrawer/>
    <ToastContainer autoClose={1500}/>
      <Suspense fallback={<LoadingSipner/>}>
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
      </Suspense>
    </>
  );
}

export default App;
