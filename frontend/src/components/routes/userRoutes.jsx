import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '../auth/PrivateRoute'
import Home from '../Home'
import Login from '../Login'
import Register from '../Register'
import ForgotPassword from '../ForgotPassword'
import ResetPassword from '../ResetPassword'
import ProductDetails from '../ProductDetails'
import Profile from '../Profile'


const userRoutes = () => {
  return (
<>
<Route element={<PrivateRoute/>}>
<Route  path='/'  element={<Home/>}   />
<Route  path='/products/:id'  element={<ProductDetails/>} />
<Route path='/me' element={<Profile/>} />


</Route>
<Route path='/login'  element={<Login/>}/>
<Route path='/register'  element={<Register/>}/>
<Route path='/forget/password'  element={<ForgotPassword/>}/>
<Route path='/password/reset/:token'  element={<ResetPassword/>}/>




</>
 )
}

export default userRoutes;