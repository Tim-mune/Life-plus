import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    lastName: {
      type: String,
      default: "lastname",
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    sex: {
      type: String,
      default: "M",
      enum: ["M", "F"],
    },
    status: {
      type: String,
      enum: ["Single", "Married"],
      default: "Single",
    },
    email: {
      type: String,
      required: [true, "please provide a valid email"],
      unique: true,
      validate: {
        validator: validator.isEmail,
      },
    },
    password: {
      type: String,
      required: [true, "please provide password"],
      minlength: 6,
    },
    location: {
      type: String,
      maxlength: 20,
      default: "User city",
    },
    role: {
      type: String,
      enum: ["admin", "user", "doc"],
      default: "user",
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function () {
  console.log(this.modifiedpaths);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.createJwt = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};
export default mongoose.model("User", UserSchema);
