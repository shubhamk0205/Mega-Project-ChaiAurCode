import {v2 as cloudinary} from "cloudinary";
import exp from "constants";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const result = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        });
        //file is uploaded successfully
        console.log("Image uploaded on cloudinary", result.url);
        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath); //delete the file from the server if it is not uploaded on cloudinary
        console.error("Error uploading image on cloudinary", error);
        return null;
    }
}
export default uploadOnCloudinary;