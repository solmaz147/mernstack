import catchAsynchErrors from "./catchAsynchErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const isAuthenticatedUser =catchAsynchErrors(async(req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return next (new ErrorHandler("Login before getting resourses",401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)

    next()

})

export const authorizeRoles = (...roles) => {
  return(req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`${req.user.role} cannot access these resourses`),403)
    }
    next();
  }

}