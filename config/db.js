import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("MonogoDB connected...");
  } catch (err) {
    console.error(err.message);

    // exit process with failure
    process.exit(1);
  }
};

export default connectDB;
