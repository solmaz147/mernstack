import React, { useEffect ,useRef} from 'react'
import Product from './Product'
import { useGetProductsQuery } from '../redux/api/productsApi';
import Loader from './layouts/Loader';





const Home = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const umumidivRef = useRef(null);

 
  const handleScrollToProducts = () => {
    if (umumidivRef.current) {
      umumidivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };



  if (isLoading) return <div className='flex h-screen justify-center align-middle'><Loader/></div>
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
   <>
   <div className="bg-headphboy  h-screen bg-no-repeat bg-cover w-screen flex flex-col justify-around" >
   
    <h1 className='text-6xl text-white font-semibold font-baskerville ps-8  '>
      Thanks for choosing us
    </h1>
    <p className=' text-white font-light ps-10 text-xl leading-8' >
      Stay in touch with us to be aware of latest tech products <br /> and high quality equipments.
      Dont miss the opportunity to make a deal ,  <br />using discounts and special offers!
    </p>
    <div>
    <button className='bg-stone-800 p-3 ms-10  text-white rounded-3xl border-stone-600' onClick={handleScrollToProducts}> Start now </button>
    </div>
  
   </div>
   <div ref={umumidivRef} className='umumidiv h-full bg-stone-100 px-11 py-11 '>
   <h1 className='text-4xl font-light font-baskerville text-center text-stone-500 pt-4'>Our Products</h1>
   <hr  className='w-48 h-1 mx-auto my-4 bg-stone-300 border-0 rounded md:my-10 dark:bg-gray-700'/>
  <div className='kartlar grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:px-12'>

  {products.map(product=><Product key={product._id} product={product}/>)}
  
    
  

</div>




      
  
   </div>
   </>
  )
}

export default Home