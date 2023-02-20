import {
  createRecord,
  findRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/patientData.js";
import auth from "../middleware/auth.js";
import express from "express";
const router = express.Router();
router.route("/record").post(createRecord);
router.route("/findrecord").post(findRecord);
router.route("/records/:id").patch(updateRecord);
router.route("/records/:id").delete(deleteRecord);
export default router;
