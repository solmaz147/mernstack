import express from "express";

const app = express();


import dotenv from "dotenv";

import {connectDatabase} from "./config/dbConnect.js";

import errors from "./middleware/errors.js";

import cookieParser from "cookie-parser";

dotenv.config({path:'config/config.env'});

connectDatabase();




app.use(express.json());
app.use(cookieParser())


//bura marshrutlar gelecek

import productRoutes from "./routes/products.js";
import authRoutes from "./routes/users.js";

app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);
app.use(errors);


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server ${process.env.PORT} -cu portda calisir...`);});



    process.on("uncaughtException",(err)=>{
        console.log(`xeta budur: ${err}`)
        console.log(`uncaught exception error`)
       process.exit(1)
    })


    process.on("unhandledRejection",(err) => {
        console.log(`the type of error ${err}`)
        console.log(`server is shut down due to unhandled error`)
        server.close(() => {
            process.exit(1)

        })
    })


