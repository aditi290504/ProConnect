import { Router } from "express";

const router = Router();

router.route("/register").get(activeCheck);

export default router;