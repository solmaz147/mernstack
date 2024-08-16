import React, { useEffect } from 'react'
import Product from './Product'
import { useGetProductsQuery } from '../redux/api/productsApi';



const Home = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
   <>
   <div className='umumidiv h-full bg-white '>
   <h1 className='text-2xl font-semibold font-serif text-center text-pink-600 my-6'>Our Products</h1>
<div className='kartlar grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-8'>

  {products.map(product=><Product product={product}/>)}
  
    
  

</div>




      
  
   </div>
   </>
  )
}

export default Home