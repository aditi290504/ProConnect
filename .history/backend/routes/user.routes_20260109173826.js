import { Router } from "express";


const router = Router();

router.route("/register").get(register);

export default router;