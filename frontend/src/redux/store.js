import {configureStore} from '@reduxjs/toolkit'
import  userReducer  from "../redux/features/userSlice"
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import { productApi } from './api/productsApi'


export const store = configureStore({
    reducer:{
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