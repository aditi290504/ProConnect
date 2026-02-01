import { Router } from "express";
import { register, login } from "../controllers/user.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");   
router.route("/register").post(register);
router.route("/login").post(login);

export default router;