import express from "express"
import {upload} from '../utils/fileUpload.js';
import {loginUser, register,logoutUser, forgetPassword, resetNewPassword,getUserProfile, updatePassword,updateAvatar,changeUsername} from "../controllers/authController.js"
import {isAuthenticatedUser} from "../middleware/auth.js"
const router = express.Router()

router.post("/register", register)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.post("/forget/password",forgetPassword)
router.put("/password/reset/:token", resetNewPassword )
router.get("/me",isAuthenticatedUser , getUserProfile )
router.put("/password/update", isAuthenticatedUser, updatePassword)
router.put("/avatar", isAuthenticatedUser, upload.single('profileImage') ,updateAvatar)
router.put("/username", isAuthenticatedUser, changeUsername )




export default router