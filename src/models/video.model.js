import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
    },
    description : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
    },
    thumbnail : {
        type : String,
        required : true,
    },
    isPublished : {
        type : Boolean,
        default:"true",
        required : true,
        
    },
    duration : {
        type :Number,
        required:true
    },
    videoFile : {
        type : String,
        required : true,
    },
    views : {
        type : Number,
        default : 0,
    },
    likes : {
        type : Number,
        default : 0,
    },
    dislikes : {
        type : Number,
        default : 0,
    },
    comments : [
        {
            type : Schema.Types.ObjectId,
            ref : "Comment"
        }
    ],
    owners   : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true});

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video",videoSchema);