import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user-slice"
import searchReducer from './features/search/search-slice'
export const store=configureStore({
   reducer:{
    user:userReducer,
    search:searchReducer
   }

    
});

