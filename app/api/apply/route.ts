import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb"; // Check if this path is correct for your project structure
import Application from "../../models/Application"; 

export async function POST(req: Request) {
  try {
    // ----------------------------------------------------------------
    // FIX 1: Use req.json() instead of req.formData()
    // The frontend sends "application/json", so formData() will crash.
    // ----------------------------------------------------------------
    const data = await req.json();

    // 1. Connect to MongoDB
    await connectDB();

    // 2. Save to Database
    await Application.create({
      name: data.name,
      email: data.email,
      role: data.role,
      message: data.message, // FIX 2: Ensure we save the mission statement
    });

    console.log("Application saved successfully");
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}