import mongoose from "mongoose";

const TopicModel = new mongoose.Schema(
  {
    title: String,
    description: { type: String },
    author: String,
    date: { type: Date, default: Date.now },
    img: { type: String },
  },
  {
    timestamps: true,
  }
);
const Topic = mongoose.models.Topic || mongoose.model("Topic", TopicModel);
export default Topic;
