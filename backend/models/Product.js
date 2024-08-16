
import mongoose  from "mongoose";

 const productSchema = new mongoose.Schema(
  {
  name:{
    type:String,
    required:[true,"Mehsul adi mutleq daxil olmalidir"],
    maxLength:[256,"Mehsul adinda 256dan cox simvol ola bilmez"]
  },
  price:{
    type:Number,
    required:[true,"Qiymet daxil olmalidir"],
    maxLength:[5, "Mehsul qiymeti 5 simvoldan cox olmalidir"]
  },
  description:{
    required:[true, "description bow buraxila bilmez"],
    type:String,
    
  }, 
  
  images: [
    { ratings: 
      {
        type: Number,
        default: 0,
      },

      public_id: {
        type: mongoose.Schema.Types.ObjectId
        // required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},
{ timestamps: true }
);

export default mongoose.model("Product", productSchema);


