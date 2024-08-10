import React from 'react'
import { Navigate } from 'react-router-dom' ;
import { useSelector } from 'react-redux';
import { useGetMeQuery } from '../redux/api/userApi';

const AuthProtected = ({children}) => {
 const{data:user,isLoading } = useGetMeQuery()
 const isAuthenticated = useSelector(state=> state.auth.isAuthenticated)

 if(isLoading){
    return <div>is Loading....</div>
 }
if(isAuthenticated|| user ){
    return <Navigate to="/" />
}

return children

  
}

export default AuthProtected