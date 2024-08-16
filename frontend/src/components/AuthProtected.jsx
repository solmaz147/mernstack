import React from 'react'
import { Navigate } from 'react-router-dom' ;
import { useSelector } from 'react-redux';
import { useGetMeQuery } from '../redux/api/userApi';
import CircularProgress from '@mui/material/CircularProgress';

const AuthProtected = ({children}) => {
 const{data:user,isLoading } = useGetMeQuery()
 const isAuthenticated = useSelector(state=> state.auth.isAuthenticated)

 if(isLoading){
    return <div><CircularProgress/></div>
 }
if(isAuthenticated && user ){
    return <Navigate to="/" />
}






return children

  
}

export default AuthProtected