import User from '../models/user.models.js';
import Profile from '../models/profile.models.js';
import bcrypt from 'bcrypt';

export const activeCheck = async(req, res) => {
    return res.status(200).json({message: "Active" });
}

const storage =multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: (req,file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });