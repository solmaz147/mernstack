import express from "express";

import {newProduct, deleteProduct, getProducts, getProductDetails, updateProduct} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";


const router = express.Router();

router.get('/products',isAuthenticatedUser, getProducts);
router.post('/admin/newproduct', isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.get('/products/:id',isAuthenticatedUser, getProductDetails);
router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

export default router;

