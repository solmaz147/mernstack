import mongoose from "mongoose";
import products from "./data.js";
import product from "../models/Product.js";

const seedProducts = async() => {
    try{
        await mongoose.connect("mongodb+srv://rzalisolmaz14:210414ss@cluster0.mrkwlrt.mongodb.net/lab2");
        await product.deleteMany()
        console.log("Mehsullar silindi")
        await product.insertMany(products)
        console.log("Mehsullar elave edildi")

        process.exit();
    }
    catch(err){
        console.log("Gozlenilmez xeta", err.message);
        process.exit();

    }

    
};
seedProducts();