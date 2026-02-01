import { Router } from "express";
import { activeCheck, createPost, deletePost, getComments, getPosts, increment_likes, commentPost, deleteComment } from "../controllers/posts.controller.js";
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
router.route("/delete_post").delete(deletePost)
router.route("/delete_comment").delete(deleteComment);
router.route("/like_post").post(increment_likes);

export default router;