import { timeStamp } from "console";
import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique : true ,
        lowercase : true ,
        trim : true,
        index : true
    },
    email: {
        type: String,
        required: true,
        unique : true ,
        lowercase : true ,
        trim : true,
    },
    fullname: {
        type: String,
        required: true,
        lowercase : true ,
        trim : true,
    },
    avatar: {
        type: String, //cloudinary url
        required: true,
    },
    coverImage: {
        type: String,//cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken :{
        type : String,
        default : ""
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
}
);

userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.method.generateAccessToken = function () {
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRE
            });
}

userSchema.method.generateRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE });
}

export const User = mongoose.model("User", userSchema);