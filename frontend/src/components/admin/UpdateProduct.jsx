
import React, { useState, useEffect } from 'react';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../redux/api/productsApi';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams();
    const { data: productDetails, isLoading } = useGetProductDetailsQuery(id);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [updateProduct] = useUpdateProductMutation();
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (productDetails) {
            setValue("name", productDetails.product.name);
            setValue("price", productDetails.product.price);
            setValue("description", productDetails.product.description);
            setValue("category", productDetails.product.category);
            setValue("seller", productDetails.product.seller);
            setValue("stock", productDetails.product.stock);
            setExistingImages(productDetails.product.images);
        }
    }, [productDetails, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("seller", data.seller);
        formData.append("stock", data.stock);

        if (images.length > 0) {
            images.forEach(image => formData.append("images", image));
        }

        try {
            await updateProduct({ id, updatedProduct: formData }).unwrap();
            Swal.fire({
                title: 'Success!',
                text: 'Product updated successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                navigate("/admin/products");
            });
        } catch (error) {
            console.error('Failed to update product', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update product",
                icon: "error",
                confirmButtonText: "Close"
            });
        }
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register("name", { required: "Product name is required" })}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register("price", { required: "Price is required" })}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                    {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        {...register("description", { required: "Description is required" })}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                    {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        {...register("category", { required: "Category is required" })}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    >
                        <option value="">Choose category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Cameras">Cameras</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Headphones">Headphones</option>
                        <option value="Food">Food</option>
                        <option value="Books">Books</option>
                        <option value="Sports">Sports</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Home">Home</option>
                    </select>
                    {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="seller" className="block text-sm font-medium text-gray-700">Seller</label>
                    <input
                        id="seller"
                        type="text"
                        {...register("seller", { required: "Seller is required" })}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.seller ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                    {errors.seller && <p className="mt-2 text-sm text-red-600">{errors.seller.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        id="stock"
                        type="number"
                        {...register("stock", { required: "Stock is required" })}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.stock ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                    {errors.stock && <p className="mt-2 text-sm text-red-600">{errors.stock.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">Product Images</label>
                    <input
                        id="images"
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
                    />
                </div>

                {existingImages.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Existing Images</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {existingImages.map((image, index) => {
                                console.log(image);
                                return <img
                                    key={index}
                                    src={'http://localhost:3002/' + image.url} // Adjust based on how you store/display images
                                    alt={`Existing image ${index + 1}`}
                                    className="w-24 h-24 object-cover rounded-md border border-gray-300"
                                />
                            })}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
