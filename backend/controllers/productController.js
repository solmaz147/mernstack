import catchAsynchErrors from "../middleware/catchAsynchErrors.js";
import Product from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";
export const getProducts =catchAsynchErrors(async(req,res) => {
    const products = await Product.find()

    res.status(200).json(products);
});

 export const getProductDetails =catchAsynchErrors(async(req,res,next) => {
    const product = await Product.findById(req?.params?.id)

    if(!product){
      return next(new ErrorHandler("Product is not found",404))

    }

res.status(200).json({
    product
})

 })

 export const deleteProduct =catchAsynchErrors(async(req,res,next)=> {
    const product = await Product.findById(req?.params?.id);

    if(!product){
        return next(new ErrorHandler("Product is not found",404))
    }

    await product.deleteOne()
    res.status(200).json({
        message:"mehsul silindi"
    })
 })


 export const newProduct =catchAsynchErrors(async(req,res) => {
    req.body.user = req.user._id
    const productBody = req.body;
    
    if (req.files.length){
        const images = req.files.map(image => ({url: image.path}));
        productBody.images = images;
    };

    const product = await Product.create(productBody);

    res.status(201).json({
    product,
    });

 });

export const updateProduct =catchAsynchErrors(async(req,res,next)=>{
    let product = await Product.findById(req?.params?.id);
    
    if(!product) {
        return next(new ErrorHandler("Product is not found",404))
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body,{
        new: true,
    });
    res.status(200).json({
        product,
    });

})