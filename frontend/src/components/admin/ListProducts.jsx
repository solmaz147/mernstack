import React from 'react';
import {useGetProductsQuery, useGetProductDetailsQuery } from '../../redux/api/productsApi';
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

        
    </table>
</div>

  )
}

export default ListProducts