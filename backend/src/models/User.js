import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
        minlength:6
    },
    posts:[{
        type: mongoose.Types.ObjectId,ref:"post"
    }]

});
export default model("user",userSchema);