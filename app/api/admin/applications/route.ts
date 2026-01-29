import { connectDB } from "@/app/lib/mongodb";
import Application from "@/app/models/Application";

export async function GET() {
  await connectDB();
  const apps = await Application.find().sort({ createdAt: -1 });
  return Response.json(apps);
}
