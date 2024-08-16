import React from 'react'
import { FaCartPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';




const Product = ({ product }) => {
        return (

         < Link to={'/products/' + product._id}>
          <div className="bg-white border border-gray-200 hover:border-gray-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 " >
      <div className='flex justify-center items-center bg-white'>
            <a href="#">
              <img className="rounded-t-lg h-60 w-max " src={'http://localhost:3002/' + product.images[0].url} alt={product.name} />
            </a>
            </div>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-sans font-normal tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 my-6">
                {product.description}
              </p>
              <span className='font-bold'>{product.price} <span>&#36;</span> </span>
              <br />
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 my-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
                <FaCartPlus className='ms-3' />
              </a>
            </div>
          </div>
          </Link>
        );
      };
      
      export default Product;

