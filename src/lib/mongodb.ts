import mongoose from "mongoose";

export default async function connectMongodb() {
  try {
    await mongoose
      .connect(
        "mongodb+srv://lamraniotman:lamraniotman000@contatcs.7z1sp7e.mongodb.net/"
      )
      .then(() => {});
  } catch (error) {
    console.log(error);
  }
}
