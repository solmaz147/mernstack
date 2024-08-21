import React , {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useGetMeQuery} from '../redux/api/userApi';
import Loader from './layouts/Loader';
import { setUser } from '../redux/features/userSlice';


const Profile = () => {

const [profileImg,setProfileImg] = useState('https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-1024.png')   
const {data, isLoading, error} = useGetMeQuery();
const {user,isAuthenticated} = useSelector((state)=> state.auth)
const dispatch = useDispatch();



useEffect(() => {
    if (user && isAuthenticated) {
      dispatch(setUser(data));
     console.log(data)

    }
    if (error) return <p>Error loading product details: {error.message}</p>;
    if (isLoading) return <Loader/>

  }, [user, isAuthenticated, isLoading, error,dispatch]);


  return (
    <div className='flex justify-center items-center mt-10'>
      <div className='border gap-y-2 p-4'>
       <div className='flex justify-center'><h1 className='text-3xl font-bold mb-8 text-pink-700'>Your Profile:</h1></div> 
        <h6 className='font-bold my-4'> Name: <span className='font-normal'> {data?.name || 'N/A'} </span> </h6>
        <h6 className='font-bold'> Email: <span className='font-normal'> {data?.email || 'N/A'} </span></h6>
        <h6 className='font-bold my-4'> Role: <span className='font-normal'> {data?.role || 'N/A'} </span></h6>
        <h6 className='font-bold'> ID: <span className='font-normal'> {data?._id || 'N/A'} </span></h6>
        <div className='flex justify-center my-6'>
            <h5 className='font-bold '>Avatar: <img src={profileImg} alt="" className='h-14'/> </h5>
            
        </div>
      </div>
    </div>
  )
}

export default Profile
