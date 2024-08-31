import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetMeQuery } from '../redux/api/userApi';
import Loader from './layouts/Loader';
import { setUser } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Profile = () => {
  const [profileImg, setProfileImg] = useState(
    'https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-1024.png'
  );
  const [newName, setNewName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false); // State to manage visibility of the name input field
  const { data, isLoading, error } = useGetMeQuery();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && isAuthenticated) {
      dispatch(setUser(data));
      if (data.profileImg) {
        setProfileImg(data.profileImg);
      }
      setNewName(data.name || ''); // Initialize newName with current name
    }
    if (error) return <p>Error loading profile details: {error.message}</p>;
    if (isLoading) return <Loader />;
  }, [data, isAuthenticated, error, dispatch]);

  // Handle file upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
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
          dispatch(setUser({ ...data, profileImg: result.imageUrl }));
          Swal.fire({
            icon: 'success',
            title: 'Done!',
            text: 'Profile image changed',
            confirmButtonText: 'Ok'
          });
        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  // Handle name change
  const handleNameChange = async () => {
    if (!newName.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'No name provided',
        text: 'Please enter a new name before submitting.',
        confirmButtonText: 'Ok'
      });
      return;
    }

    try {
      const response = await fetch('/api/v1/username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(setUser({ ...data, name: result.name }));
        setIsEditingName(false); 
        Swal.fire({
          icon: 'success',
          title: 'Name Updated',
          text: 'Your username has been updated successfully.',
          confirmButtonText: 'Ok'
        })
          
         } else {
        console.error('Failed to update username');
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'There was an issue updating your username.',
          confirmButtonText: 'Ok'
        });
      }
    } catch (error) {
      console.error('Error updating username:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'There was an issue updating your username.',
        confirmButtonText: 'Ok'
      });
    }
  };
return (
    <div className='flex justify-center items-center bg-stone-400'>
      <div className='border gap-y-2 p-14 bg-white'>
        <div className='flex justify-center'>
          <h1 className='text-3xl font-bold mb-8 text-stone-500'>Your Profile:</h1>
        </div>
        <h6 className='font-bold my-4 text-stone-500' >
          Name:  {isEditingName? (
            <>
            <div className='flex items-center'> 
              <input
                type='text'
              
                onChange={(e) => setNewName(e.target.value)}
                className='border p-2 '
                placeholder='Enter new name'
              />
         
              <button
                onClick={handleNameChange}
                className='bg-green-500 p-2 text-white  border border-green-600 rounded flex'
              >
                Save Name
              </button>
              </div>
            
            </>
          ):( <> <span className='font-normal text-black me-10'> {data?.name  || 'N/A'} </span>
          <button
          onClick={() => setIsEditingName(true)} // Show the input field when button is clicked
          className='bg-stone-700 text-white p-2 border border-stone-800 rounded mb-4'
        >
          Change Name
        </button> 
        </>)}
          
         
        </h6>
       
        <h6 className='font-bold text-stone-500 mb-8'>
          Email: <span className='font-normal text-black'> {data?.email || 'N/A'} </span>
        </h6>
        <h6 className='font-bold my-4 text-stone-500'>
          Role: <span className='font-normal text-black'> {data?.role || 'N/A'} </span>
        </h6>
        
        <div className='flex justify-center my-6'>
          <h5 className='font-semibold text-gray-700' >
            Avatar: <img src={user?.avatar?.url ? 'http://localhost:3002/' + user?.avatar?.url : profileImg} alt="Profile" className='h-14 w-14 rounded-full ' />
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





