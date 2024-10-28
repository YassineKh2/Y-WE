import mongoose from "mongoose";

const { Schema } = mongoose;

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
      required: true,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.models.user || mongoose.model("user", userSchema);
