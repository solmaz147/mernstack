import React from 'react'
import { Link } from 'react-router-dom'

const Productrow = ({product}) => {
  return (<tbody>
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
        <td className="px-6 py-4 ">
            <Link to={'/admin/product/' + product._id} className="p-2 me-4 font-medium text-white bg-blue-500 dark:text-blue-500 hover:underline">Edit</Link>
            <Link to=" " className="p-2 font-medium dark:text-blue-500 hover:underline bg-red-600 text-white">Delete</Link>

        </td>
    </tr>
    </tbody>
    
  )
}

export default Productrow