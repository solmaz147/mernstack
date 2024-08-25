import React from "react";
import { FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Link to={"/products/" + product._id}>
      <div className="my-8 hover:scale-105 rounded-lg ">
        <div className="flex justify-center items-center bg-white border-stone-400 border-2">
          
            <img
              className="rounded-t-lg h-60 w-max "
              src={"http://localhost:3002/" + product.images[0].url}
              alt={product.name}
            />
        
        </div>
        <div className=" ps-6 flex flex-col justify-center bg-stone-100">
          <button>
            <h5 className="mb-2 mt-0 text-xl font-light tracking-tight text-stone-500 dark:text-white">
              {product.name}
            </h5>
            </button>
          
          

          <span className="font-semibold  text-stone-700 text-center font-poppins">
            {product.price} <span>&#36;</span>{" "}
          </span>
        
        </div>
      </div>
    </Link>
  );
};

export default Product;
