import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Application from "../../../models/Application";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log("--- VORTEX COMMAND: DATA UPLINK REQUESTED ---");

    // 1. Establish the connection to MongoDB
    await connectDB();

    // 2. Fetch all applications from the database. 
    // .sort({ createdAt: -1 }) puts the newest applications at the top of the dashboard.
    const applications = await Application.find().sort({ createdAt: -1 });

    console.log(`-> Uplink Successful. Transmitting ${applications.length} dossiers.`);

    // 3. Send the real database data back to the AdminPage.tsx frontend
    return NextResponse.json(applications, { status: 200 });

  } catch (error: any) {
    console.error("🔥 VORTEX COMMAND ERROR:", error.message);
    
    return NextResponse.json(
      { error: "Failed to retrieve personnel data from the database." }, 
      { status: 500 }
    );
  }
}