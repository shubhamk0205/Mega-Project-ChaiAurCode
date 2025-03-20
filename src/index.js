
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
const app = express();
dotenv.config({
    path: "./env"
});

//IIFE it is a function that is executed immediately after it is created
// A semicolon is added before the IIFE to prevent issues when concatenating with other files

connectDB()













/*
;(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.error("Express error:", error);
            throw new Error(`Error starting the server: ${error.message}`);
        });

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port '${process.env.PORT}'`);
        });
    } catch(error){
        console.error('Database connection error:', error);
        throw new Error(`Error connecting to the database: ${error.message}`);
    }
})();
*/