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
      minLength:3,
      required:true,
      unique:true
    },
    role: {
      type: String,
      enum: ["admin", "montadaben", "info", "planing", "retired", "affairs"],
      required:true
    },
    password: {
      type: String,
      required: [true, "من فضلك ادخل الرقم السري"],
      maxLength: 30,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "من فضلك أكد الرقم السري"],
      validate: {
        validator: function (this: User, el: string) {
          return el == this.password;
        },
        message: "الرقم السري غير متطابق",
      },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userModel);
export default User;
