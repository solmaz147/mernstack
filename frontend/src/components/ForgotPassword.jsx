import React, { useState, useEffect } from 'react';
import { useForgotPasswordMutation } from '../redux/api/userApi';
import toast from 'react-hot-toast';


const ForgotPassword = () => {
 const [email, setEmail] = useState('');
 const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation();


 useEffect(() => {
   if (error) {
     toast.error(error?.data?.message);
   }
   if (isSuccess) {
     toast.success('Email Sent. Please check your inbox');
   }
 }, [error, isSuccess]);


 const submitHandler = (e) => {
   e.preventDefault();
   forgotPassword({ email });
 };


 return (
  <div className="flex items-center justify-center">
  <div className="w-full max-w-md  p-8 mt-16 bg-white shadow   rounded-md">
    <form onSubmit={submitHandler} className="space-y-6">
      <h2 className="text-2xl text-center text-orange-500 font-sans font-light">Forgot Password?</h2>
      <div>
        <label htmlFor="email_field" className="block text-sm font-light text-stone-400">
          Enter Email
        </label>
        <input
          type="email"
          id="email_field"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        id="forgot_password_button"
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-light text-white bg-orange-500 hover:bg-orange-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Email"}
      </button>
    </form>
  </div>
</div>
 );
};


export default ForgotPassword;
