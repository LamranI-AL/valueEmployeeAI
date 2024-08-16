import mongoose from "mongoose";

const NoteModel = new mongoose.Schema({
  title: String,
  description: { type: String },
  author: String,
  date: { type: Date, default: Date.now },
});
const Note = mongoose.models.Note || mongoose.model("Note", NoteModel);
export default Note;
