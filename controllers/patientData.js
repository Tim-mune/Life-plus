import UserMedicalData from "../models/UserMedicalData.js";
const createRecord = async (req, res) => {
  const medicalInfo = await UserMedicalData.create();
  res.status(200).json({ userMedical: medicalInfo });
};
const findRecord = async (req, res) => {
  res.send("find user data");
};
const updateRecord = async (req, res) => {
  res.send("update  user data");
};
const deleteRecord = async (req, res) => {
  res.send("delete user data");
};
export { createRecord, findRecord, updateRecord, deleteRecord };
