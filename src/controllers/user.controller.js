import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import User from "../models/User.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend ---DONE
    //validation - not empty ---DONE
    //check if user is alreday registered or not by email and username as they both are unique ----DONE
    //check for the images . check for avatar----DONE
    // upload them to cloudnary , check avatar ---DONE
    // create user object - create entry in Db ---DONE
    //remove password and refresh token field from the response ---DONE
    //check for the user creation ---DONE
    //return response ---DONE

    const { username, email, fullname, password } = req.body;
    console.log( email, fullname, password);

    if(fullname==="" || email==="" || password==="" || username===""){
        throw new ApiError (400, "All fields are required")
    }

    const existedUser =await User.findOne({
        $or:[{   email  },{   username  }]
    });
    if(existedUser){
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(500, "Error uploading images")
    }

    const user = await User.create({
        username : username.toLowerCase(),
        email,
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser){
        throw new ApiError(500, "Error creating user")
    }

    return res.status(201).json(new ApiResponse(201, createdUser ,"User created successfully!!"));
});

export {
    registerUser,

}