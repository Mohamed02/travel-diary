import mongoose, {model, Schema } from "mongoose";

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"user",
        required:true
    }
})
export default model("post",postSchema);