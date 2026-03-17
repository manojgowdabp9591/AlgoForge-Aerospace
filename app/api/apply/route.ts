import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb"; 
import Application from "../../models/Application"; 

export async function POST(req: Request) {
  try {
    console.log("--- NEW APPLICATION INCOMING ---");
    
    // 1. Parse the incoming JSON
    const data = await req.json();
    console.log("1. Payload Parsed:", data);

    // 2. Connect to Database
    console.log("2. Attempting Database Connection...");
    await connectDB();
    console.log("-> Database Connected Successfully.");

    // 3. Save to Database
    console.log("3. Writing to MongoDB...");
    const newApp = await Application.create({
      name: data.name,    
      email: data.email,  
      role: data.role,     
      message: data.message,
      resumeName: data.resumeName,
      resumeBase64: data.resumeBase64
    });
    console.log("-> Write Successful. Document ID:", newApp._id);

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: any) {
    // This will now print the EXACT reason it failed in your VS Code terminal
    console.error("🔥 API CRITICAL ERROR:", error.message);
    console.error("Full Error Dump:", error);
    
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}