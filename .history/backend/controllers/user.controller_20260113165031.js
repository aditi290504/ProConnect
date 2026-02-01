import User from "../models/user.models.js";
import Profile from "../models/profile.models.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import fs from "fs";

const convertUserDataToPDF = async (userData) => {
  const doc = new PDFDocument();

  const outputPath = crypto.randomBytes(32).toString("hex") + "pdf";
  const stream = fs.createWriteStream("uploads/"+ outputPath);

  doc.pipe(stream); 

  doc.image('uploads/${userData.userId.profilePicture}', {align:"center"})
  doc.image(uploads/$(userData.userId.profilePicture), (align: "center", width: 100))
doc.fontSize(14).text("Name: $(userData.userId.name)");
doc.fontSize(14).text("Username: $(userData.userId.username)");
doc.fontSize(14).text(Email: $(userData.userId.email)");
doc.fontSize(14).text(Bio: $(userData.bio));
doc.fontSize(14).text("Current Position: $(userData.currentPosition)");
doc.fontSize(14).text("Past Woork: ")
userData.pastwork.forEach((work, index) => (
doc.fontSize(14).text(Company Name: $(work.companyName));
doc.fontSize(14).text(Position: $(work.position)");
doc.fontSize(14).text("Years: $(work.years)');
aditianarase@gm
00
doc.end();
return outputPath,
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
    const { token } = req.body;

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });   
    }
    const profile = await Profile.findOne({ userId: user._id }).populate("userId", "name username email profilePicture");

    return res.status(200).json(profile);
    }catch (error) {}
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
  const user_id = req.query.user_id;
  const userProfile = await Profile.findOne({ userId: user_id }).populate("userId", "name username email profilePicture");
  
  let a = await convertUserDataToPDF(userProfile);

  return res.json({a});
}

export { register, login, uploadProfilePicture, userUpdate, getUserAndProfile, updateProfileData, getAllUsers, downloadUserProfile};
