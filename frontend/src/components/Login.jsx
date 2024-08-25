import React, { useState, useEffect } from 'react';
import {useLoginMutation} from '../redux/api/authApi';
import { useSelector } from "react-redux";
import toast, {Toaster} from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    


    const navigate = useNavigate();

    const [login, {isLoading, error, data, isSuccess}] = useLoginMutation();
    const {isAuthenticated} = useSelector((state) => state.auth);



   useEffect(() => {
    if(isAuthenticated || isSuccess){
        navigate("/");
     }
     if(error){
        toast.error(error?.data?.message);
     }
   }, [error, isAuthenticated, isSuccess, navigate]);



const submitHandler = (e) => {
    e.preventDefault();
    login({ email, password });
};


return (
    
   <section className="bg-stone-50">
     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 shadow-md">
         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
           <h5 className="text-base font-light font-serif  leading-tight tracking-tight text-slate-500 md:text-2xl dark:text-white">
             Sign in to your account
           </h5>
           <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
             <div>
               <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-500 dark:text-white">Your email </label>
               <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
             </div>
             <div>
               <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-500 dark:text-white">Password</label>
               <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
             </div>
              <button type="submit" className="w-full text-white bg-stone-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >{isLoading ? "Authenticating...." : "LOGIN"}</button>
             <p className="text-sm font-light text-gray-500 dark:text-gray-400">
               Don’t have an account yet? <Link to="/register" className="font-medium text-slate-600 hover:underline dark:text-primary-500">Sign up</Link>
             </p>
             <p className='text-center font-bold text-gray-500'>Forgot password? <br></br>
            <Link className='font-medium text-slate-600' to="/forget/password">Reset password</Link> </p>
           </form>
         </div>
       </div>
     </div>
   </section>
 );
 
};


export default Login;


