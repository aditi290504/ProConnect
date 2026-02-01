import User from '../models/user.models.js';
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

        c
    }catch(error){
        return res.status(500).json({message: "Server Error"});
    }
}