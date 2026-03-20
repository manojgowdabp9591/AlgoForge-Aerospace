export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from "next/server";
import mongoose from "mongoose";

const DEFAULT_MISSION_STATE = {
  id: "VORTEX_1", status: "OFFLINE", armed: false, maxAlt: 0, maxVel: 0,
  telemetry: { altitude: 0, velocity: 0, accel: 1, pitch: 0, roll: 0, stage: 0, lox: 100, methane: 100, thrust: 0, motor_temp: 22, battery: 100, signal: -120 },
  events: [], rx_status: "OFFLINE", serverAge: 99999
};

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Admin:AlgoAero2026@algoforgeaerospace.ohycryh.mongodb.net/?appName=AlgoForgeAerospace";

const MissionSchema = new mongoose.Schema({
  id: String, status: String, armed: Boolean, maxAlt: Number, maxVel: Number,
  telemetry: Object, events: Array, rx_status: { type: String, default: "OK" },
  lastUpdated: { type: Number, default: () => Date.now() }
}, { strict: false });

const Mission = mongoose.models.Mission || mongoose.model("Mission", MissionSchema);
let isConnected = false;

async function connectToDB() {
  if (isConnected || !MONGODB_URI) return;
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
  } catch (err) { console.error("DB Error:", err); }
}

export async function GET() {
  try {
    await connectToDB();
    if (!isConnected) return NextResponse.json(DEFAULT_MISSION_STATE);

    let mission = await Mission.findOne({ id: "VORTEX_1" });
    if (!mission) return NextResponse.json(DEFAULT_MISSION_STATE);

    const responseData = mission.toObject();
    responseData.serverAge = Date.now() - (responseData.lastUpdated || Date.now());
    
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(DEFAULT_MISSION_STATE);
  }
}

export async function POST(request: Request) {
  try {
    await connectToDB();
    if (!isConnected) return NextResponse.json({ error: "DB Offline" }, { status: 503 });

    const updates = await request.json();
    updates.lastUpdated = Date.now(); 

    const mission = await Mission.findOneAndUpdate(
      { id: "VORTEX_1" }, { $set: updates }, { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, mission });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}