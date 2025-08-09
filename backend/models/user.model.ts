import { Schema, model } from "mongoose";
import { hash, genSalt } from "bcryptjs";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationExpiresAt: Date,
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  // Hash the password before saving
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});
export const User = model("User", userSchema);
