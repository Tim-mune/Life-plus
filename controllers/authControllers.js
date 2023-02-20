import User from "../models/Usermodel.js";
import { BAD_REQUEST, Not_Found } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import attachCookie from "../utils/attachCookie.js";
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BAD_REQUEST("please provide all values");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BAD_REQUEST("email is already in use");
  }
  const user = await User.create(req.body);
  const token = user.createJwt();
  const userClient = {
    name: user.name,
    lastName: user.lastName,
    location: user.location,
  };
  res.status(StatusCodes.CREATED).json({ userClient, token });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BAD_REQUEST("please provide all values");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Not_Found("user does not exist");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BAD_REQUEST("invalid credentials");
  }
  user.password = undefined;
  const token = user.createJwt();
  attachCookie({ res, token });
  res.status(StatusCodes.OK).json({ user, token });
};
const allUsers = async (req, res) => {
  const users = await User.find({});
  const totalUsers = users.length;
  res.status(StatusCodes.OK).json({ users, totalUsers });
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, password, location, lastName, status, email } = req.body;
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new Not_Found("invalid credentials");
  }
  if ((!name, !lastName, !password, !location, !status, !email)) {
    throw new BAD_REQUEST("please provide all values");
  }
  user.password = password;
  user.name = name;
  user.location = location;
  user.lastName = lastName;
  user.status = status;
  user.email = email;
  user.save();
  user.password = undefined;
  res.status(StatusCodes.OK).json(user);
};
const removeUser = async (req, res) => {
  const { id } = req.params;
  // check if user is present first
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new BAD_REQUEST("user does not exist");
  }
  // check if user is an admin
  if (user.role === "admin") {
    user.remove();
  }
  // await user.remove()
  res
    .status(StatusCodes.OK)
    .json({ msg: `user successfully removed by ${req.user}`, user });
};
export { registerUser, loginUser, updateUser, removeUser, allUsers };
