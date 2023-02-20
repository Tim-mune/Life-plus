import Doctor from "../models/doctorsModal.js";
import { BAD_REQUEST, Not_Found } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import attachCookie from "../utils/attachCookie.js";

const registerDoc = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BAD_REQUEST("please provide all values");
  }
  const userExists = await Doctor.findOne({ email });
  if (userExists) {
    throw new BAD_REQUEST("email is already in use");
  }
  const user = await Doctor.create(req.body);
  const token = user.createJwt();
  const userClient = {
    name: user.name,
    lastName: user.lastName,
    location: user.location,
  };
  res.status(StatusCodes.CREATED).json({ userClient, token });
  res.send("register doctors");
};
const loginDoc = async (req, res) => {
  res.send("login doctor");
};
const allDoctors = async (req, res) => {
  res.send("all doctors");
};
const updateDoc = async (req, res) => {
  res.send("update doctors");
};
const removeDoc = async (req, res) => {
  res.send("remove");
};

export { registerDoc, loginDoc, updateDoc, removeDoc, allDoctors };
