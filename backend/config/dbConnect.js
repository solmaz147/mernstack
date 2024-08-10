import mongoose from "mongoose";


export const connectDatabase = () => {
    let DB_URI = "";

    if(process.env.NODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI ||
         "mongodb+srv://rzalisolmaz14:210414ss@cluster0.mrkwlrt.mongodb.net/lab2";
    if(process.env.NODE_ENV==="PRODUCTION") DB_URI = process.env.DB_URI;
 

    mongoose.connect(DB_URI).then((con)=>{
        console.log("baglanti quruldu");
    }
);


};