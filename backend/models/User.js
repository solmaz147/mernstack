import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
       required:[true,"Please enter your name"],
        maxLength:[30, "Your name cannot exceed 30 characters"],

    },
    password:{
        type:String,
    required:[true,"please enter password"],
    minLength:[5,"your password must contain min 5 characters"],
    select:false,
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Please,enter your email"],
    },
    avatar:{
        public_id:String,
        url:String,

    },
    role:{
        type:String,
        default:"user",
},
 
 
    resetPasswordToken:String,
        resetPasswordExpire: Date,
    

},
{timestamps:true}

)


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.getPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 30*60*1000
    return resetToken
}

userSchema.methods.JwtTokeniEldeEt = function(){

    return jwt.sign({
        id:this._id,
    },
process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
})
    
}


userSchema.methods.shifreleriMuqayiseEt = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)

}




export default mongoose.model("User",userSchema)