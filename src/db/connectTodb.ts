import mongoose from "mongoose";
const connectionString = process.env.CONNECTION_DB_URL;
export const connectTodb = async () => {
  console.log(connectionString);
  if (mongoose.connection.readyState == 1) {
    console.log("you are already connected to the database");
    return;
  }
  try {
    await mongoose.connect(connectionString as string, {
      serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
    });
    console.log("you are connecting to the database");
  } catch (error) {
    console.error("ca not connect to mongodb : " + error);
    throw new Error("error of connecting to mongodb");
  }
};
