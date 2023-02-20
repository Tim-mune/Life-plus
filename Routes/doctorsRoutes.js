import {
  loginDoc,
  registerDoc,
  updateDoc,
  removeDoc,
  allDoctors,
} from "../controllers/doctorsControllers.js";
import express from "express";
const router = express.Router();
router.route("/register").post(registerDoc);
router.route("/login").post(loginDoc);
router.route("/alldoctors").get(allDoctors);
router.route("/update/:id").patch(updateDoc);
router.route("/delete/:id").delete(removeDoc);
export default router;
