import React, {useState} from 'react';
import { useGetMeQuery } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {useLazyLogoutQuery} from '../../redux/api/authApi';



const Header = () => {

  
  const navigate = useNavigate();
  const [logout]= useLazyLogoutQuery();
  const{isLoading} =useGetMeQuery
  const [dropdownOpen, setDropdownOpen]=useState(false);
  const {user} = useSelector((state)=> state.auth)

  const logoutHandler = () => {
      logout();
      
      navigate(0);
    };
 
 

  



  
  return (
    <nav className="flex flex-col md:flex-row items-center justify-between p-5 bg-pink-300 text-white">
      <div className="flex-shrink-0">
        <Link to="/" className="flex items-center">
        <h1 className='font-serif font-bold text-pink-700 me-6'> Beautico</h1>

    
          <img src="https://cdn3.iconfinder.com/data/icons/miscellaneous-236-solid/128/barbie_doll_adorable_beautiful_childhood_fashion-dolls_doll-girl-1024.png" alt="barbiegirl.logo" className="h-6" />
          <img src="https://cdn1.iconfinder.com/data/icons/bootstrap-vol-3/16/hearts-1024.png" alt="" className='h-6' />
          <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/shopping_bag-1024.png" alt="SHOPPING" className='h-6'/>
          
        </Link>
      </div>

      <div className="mt-4 md:mt-0 text-center relative">
        {user ? (
          <div className="relative inline-block text-left">
            <button
              className="flex items-center text-white focus:outline-none"
              type="button"
              id="dropDownMenuButton"
              aria-expanded={dropdownOpen ? "true" : "false"}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>{user?.name}</span>
              <svg
                className="ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
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
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="dropDownMenuButton"
              >
                {user?.role === "admin" && (
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    to="/admin/dashboard"
                    role="menuitem"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  to="/me/profile"
                  role="menuitem"
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
        ) : (
          !isLoading && (
            <Link to="/login" className="btn ms-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
    
  )
}

export default Header