import { Router } from "express";
import { activeCheck, createPost, deletePost, getPosts } from "../controllers/posts.controller.js";
import multer from "multer";


const router = Router();

router.route("/").get(activeCheck);



const storage =multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: (req,file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.route("/post").post(upload.single('Media'), createPost);
router.route("/posts").get(getPosts);
router.route("/delete_post").post(deletePost)
router.route("/comment_on-post").post();


export default router;