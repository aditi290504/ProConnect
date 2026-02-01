import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    userId : {

    },
    body : {
        type: String,
        required: true,
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    updatedAt : {
        type: Date,
        default: Date.now
    },
    media : {
        type: String,
        default: ''
    },
    likes : {
        type: Number,
        default: 0
    },
    comments : {    
    }
});

export const Post = mongoose.model("Post", postSchema);
