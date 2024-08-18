import express from "express";
import {upload} from '../utils/fileUpload.js';

import {newProduct, deleteProduct, getProducts, getProductDetails, updateProduct} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";


const router = express.Router();

router.get('/products',isAuthenticatedUser, getProducts);
router.post('/admin/newproduct', isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 5), newProduct);
router.delete('/admin/deletepr/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.get('/products/:id',isAuthenticatedUser, getProductDetails);
router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 5), updateProduct);

export default router;

