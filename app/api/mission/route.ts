import { NextResponse } from "next/server";
import mongoose from "mongoose";

// The default state if the rocket is off or the database is empty
const DEFAULT_MISSION_STATE = {
  id: "VORTEX_1",
  status: "OFFLINE",
  armed: false,
  maxAlt: 0,
  maxVel: 0,
  telemetry: {
    altitude: 0, velocity: 0, accel: 1, pitch: 0, roll: 0, stage: 0,
    lox: 100, methane: 100, thrust: 0, motor_temp: 22, battery: 100, signal: -120
  },
  events: [{ time: new Date().toISOString(), msg: "SYSTEM: Awaiting Ground Station Uplink...", type: "warning" }]
};

const MONGODB_URI = process.env.MONGODB_URI || "";

// Define the Mission Schema
const MissionSchema = new mongoose.Schema({
  id: String,
  status: String,
  armed: Boolean,
  maxAlt: Number,
  maxVel: Number,
  telemetry: Object,
  events: Array
}, { strict: false });

// Safely get or compile the model
const Mission = mongoose.models.Mission || mongoose.model("Mission", MissionSchema);

// Connection cache for serverless environments
let isConnected = false;

async function connectToDB() {
  if (isConnected || !MONGODB_URI) return;
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}

// GET: Mission Control polls this
export async function GET() {
  try {
    await connectToDB();
    if (!isConnected) return NextResponse.json(DEFAULT_MISSION_STATE);

    let mission = await Mission.findOne({ id: "VORTEX_1" });
    
    // If database is working but rocket hasn't sent data yet, return the default
    if (!mission) {
      return NextResponse.json(DEFAULT_MISSION_STATE);
    }
    
    return NextResponse.json(mission);
  } catch (error) {
    // NEVER crash. Just return the default offline state.
    return NextResponse.json(DEFAULT_MISSION_STATE);
  }
}

// POST: Ground Station updates this
export async function POST(request: Request) {
  try {
    await connectToDB();
    if (!isConnected) return NextResponse.json({ error: "DB Offline" }, { status: 503 });

    const updates = await request.json();
    const mission = await Mission.findOneAndUpdate(
      { id: "VORTEX_1" },
      { $set: updates },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, mission });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}