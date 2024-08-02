import { AiMessage, AIMessages } from "@/interfaces/Interface";
import { Schema, model, models } from "mongoose";
// Schéma pour un seul message AI
const aiMessageSchema = new Schema<AiMessage>({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  experimental_attachments: { type: String },
  id: { type: String },
  role: { type: String, required: true },
});

// Schéma pour les messages AI
const aiMessagesSchema = new Schema<AIMessages>({
  messages: { type: [aiMessageSchema], required: true },
  createdUser: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Modèle Mongoose
const AIMessagesModel =
  models.AIMessages || model<AIMessages>("AIMessages", aiMessagesSchema);
export default AIMessagesModel;
