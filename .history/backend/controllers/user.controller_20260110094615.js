import User from '../models/user.models.js';
import Profile from '../models/profile.models.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const register = async(req, res) => {
    console.log(req.body);
    // Registration logic will go here
    try {
        const {name, email, password, username} = req.body;

        if(!name || !email || !password || !username) {
            return res.status(400).json({message: "All fields are required" });
        }

        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username
        });
        await newUser.save();

        const profile = new Profile({userId : newUser._id});

        return res.status(201).json({message: "User registered successfully" });

    } catch (error) {
        return res.status(500).json({message: "Registration failed", error: error.message });
    }
}


const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "All fields are required" });
        }
        const user = await User.findOne({   
            email
        });
        if(!user) {
            return res.status(400).json({message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials" });
        }   

        const token = crypto.randomBytes(32).toString("hex");
        await User.updateOne({ _id: user._id }, { token });
        return res.json({token});
    }catch(error){
        return res.status(500).json({message: "Login failed", error: error.message });
    }
}

const uploadProfilePicture = async(req,res) =>{
    const {token} = req.body;
    try{
        const user = await User.findOne({token : token});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        user.profilePicture = req.file.filename;

        await user.save();
        return res.status(200).json({message: "Profile picture uploaded successfully"});

    }catch(error){
        return res.status(500).json({message: "Profile picture upload failed", error: error.message });
    }

}

const userUpdate = async(req,res) =>{
    try{
        const {token, ...newUserData}= req.body;
        const user = await User.findOne({token : token});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const {username, email} = newUserData;
        
        const existingUser = await User.findOne({$or : [{username}, {email}]});

        if(existingUser){
            return res.status(400).json({message: "Username or email already in use"});
        }
        
    }catch(error){
        return res.status(500).json({message: "User update failed", error: error.message });
    }
}


export { register, login, uploadProfilePicture };