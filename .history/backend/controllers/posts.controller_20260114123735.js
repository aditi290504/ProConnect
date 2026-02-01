import User from '../models/user.models.js';
import Post from '../models/post.models.js';
import Profile from '../models/profile.models.js';
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
            Media: req.file ? req.file.filename: "",
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

        
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}