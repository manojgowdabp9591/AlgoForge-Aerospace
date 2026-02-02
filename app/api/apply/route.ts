import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb"; // Import your new connection
import Application from "../../models/Application"; // Import your new model

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    // 1. Connect to MongoDB
    await connectDB();

    // 2. Save to Database
    await Application.create({
      name: data.get("name"),
      email: data.get("email"),
      role: data.get("role"),
      time: new Date().toISOString(),
    });

    console.log("Application saved to MongoDB");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}