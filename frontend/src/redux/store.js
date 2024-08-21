import {configureStore} from '@reduxjs/toolkit'
import  userReducer  from "../redux/features/userSlice"
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import { productApi } from './api/productsApi'
import cartReducer from './features/cartSlice'


export const store = configureStore({

   
    reducer:{
        cart:cartReducer,
        auth: userReducer,
        [authApi.reducerPath]:authApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [productApi.reducerPath]:productApi.reducer
    },

    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat([
        authApi.middleware,
        productApi.middleware,
        userApi.middleware,
    ])
})