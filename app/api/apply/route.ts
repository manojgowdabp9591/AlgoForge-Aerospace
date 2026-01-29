import { connectDB } from "@/app/lib/mongodb";
import Application from "@/app/models/Application";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  await Application.create({
    name: body.name,
    email: body.email,
    role: body.role,
    message: body.message,
  });

  return Response.json({ success: true });
}
