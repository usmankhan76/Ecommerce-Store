import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user-slice"
import searchReducer from './features/search/search-slice'
import cartReducer from "./features/cart/cart-slice"
import drawerReducer from "./features/drawer/drawer.slice"
export const store=configureStore({
   reducer:{
    user:userReducer,
    search:searchReducer,
    cart:cartReducer,
    drawer:drawerReducer
   }

    
});

