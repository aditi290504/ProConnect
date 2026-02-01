import User from '../models/user.models.js';
import Profile from '../models/profile.models.js';
import bcrypt from 'bcrypt';

export const activeCheck = async(req, res) => {
    return res.status(200).json({message: "Active" });
}
export const createPost = async(req,res)