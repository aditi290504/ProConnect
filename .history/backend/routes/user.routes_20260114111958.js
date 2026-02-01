import { Router } from "express";
import { register, login, uploadProfilePicture, userUpdate, getUserAndProfile, updateProfileData, getAllUsers, downloadUserProfile } from "../controllers/user.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/upload_profile_picture").post(upload.single("profile_picture"), uploadProfilePicture)
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user_update").post(userUpdate);
router.route("/get_user_and_profile").post(getUserAndProfile);
router.route("/update_profile_data").post(updateProfileData);
router.route("/get_all_users").get(getAllUsers);
router.route("/download_resume").get(downloadUserProfile);
router.route("/send_connection_request").;

export default router;
