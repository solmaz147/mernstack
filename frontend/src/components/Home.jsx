import React, { useEffect } from 'react'
import Product from './Product'
import { useGetProductsQuery } from '../redux/api/productsApi';
import Loader from './layouts/Loader';



const Home = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div className='flex h-screen justify-center align-middle'><Loader/></div>
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
   <>
   <div className='umumidiv h-full bg-white '>
   <h1 className='text-2xl font-semibold font-sans text-center text-pink-600 my-6'>Our Products</h1>
    <div className='kartlar grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-8'>

  {products.map(product=><Product key={product._id} product={product}/>)}
  
    
  

</div>




      
  
   </div>
   </>
  )
}

export default Home