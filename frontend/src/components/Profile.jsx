import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetMeQuery } from '../redux/api/userApi';
import Loader from './layouts/Loader';
import { setUser } from '../redux/features/userSlice';

const Profile = () => {
  const [profileImg, setProfileImg] = useState(
    'https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-1024.png'
  );
  const { data, isLoading, error } = useGetMeQuery();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && isAuthenticated) {
      dispatch(setUser(data));
      console.log(data);
      if (data.profileImg) {
        setProfileImg(data.profileImg);
      }
    }
    if (error) return <p>Error loading product details: {error.message}</p>;
    if (isLoading) return <Loader />;
  }, [data, isAuthenticated, error, dispatch]);

  // Handle file upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Example: Upload file to a server or cloud storage
      const formData = new FormData();
      formData.append('profileImage', file);

      try {
        const response = await fetch('/api/v1/avatar', {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setProfileImg("http://localhost:3002/" + result.imageUrl); // Assuming the server returns the new image URL
          // Optionally, update the user profile with the new image URL
          dispatch(setUser({ ...data, profileImg: result.imageUrl }));
        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className='flex justify-center items-center mt-10'>
      <div className='border gap-y-2 p-4'>
        <div className='flex justify-center'>
          <h1 className='text-3xl font-bold mb-8 text-pink-700'>Your Profile:</h1>
        </div>
        <h6 className='font-bold my-4'>
          Name: <span className='font-normal'> {data?.name || 'N/A'} </span>
        </h6>
        <h6 className='font-bold'>
          Email: <span className='font-normal'> {data?.email || 'N/A'} </span>
        </h6>
        <h6 className='font-bold my-4'>
          Role: <span className='font-normal'> {data?.role || 'N/A'} </span>
        </h6>
        <h6 className='font-bold'>
          ID: <span className='font-normal'> {data?._id || 'N/A'} </span>
        </h6>
        <div className='flex justify-center my-6'>
          <h5 className='font-bold'>
            Avatar: <img src={user?.avatar?.url ? 'http://localhost:3002/' + user?.avatar?.url  : profileImg} alt="Profile" className='h-14' />
          </h5>
        </div>
        <div className='flex flex-col justify-center'>
          <input 
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='border p-2 mb-4'
          />
     </div>
      </div>
    </div>
  );
};

export default Profile;


