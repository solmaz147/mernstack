import express from "express"
import {loginUser, register,logoutUser, forgetPassword, resetNewPassword,getUserProfile, updatePassword} from "../controllers/authController.js"
import {isAuthenticatedUser} from "../middleware/auth.js"
const router = express.Router()

router.post("/register", register)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.post("/forget/password",forgetPassword)
router.put("/password/reset/:token", resetNewPassword )
router.get("/me",isAuthenticatedUser , getUserProfile )
router.put("/password/update", isAuthenticatedUser, updatePassword)

export default router