export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from "next/server";
import mongoose from "mongoose";

const DEFAULT_MISSION_STATE = {
  id: "VORTEX_1", status: "OFFLINE", armed: false, maxAlt: 0, maxVel: 0,
  telemetry: { altitude: 0, velocity: 0, accel: 1.0, pitch: 0, roll: 0, stage: 0, lox: 100, methane: 100, thrust: 0, motor_temp: 22, battery: 100, signal: -120 },
  events: [], rx_status: "OFFLINE", serverAge: 99999
};

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Admin:AlgoAero2026@algoforgeaerospace.ohycryh.mongodb.net/?appName=AlgoForgeAerospace";

const MissionSchema = new mongoose.Schema({
  id: String, status: String, armed: Boolean, maxAlt: Number, maxVel: Number,
  telemetry: { type: Object, default: {} }, 
  events: Array, 
  rx_status: { type: String, default: "OK" },
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
    
    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    return NextResponse.json(DEFAULT_MISSION_STATE);
  }
}

export async function POST(request: Request) {
  try {
    await connectToDB();
    if (!isConnected) return NextResponse.json({ error: "DB Offline" }, { status: 503 });

    const incoming = await request.json();
    
    // 1. Grab the existing database document
    let mission = await Mission.findOne({ id: "VORTEX_1" });
    if (!mission) {
      mission = new Mission({ id: "VORTEX_1", telemetry: DEFAULT_MISSION_STATE.telemetry });
    }

    // 2. Update the top-level trackers
    if (incoming.rx_status) mission.rx_status = incoming.rx_status;
    if (incoming.status) mission.status = incoming.status;
    if (incoming.armed !== undefined) mission.armed = incoming.armed;
    mission.lastUpdated = Date.now();

    // 3. Update the Telemetry
    if (incoming.telemetry) {
      mission.telemetry = {
        ...mission.telemetry,
        ...incoming.telemetry
      };
      
      // THE FIX: We must explicitly yell at Mongoose to save this object!
      mission.markModified('telemetry'); 
    }
    
    // 4. Update the Comms Terminal
    if (incoming.event) {
        mission.events.push(incoming.event);
        if (mission.events.length > 50) mission.events.shift(); // Keep last 50
        mission.markModified('events');
    } else if (incoming.events) {
        mission.events = incoming.events;
        mission.markModified('events');
    }

    // 5. Force the save to the cloud
    await mission.save();

    return NextResponse.json({ success: true, mission });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}