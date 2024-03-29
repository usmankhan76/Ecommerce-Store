import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user-slice"
import searchReducer from './features/search/search-slice'
import cartReducer from "./features/cart/cart-slice"
import drawerReducer from "./features/drawer/drawer.slice"
import couponReducer from "./features/coupon/coupon-slice"
import cashOnDReducer from "./features/cashOnDelivery/cashOnDelivery-slice"
export const store=configureStore({
   reducer:{
    user:userReducer,
    search:searchReducer,
    cart:cartReducer,
    drawer:drawerReducer,
    coupon:couponReducer,
    cashOnD:cashOnDReducer
   },
   middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['user/setCurrentUser','user/setAuthUserToken','user/setUserCredientials'],
            ignoredActionPaths: ['loginUser'],
            ignoredPaths: ['user.loginUser']
        }
    })

    
});

