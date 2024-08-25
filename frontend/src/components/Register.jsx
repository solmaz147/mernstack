import React, {useState, useEffect} from 'react';
import { useRegisterMutation } from '../redux/api/authApi';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const  {isAuthenticated} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [register, {isLoading, error, isSuccess}] = useRegisterMutation();

    useEffect(() => {
        if (isAuthenticated || isSuccess){
            navigate("/");
        }
        if(error) {
            toast.error(error?.data?.message);
        } } ,[error, isAuthenticated, isSuccess]);

        const submitHandler = (e) => {
            e.preventDefault(),
            register({name, email, password });
           
        };


        
return (<div>
<form className="flex flex-col items-center justify-center  mx-auto bg-white rounded-3xl pt-11" onSubmit={submitHandler}>
      <h1 className='text-gray-600 text-center min-w-44 mb-8 font-poppins  text-2xl'>Sign Up</h1>
      <div className='inputlabeldiv w-2/3 sm:w-1/3'>
       <div className="relative z-0 w-full mb-5 group ms-0 ">
      
    
       <input
         type="text"
         name="name"
         id="floating_name"
         className="block px-0 w-full min-w-50 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-700 peer"
         placeholder=" "
         value={name}
         onChange={(e) => setName(e.target.value)}
         required
       />
       <label
         htmlFor="floating_name"
         className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-stone-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
       >
         Your name
       </label>
     </div>
     <div className="relative z-0 w-full mb-5 group">
       <input
         type="email"
         name="email"
         id="floating_email"
         className="block py-2.5 px-0 w-full min-w-44 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
         placeholder=" "
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
       />
       <label
         htmlFor="floating_email"
         className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-stone-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
       >
         Email
       </label>
     </div>
     <div className="relative z-0 w-full mb-5 group">
       <input
         type="password"
         name="password"
         id="floating_password"
         className="block min-w-44 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-700 "
         placeholder=" "
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
       />
       <label
         htmlFor="floating_password"
         className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-stone-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
       >
        Create Password
       </label>
     </div>
     <div className='flex items-center justify-center'>
     <button
       type="submit"
       className="text-white bg-stone-700 hover:bg-stone-900 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
       disabled={isLoading}
     >
       {isLoading ? 'Registering...' : 'Submit'}
     </button>
     </div>
     </div>
   </form>
   </div>
   
       );





};

export default Register;
