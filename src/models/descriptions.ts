import mongoose from "mongoose";

const DescriptionSchema = new mongoose.Schema({
  description: { type: String },
  date: { type: Date },
  user: { type: String },
  AIresult: { type: String },
  topicCustomId: { type: String },
});
const Description =
  mongoose.models.Description ||
  mongoose.model("Description", DescriptionSchema);
export default Description;
