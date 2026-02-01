import User from "../models/user.models.js";
import Profile from "../models/profile.models.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import fs from "fs";
import { ConnectionRequest } from "../models/connections.model.js";

const convertUserDataToPDF = async (userData) => {
  const doc = new PDFDocument();

  const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
  const stream = fs.createWriteStream("uploads/"+ outputPath);

  doc.pipe(stream); 
  
  doc.image(`uploads/${userData.userId.profilePicture}`, {align: "center", width: 100});
  doc.fontSize(14).text(`Name: ${userData.userId.name}`);
  doc.fontSize(14).text(`Username: ${userData.userId.username}`);
  doc.fontSize(14).text(`Email: ${userData.userId.email}`);
  doc.fontSize(14).text(`Bio: ${userData.bio}`);
  doc.fontSize(14).text(`Current Position: ${userData.currentPost}`);
  doc.fontSize(14).text("Past Work: ")
  userData.pastWork.forEach((work, index) => {
    doc.fontSize(14).text(`Company Name: ${work.company}`);
    doc.fontSize(14).text(`Position: ${work.position}`);
    doc.fontSize(14).text(`Years: ${work.years}`);
  })
  doc.end();
  return outputPath;
}


const register = async (req, res) => {
  console.log(req.body);
  // Registration logic will go here
  try {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });
    await newUser.save();

    const profile = new Profile({ userId: newUser._id });
    await profile.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    await User.updateOne({ _id: user._id }, { token });

    return res.json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};

const uploadProfilePicture = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.profilePicture = req.file.filename;

    await user.save();
    return res
      .status(200)
      .json({ message: "Profile picture uploaded successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Profile picture upload failed", error: error.message });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { token, ...newUserData } = req.body;
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, email } = newUserData;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      if (existingUser || existingUser._id.toString() !== user._id.toString()) {
        return res
          .status(400)
          .json({ message: "Username or email already in use" });
      }
    }
    Object.assign(user, newUserData);
    await user.save();
    return res.status(200).json({ message: "User updated successfully" });

  } catch (error) {
    return res
      .status(500)
      .json({ message: "User update failed", error: error.message });
  }
};

const getUserAndProfile = async (req, res) => {
    try{
    const { token } = req.query;

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });   
    }
    const profile = await Profile.findOne({ userId: user._id }).populate("userId", "name username email profilePicture");

    return res.status(200).json(profile);
    }catch (error) {
      return res.json({message : err.message})
    }
}

const updateProfileData = async (req, res) => {
    try{
    const { token, ...newProfileData } = req.body;

    const userProfile = await User.findOne({ token: token });
    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const profileUpdate = await Profile.findOne({ userId: userProfile._id });
    Object.assign(profileUpdate, newProfileData);
    await profileUpdate.save();
    return res.status(200).json({ message: "Profile updated successfully" });
    }catch (error) {
      console.error("Update profile error:", error);
      return res.status(500).json({ message: "Server error" });
    }
}

const getAllUsers = async (req, res) => {
  try{
    const profiles = await Profile.find().populate("userId", "name username email profilePicture");
    return res.status(200).json(profiles);
  }catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

const downloadUserProfile = async (req, res) => {
  const user_id = req.query.id;
  
  const userProfile = await Profile.findOne({ userId: user_id }).populate("userId", "name username email profilePicture");
  
  let outputPath = await convertUserDataToPDF(userProfile);

  return res.json({"message" : outputPath});
}


const sendConnectionRequest = async(req,res) =>{
  const {token, connectionId} = req.body;
  try{
    console.log("Incoming token:", token);
    
    const user = await User.findOne({token});

    if(!user){
       return res.status(404).json("user not found");
    }

    const connectionUser = await User.findOne({_id: connectionId});
    
    if(!connectionUser){
      return res.status(404).json("Connection User not found");
    }

    const existingRequest = await ConnectionRequest.findOne({
      userId: user._id,
      connectionId: connectionUser._id
    })

    if(existingRequest){
      return res.status(400).json("request already sent");
    }

    const request = new ConnectionRequest({
      userId: user._id,
      connectionId: connectionUser._id
    });


    await request.save();

    return res.json({message: "Request sent"})
 
  }catch(error){
    return res.status(500).json({message: err.message});
  }
  
} 

const getMyConnectionsRequest = async(req,res) =>{
  const {token} = req.query;

  try{

    const user = await User.findOne({token});

    if(!user){
      return res.status(404).json("User Not Found");
    }

    const connections = await ConnectionRequest.find({connectionId : user._id, status_accepted: null}).populate('userId', 'name username email profilePicture');

    return res.json({ connections });

  }catch(error){
    return res.status(500).json(error.message)
  }
}

const acceptConnectionRequest = async(req, res) => {
  const {token, conn, action_type} = req.body;

  try{

    const user = await User.findOne({token});

    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    const connection = await ConnectionRequest.findOne({_id: requestId});

    if(!connection){
      return res.status(404).json({message: "Connection Not Found"});
    }

    if(action_type == "accept"){
      connection.status_accepted = true;
    }else{
      connection.status_accepted = false;
    }

    await connection.save();
    return res.json({message: "Request Updated"})

  }catch(err){
    return res.json(err.message);
  }

}

const whatAreMyConnections = async(req, res) => {
  const {token} = req.query;
  try{

    const user = await User.findOne({token});

    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    const connections = await ConnectionRequest.find({connectionId: user._id}).populate('userId', 'name username email profilePicture');

    return res.json({connections});
  }catch(err){
    return res.status(500).json(err.message);

  }
}

export { register, login, uploadProfilePicture, userUpdate, getUserAndProfile, updateProfileData, getAllUsers, downloadUserProfile, sendConnectionRequest, 
  getMyConnectionsRequest, acceptConnectionRequest, whatAreMyConnections
};


export const getUserProfileAndUserBasedOnUsername = async (req, res) => {

  
  const { username } = req.query;
  try {
    

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    const profile = await Profile.findOne({ userId: user._id }).populate("userId", "name username email profilePicture");

    return res.status(200).json({"profile": profile});
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}