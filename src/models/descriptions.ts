import mongoose from "mongoose";

const descriptionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: Date,
  user: String,
});
const Description = mongoose.model("Description", descriptionSchema);
export default Description;
