import {Route,Routes} from "react-router-dom"
import { lazy, useEffect } from "react";
import { auth } from "./firebase";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer} from 'react-toastify'
import { onAuthStateChanged } from "firebase/auth";
import { setAuthUserToken, setCurrentUser, setUserCredientials } from "./redux/features/user/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { craeteUpdateUser} from "./services/auth-service";
import { Suspense } from "react";




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




function App() {
  const dispatch=useDispatch();
  console.log("=================",process.env.NODE_ENV)
  // const navigate=useNavigate();

  const {loginUser}=useSelector(state=>state.user)

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user)=>{
      


      if(user?.emailVerified){
        let name=user.displayName

        

       craeteUpdateUser(auth.currentUser,name).then((res)=>{

          const{name,email,role,tokenId,_id}=res.data
          dispatch(setUserCredientials({name,email,role,tokenId,_id}))
          dispatch(setCurrentUser(user))
          dispatch(setAuthUserToken(user.accessToken))
 
        }).catch(err=>toast.error(err))

        
      
      
      }
    })
    return()=>unsubscribe() 
    // eslint-disable-next-line 
  },[loginUser])


      // "@react-pdf/renderer": "^3.0.1", this is the dependency version
      // "@david.kucsai/react-pdf-table": "^0.4.1",
      // "heroku-postbuild": "cd client && npm install && npm install --only=dev --no-shrinkwrap && npm run build", root directory script
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
