import express from "express"
import { registerUser, loginUser, logout, authMiddleware } from "../../controllers/auth/authController.mjs";

const router = express.Router();

router.route('/register').post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/check-auth").get(authMiddleware, (req, res) => {
  const user = req.user;
  // Respond with the user data
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

export default router;