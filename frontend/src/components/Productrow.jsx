 import React from 'react';
import { useNavigate , Link} from 'react-router-dom';
import { useDeleteProductMutation } from '../redux/api/productsApi';
import Swal from 'sweetalert2';

const Productrow = ({ product }) => {
    const [deleteProduct, { isLoading, isSuccess, error }] = useDeleteProductMutation();
    const navigate = useNavigate(); // Redirect after deletion

    const handleDelete = async () => {
        try {
            await deleteProduct(product._id).unwrap();
            Swal.fire({
              title: 'Success!',
              text: 'Product deleted successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
          })
            
            
            navigate('/admin/products'); // Redirect after successful deletion
        } catch (err) {
            console.error('Failed to delete product:', err);
            Swal.fire({
              title: 'Error!',
              text: 'Product is not deleted',
              icon: 'error',
              confirmButtonText: 'Close'
          })
            
        }
    };

    return (
        <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.name}
                </th>
                <td className="px-6 py-4">
                    {product.price}
                </td>
                <td className="px-6 py-4">
                    {product.category}
                </td>
                <td className="px-6 py-4">
                    {product._id}
                </td>
                <td className="px-6 py-4">
                    <Link to={`/admin/product/${product._id}`} className="p-2 me-4 font-medium text-white bg-blue-500 dark:text-blue-500 hover:underline">Edit</Link>
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="p-2 font-medium dark:text-blue-500 hover:underline bg-red-600 text-white"
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                </td>
            </tr>
        </tbody>
    );
};


export default Productrow