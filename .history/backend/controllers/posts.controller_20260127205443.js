import User from '../models/user.models.js';
import Post from '../models/post.models.js';
import Profile from '../models/profile.models.js';
//import {Comment} from '../models/comment.models.js';

import bcrypt from 'bcrypt';

export const activeCheck = async(req, res) => {
    return res.status(200).json({message: "Active" });
}
export const createPost = async(req,res) =>{
    const {token} = req.body;
    try{
        const user = await User.findOne({token: token});

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const post = new Post({
            userId: user._id,
            body: req.body.body,
            media: req.file ? req.file.filename: "",
            fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : ""
        })
        await post.save();

        return res.status(201).json({message: "Post created successfully", post: post});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getPosts = async(req,res) =>{
    try{

        const posts = await Post.find().populate('userId', 'name email username profilePicture');

        return res.status(200).json({posts: posts});

    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

export const deletePost = async(req,res) =>{
    const {post_id, token} = req.body;
    
    try{

        const user = await User.findOne({token: token}).select('_id');

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const post = await Post.findOne({_id: post_id});

        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        if(post.userId.toString() !== user._id.toString()){
            return res.status(403).json({message: "Unauthorized action"});
        }
        await Post.deleteOne({_id: post_id});

        return res.status(200).json({message: "Post deleted successfully"});


    }catch(err){
        return res.status(500).json({message: err.message});
    }
}





export const increment_likes = async(req,res) =>{
    const {post_id} = req.body;

    try{
        const post = await Post.findOne({_id: post_id});

        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        post.likes += 1;
        await post.save();

        return res.status(200).json({message: "Like added successfully", likes: post.likes});

    }catch(err){
        return res.status(500).json({message: err.message});
    }
}