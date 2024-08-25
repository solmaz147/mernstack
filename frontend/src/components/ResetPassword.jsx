import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../redux/api/userApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const ResetPassword = () => {
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const { token } = useParams();
 const [resetPassword, { isLoading }] = useResetPasswordMutation();
 const navigate = useNavigate();


 const submitHandler = async (e) => {
   e.preventDefault();
   if (password !== confirmPassword) {
     toast.error(error?.data?.message || 'Passwords do not match');
     return;
   }


   try {
     await resetPassword({ token, body: { password, confirmPassword } }).unwrap();
     toast.success('Password reset successful');
     navigate('/login');
   } catch (error) {
     toast.error(error.data.message);
   }
 };


 return (
   <div className="flex justify-center items-center min-h-screen bg-stone-50">
     <div className="w-full max-w-md rounded-md">
       <form
         className="bg-white shadow-md rounded px-8 pt-6 pb-8 "
         onSubmit={submitHandler}
       >
         <h2 className="text-2xl mb-6 text-center text-orange-500 font-baskerville font-light">Reset Password</h2>
         <div className="mb-4">
           <label htmlFor="password_field" className="block text-slate-400 text-sm font-medium mb-2">
             New Password
           </label>
           <input
             type="password"
             id="password_field"
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             name="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />
         </div>
         <div className="mb-4">
           <label htmlFor="confirm_password_field" className="block text-slate-400 text-sm font-medium mb-2">
             Confirm Password
           </label>
           <input
             type="password"
             id="confirm_password_field"
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             name="confirmPassword"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             required
           />
         </div>
         <button
           type="submit"
           className="bg-orange-500 hover:bg-black text-white font-light py-2 px-4 border-2 border-grey-600 rounded focus:outline-none focus:shadow-outline w-full"
           disabled={isLoading}
         >
           {isLoading ? 'Resetting...' : 'Reset Password'}
         </button>
       </form>
     </div>
   </div>
 );
};


export default ResetPassword;
