import express from "express"
import { registerUser, login, logout } from "../../controllers/auth/authController.mjs";

const router = express.Router();

router.route('/register').post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;