import mongoose from "mongoose";

const TopicModel = new mongoose.Schema({
  title: String,
  description: { type: String },
  author: String,
  date: { type: Date, default: Date.now },
  img: { type: String },
  customId: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
const Topic = mongoose.models.Topics || mongoose.model("Topics", TopicModel);
export default Topic;
