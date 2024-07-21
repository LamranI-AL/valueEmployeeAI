import mongoose from "mongoose";

// Définir le schéma pour AiObject
const AiObjectSchema = new mongoose.Schema({
  text: { type: String, required: true },
  mots_negatifs: { type: [String], required: true },
  mots_positifs: { type: [String], required: true },
  statut: { type: String, required: true },
});

// Définir le schéma pour description
const DescriptionSchema = new mongoose.Schema({
  description: { type: String },
  date: { type: Date },
  user: { type: String },
  AIresult: { type: String },
});
const Description = mongoose.model("Description", DescriptionSchema);
export default Description;
