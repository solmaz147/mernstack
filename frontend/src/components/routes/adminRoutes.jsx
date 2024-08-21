import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from "../admin/Dashboard";
import UpdateProduct from "../admin/UpdateProduct";
import CreateProduct from "../admin/CreateProduct";
import ListProducts from "../admin/ListProducts";


const adminRoutes =()=>{
    return (
        <>

       < Route path="/admin/dashboard" 
       element={
       < ProtectedRoute admin={true}>
         <Dashboard/> 
       </ProtectedRoute>
       } />


        < Route path="/admin/products" 
       element={
       < ProtectedRoute admin={true}>
         <ListProducts/> 
       </ProtectedRoute>} />



       < Route path="/admin/newproduct" 
       element={
       < ProtectedRoute admin={true}>
         <CreateProduct/> 
       </ProtectedRoute>} />
       < Route path="/admin/product/:id" 
       element={
       < ProtectedRoute admin={true}>
         <UpdateProduct/> 
       </ProtectedRoute>} />




        </>
    )
}

export default adminRoutes;