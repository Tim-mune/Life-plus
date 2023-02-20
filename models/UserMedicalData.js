import mongoose from "mongoose";
const MedicalSchema = new mongoose.Schema(
  {
    diagnosis: {
      type: String,
      default: "please provide a diagnosis for the patient",
    },
    description: {
      type: String,
      default:
        "a description of the patient including signa and symptoms of the illness",
    },
    prescription: {
      type: String,
      default: "i recomend the patient taking the following drugs",
    },
    medicalHistory: {
      type: String,
      default: "a brief history of the patients sickness",
    },
    diagnosis: {
      type: String,
      default: "a list of lab tests of possible illness",
    },
    labResults: {
      type: String,
      default: "a list of outcome from the lab",
    },
    medications: {
      type: String,
      default: "a list of doctors medications and drugs",
    },
  },
  { timestamps: true }
);
export default mongoose.model("MedicalData", MedicalSchema);
