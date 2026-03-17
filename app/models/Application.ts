import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  message: { type: String, required: false }, 
  resumeName: { type: String, required: false },
  resumeBase64: { type: String, required: false }
}, { timestamps: true });

const Application = mongoose.models.Application || mongoose.model("Application", ApplicationSchema);

export default Application;
