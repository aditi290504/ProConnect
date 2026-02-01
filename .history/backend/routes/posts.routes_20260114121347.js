import { Router } from "express";
import { activeCheck, c } from "../controllers/posts.controller.js";


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

export default router;