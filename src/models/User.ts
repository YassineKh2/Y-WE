import mongoose from "mongoose";

const { Schema } = mongoose;

const ROLE = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
  COMPANY: "COMPANY",
};

const STATUS = {
  ACTIVE: "ACTIVE",
  BANNED: "BANNED",
  SUSPENDED: "SUSPENDED",
};

const userSchema = new Schema(
  {
    name: {
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
    },
    image: {
      type: String,
    },
    phonenumber: {
      type: Number,
    },
    bio: {
      type: String,
    },
    role: { type: String, enum: Object.values(ROLE), default: ROLE.CLIENT },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.ACTIVE,
    },
  },
  { timestamps: true },
);

export default mongoose.models.user || mongoose.model("user", userSchema);
