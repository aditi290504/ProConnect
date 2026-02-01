import User from '../models/user.models.js';
import Profile from '../models/profile.models.js';
import bcrypt from 'bcrypt';

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
        re
    }catch(error){
        return res.status(500).json({message: "Login failed", error: error.message });
    }
}
export { register, login };