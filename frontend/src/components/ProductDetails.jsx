import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../redux/api/productsApi';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/features/cartSlice';
import Loader from './layouts/Loader';

const ProductDetails = () => {
  const { id } = useParams(); // Extract product ID from URL
  const { data: productDetails, error, isLoading } = useGetProductDetailsQuery(id);
  const [count, setCount] = useState(0);
  const [availableStock, setAvailableStock] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productDetails) {
      setAvailableStock(productDetails.product.stock);
    }
  }, [productDetails]);

  const increase = () => {
    if (availableStock > 0) {
      setAvailableStock(availableStock - 1);
      setCount(count + 1);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Out of Stock',
        text: 'No more items available.',
      });
    }
  };

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
      setAvailableStock(availableStock + 1);
    }
  };

  const handleAddToCart = () => {
    if (count > 0) {
      const productToAdd = {
        id: productDetails.product._id,
        name: productDetails.product.name,
        price: productDetails.product.price,
        quantity: count,
        imageUrl: productDetails.product.images[0].url,
      };
      dispatch(addItem(productToAdd));
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: 'Product has been added to your cart.',
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No Quantity Selected',
        text: 'Please select the quantity you want to add.',
      });
    }
  };

  if (isLoading) return <div className='flex h-screen justify-center align-middle'><Loader/></div>
  if (error) return <p>Error loading product details: {error.message}</p>;
  if (!productDetails) return <p>No product found</p>;

  const stockStatus = availableStock > 0 ? 'In Stock' : 'Finished';
  const stockStatusClass = availableStock > 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="flex flex-col lg:flex-row justify-around p-5 font-poppins">
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <div className="p-3">
          <img
            className="w-full h-auto"
            src={'http://localhost:3002/' + productDetails.product.images[0].url}
            alt="Product"
            width="340"
            height="390"
          />
        </div>
        <div className="flex justify-start mt-5">
          {/* Rating */}
        </div>
      </div>

      <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
        <h3 className="text-2xl font-bold">{productDetails.product.name}</h3>
        <p id="product_id" className="text-gray-500">ID: {productDetails.product._id}</p>

        <hr className="my-4" />

        <div className="flex items-center">
          <div className="flex text-yellow-500">
            {/* Display stars based on ratings if available */}
          </div>
          <span id="no-of-reviews" className="ml-2">({productDetails.product.reviews.length} Reviews)</span>
        </div>

        <hr className="my-4" />

        <p id="product_price" className="text-3xl font-bold">{productDetails.product.price}<span>&#36;</span></p>
        <div className="inline-flex items-center my-4">
          <button className="btn btn-danger minus px-4 py-2 bg-red-500 text-white rounded" id='minus' onClick={decrease}>-</button>
          <input
            type="number"
            className="form-control count mx-2 px-4 py-2 text-center border rounded"
            value={count}
            readOnly
          />
          <button className="btn btn-primary plus px-4 py-2 bg-blue-500 text-white rounded" id='plus' onClick={increase}>+</button>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary px-4 py-2 ml-4 bg-blue-500 text-white rounded"
          disabled={availableStock < 0} // Disable button if out of stock
          onClick={handleAddToCart} // Add to cart handler
        >
          Add to Cart
        </button>

        <hr className="my-4" />

        <p>
          Status: <span id="stock_status" className={stockStatusClass}>{stockStatus} </span> : {availableStock}
        </p>

        <hr className="my-4" />

        <h4 className="text-xl font-semibold mt-2">Description:</h4>
        <p className="text-gray-700">
          {productDetails.product.description}
        </p>

        <hr className="my-4" />

        <p id="product_seller" className="mb-3">
          Sold by: <strong>{productDetails.product.seller}</strong>
        </p>

        <div className="alert alert-danger my-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          Login to post your review.
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;



