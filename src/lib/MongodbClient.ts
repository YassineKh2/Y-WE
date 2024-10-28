import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error: any) {
    return error.message;
  }
};

export default connectMongoDB;
