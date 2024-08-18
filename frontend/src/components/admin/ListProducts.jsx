import React from 'react';
import { Link } from 'react-router-dom';
import {useGetProductsQuery } from '../../redux/api/productsApi';
import Productrow from '../Productrow';


const ListProducts =()=>{


    const{data: products, error, isLoading } = useGetProductsQuery();
    if (isLoading) return <p>Loading...</p>;
  if (error) return <p>error!!! {error.message}</p>;
  



  return (
   <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Id
                </th>
                <th scope="col" className="px-10 py-3">
                    Action
                </th>
            </tr>
        </thead>

        {products.map(product=><Productrow product={product}/>)}


<div className='flex items-center justify-center p-6'>
         <Link to="/admin/newproduct" className=" p-2 me-4 font-medium text-white bg-blue-500 dark:text-blue-500 hover:underline">Add new product</Link>
         </div>
    </table>
</div>

  )
}

export default ListProducts