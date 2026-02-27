import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
