import mongoose from "mongoose";
interface User {
  name: String;
  role: String;
  password: String;
  confirmPassword: String;
}
const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      minLength: 3,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ["admin", "chief", "montChief", "infoCheif","planChief", "montadaben", "info", "planing", "retired", "affairs", "sec"],
      required: true
    },
    password: {
      type: String,
      required: [true, "من فضلك ادخل الرقم السري"],
      maxLength: 200,
      select: false,
    },
    image:String
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userModel);
export default User;
