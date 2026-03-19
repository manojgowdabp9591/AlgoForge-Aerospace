import { NextResponse } from "next/server";
import mongoose from "mongoose";

// 1. Connect to your existing MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Admin:AlgoAero2026@algoforgeaerospacefligh.7xtcewt.mongodb.net/?appName=AlgoForgeAerospaceFlight";

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI);
}

// 2. Define the Mission Schema
const MissionSchema = new mongoose.Schema({
  id: { type: String, default: "ORBITON_1" },
  status: { type: String, default: "STANDBY" },
  armed: { type: Boolean, default: false },
  telemetry: {
    altitude: { type: Number, default: 0 },
    accelZ: { type: Number, default: 1 },
    maxAltitude: { type: Number, default: 0 },
    rssi: { type: Number, default: -100 },
    stage: { type: Number, default: 0 },
    lox: { type: Number, default: 100 },
    methane: { type: Number, default: 100 }
  },
  events: { type: Array, default: [] }
}, { strict: false });

const Mission = mongoose.models.Mission || mongoose.model("Mission", MissionSchema);

// GET: Your UI dashboards poll this to see the live data
export async function GET() {
  try {
    let mission = await Mission.findOne({ id: "ORBITON_1" });
    if (!mission) {
      mission = await Mission.create({ id: "ORBITON_1" }); // Create default if missing
    }
    return NextResponse.json(mission);
  } catch (error) {
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
}

// POST: Node 3 (ESP32) and the UIs post here to update the data
export async function POST(request: Request) {
  try {
    const updates = await request.json();
    
    // Find the mission and update only the fields provided
    const mission = await Mission.findOneAndUpdate(
      { id: "ORBITON_1" },
      { $set: updates },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, mission });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update mission" }, { status: 500 });
  }
}