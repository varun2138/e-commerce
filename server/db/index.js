import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `MongoDB connection at host !! ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection failed !!!", error.message);
    process.exit(1);
  }
};

export default connectDB;
