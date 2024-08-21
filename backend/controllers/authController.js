import catchAsynchErrors from "../middleware/catchAsynchErrors.js";
import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";

import sendToken from "../utils/sendToken.js";
import crypto from "crypto"



import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register =  catchAsynchErrors(async(req,res,next) => {
    const{name, email, password} = req.body
    const user = await User.create({
        name, email, password
    })

   sendToken(user, 201, res)

})


export const loginUser = catchAsynchErrors(async(req,res,next)=> {

    const{email,password} = req.body

    if(!email || !password){
        return next(new ErrorHandler("Please enter your email or password", 400))
    }

const user = await User.findOne({email}).select("+password")
 if(!user){
        return next(new ErrorHandler("User is not found", 401))
    }
const isPasswordMatched = await user.shifreleriMuqayiseEt(password)
 if(!isPasswordMatched){
        return next(new ErrorHandler("Password is not correct",401))
    }



sendToken(user,200,res)
})


export const logoutUser = catchAsynchErrors(async(req,res,next)=>
{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        message:"Logged out"
    })
})


export const forgetPassword = catchAsynchErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHandler("Bele bir istifaci yoxdur",404))
    }

const resetToken = user.getPasswordToken()
    await user.save()
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
const message = getResetPasswordTemplate(user?.name, resetUrl)
try{
    await sendEmail({
        email: user.email,
        subject:"DEPO TRACCKING WIFRE SIFIRLAMA",
        message
    })
    res.status(200).json({
        message:`Shifre sifirlanma linki gonderildi`
    })
}
catch(err){
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    user.save()
return next (new ErrorHandler(err?.message, 500))
}
})


export const resetNewPassword =catchAsynchErrors(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req?.params?.token).digest("hex")
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
})

    if(!user){
        return next(new ErrorHandler("Linkin muddeti bitmiwdir",400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Shifreler uygun deyil",400))
    }

    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    sendToken(user,200,res)


})


export const getUserProfile =catchAsynchErrors(async(req,res,next)=>{
    const user = await User.findById(req?.user?._id)
    res.status(200).json({
        user
    })

})

export const updatePassword = catchAsynchErrors(async(req,res,next)=>{
    const user = await User.findById(req?.user?._id).select("+password")
    const shifrelerUygundurmu = user.shifreleriMuqayiseEt(req.body.oldPassword)
    if (!shifrelerUygundurmu){
        return next(new ErrorHandler("Shifreler uygun deyil",400))
    }

    user.password = req.body.password
    await user.save()
    res.status(200).json({
        message:"Shifre ugurla deyiwdirildi",
        success:true
    })

})

export const updateAvatar = catchAsynchErrors(async (req, res, next) => {
    const user = await User.findById(req?.user?._id);

    user.avatar.url = req.file.path
    
    await user.save();

    res.status(201).json({imageUrl: req.file.path});
});