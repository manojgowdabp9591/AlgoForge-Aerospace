import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    role: String,
    message: String,
    status: {
      type: String,
      default: "NEW",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
