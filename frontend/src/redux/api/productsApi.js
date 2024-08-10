import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { deleteProduct, updateProduct } from "../../../../backend/controllers/productController";

export const productApi = createApi({
    reducerPath:"productApi",
    baseQuery:fetchBaseQuery({baseUrl:"/api/v1"}),
    endpoints:(builder) => ({
        getProducts: builder.query({
            query:() => "/products"
        }),
        getProductDetails:builder.query({
            query:(id) => `/products/${id}`,
        }),

        newProduct:builder.mutation({
            query: (formData) => ({
                url:"/admin/newproduct",
                method:"POST",
                body:formData
            })
        }),
        updateProduct:builder.mutation({
            query:({id,updatedProduct})=>({
                url: `/admin/product/${id}`,
                method:"PUT",
                body: updatedProduct

            }),
        }),
        deleteProduct: builder.mutation({
            query:(id)=>({
                url:`/admin/product/${id}`,
                method:"DELETE",
            }),
        }),

    }),
})

export const {useGetProductsQuery,useDeleteProductMutation,useGetProductDetailsQuery,useUpdateProductMutation,useNewProductMutation} = productApi;

