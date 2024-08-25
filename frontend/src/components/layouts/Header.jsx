 import React, {useState,useEffect} from 'react';
import { useGetMeQuery } from '../../redux/api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { clearUser } from '../../redux/features/userSlice';
import toast from 'react-hot-toast';
import {useLogoutMutation} from '../../redux/api/authApi';
import { clearCart } from '../../redux/features/cartSlice';





const Header = () => {

  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout]= useLogoutMutation();
  const{refetch} =useGetMeQuery();
  const [isLoading, setIsLoading]=useState(true);
  const {user,isAuthenticated} = useSelector((state)=> state.auth)
  const[profileImg, setProfileImg] = useState('https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-1024.png')

 useEffect(()=>{
  refetch();
  setTimeout(()=>setIsLoading(false),500);
  // navigate('/login')

},[dispatch,isAuthenticated,navigate]);

  

const logoutHandler = async() => {
     try{
      await logout().unwrap();
      dispatch(clearUser());
      navigate('/login');
      setDropdownOpen(false);
      dispatch(clearCart());
     }
     catch(err){
      console.error('Failed to logout',err);
      toast.error("Logout failed")

     }
    };

    const[dropdownOpen,setDropdownOpen]= useState(false);
    const dropdownuAcBagla = ()=> {
      setDropdownOpen(!dropdownOpen);
    };
    const handleProfileClick = () => {
      setDropdownOpen(false);
    };
    
    const handleAdminDashboardClick = () => {
      setDropdownOpen(false);
    };
    
    const handleProductsListClick = () => {
      setDropdownOpen(false);
    };
    
 

  



  
  return (
    <nav className="flex flex-col sm:flex-row items-center sm:justify-between p-5 bg-white border-2 text-white">
      <div className="flex-shrink-0 ">
        <Link to="/" className="flex items-center">
        <h1 className='font-poppins font-semibold text-neutral-500 ms-14 me-6 text-2xl'>SHOPPING</h1>


    
          
          
         
          
        </Link>
      </div>
    
      <div className="mt-4 md:mt-0 text-center relative me-14">
        
           
        
          {(!isLoading && isAuthenticated) && <div className="relative  flex text-left">
           <Link to="/cart">
    <svg  className='me-6' height="40" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M14 36c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zM2 4v4h4l7.19 15.17-2.7 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5 0-.09.02-.17.06-.24L16.2 26h14.9c1.5 0 2.81-.83 3.5-2.06l7.15-12.98c.16-.28.25-.61.25-.96 0-1.11-.9-2-2-2H10.43l-1.9-4H2zm32 32c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4z"/><path d="M0 0h48v48H0z" fill="none"/></svg>
          
           
 </Link>
          
            <button
              className="flex items-center text-white focus:outline-none"
              type="button"
              id="dropDownMenuButton"
             aria-expanded={dropdownOpen ? "true" : "false"}
              onClick={dropdownuAcBagla}
            >
              <span className='flex text-stone-500 text-lg font-poppins gap-4'>{user?.name}   <img src={user?.avatar?.url ? 'http://localhost:3002/' + user?.avatar?.url  : profileImg} className='h-6 w-6 bg-white rounded-full border border-white'/> </span>
             

              <svg
                className="ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="black"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div
                className="origin-top-right absolute z-50 right-0 mt-8 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="dropDownMenuButton"
              >
                {user?.role === "admin" && (

           <Link
           className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            to="/admin/dashboard"
               role="menuitem"
               onClick ={handleAdminDashboardClick}
              >
              Dashboard
             </Link>
          )
       
                }

{user?.role === "admin" && (

<Link
className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
 to="/admin/products"
    role="menuitem"
    onClick={handleProductsListClick}
   >
   Products list
  </Link>
)

     }
                <Link
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  to="/me"
                  role="menuitem"
                  onClick={handleProfileClick}
                >
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  onClick={logoutHandler}
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          }
        
        {isLoading && <span>Loading...</span>}
       
 { !isAuthenticated && <Link to="/login" className="btn ms-4 bg-stone-700 text-white px-4 py-2 rounded-md hover:bg-orange-500" > Login </Link> }
          
      </div>
    </nav>
    
  );
}

export default Header
