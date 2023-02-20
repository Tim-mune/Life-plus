import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();
import {
  registerUser,
  loginUser,
  removeUser,
  updateUser,
  allUsers,
} from "../controllers/authControllers.js";
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/users").get(auth, allUsers);
router.route("/update/:id").patch(auth, updateUser);
router.route("/remove/:id").delete(auth, removeUser);

export default router;
