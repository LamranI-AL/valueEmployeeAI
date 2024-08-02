import { Schema, model, models } from "mongoose";
// Schéma pour un seul message AI
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
// Modèle Mongoose
const UserModel = models.users || model("users", userSchema);
export default UserModel;
