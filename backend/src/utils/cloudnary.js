import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

import { v2 as cloudinary } from 'cloudinary';



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    

    // Upload image to Cloudinary
    const uploadOnCloudinary = async (filePath) => {
        try {
            if(!filePath) return null;
           const result = await cloudinary.uploader.upload(filePath,{
                resource_type: "auto",
            });
            console.log("Image uploaded successfully");
            return result;

        } catch (error) {
            fs.unlinkSync(filePath);
            return null; //remove the locally saved file
        }
    };

    export{uploadOnCloudinary};
