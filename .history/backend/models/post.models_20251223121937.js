import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    userId : {

    },
    body : {
        type: String,
        required: true,
    },
    createdAt : {

    },
    updatedAt : {

    },
    media : {

    },
    likes : {

    },
    comments : {    
    }
});

export const Post = mongoose.model("Post", postSchema);
