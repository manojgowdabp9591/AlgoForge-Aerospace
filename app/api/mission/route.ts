import { NextResponse } from "next/server";

// ----------------------------------------------------------------------
// DEFAULT MISSION STATE
// ----------------------------------------------------------------------
const DEFAULT_STATE = {
  status: "STANDBY",
  missionTime: -60,
  maxAlt: 0,
  maxVel: 0,
  armed: false,
  countdown: 60,
  telemetry: {
    altitude: 0,
    velocity: 0,
    accel: 0,
    pitch: 0,
    roll: 0,
    stage: 0,
    lox: 100,
    methane: 100,
    thrust: 0,
    motor_temp: 22,
    battery: 100,
    signal: -45,
  },
  events: [
    { time: new Date().toISOString(), msg: "VORTEX COMMAND: Link Established", type: "info" }
  ]
};

// ----------------------------------------------------------------------
// GLOBAL MEMORY STORE
// This keeps the data alive across hot-reloads and API calls
// ----------------------------------------------------------------------
const globalAny = global as any;
if (!globalAny.missionState) {
  // Deep copy the default state to avoid mutating the original
  globalAny.missionState = JSON.parse(JSON.stringify(DEFAULT_STATE));
}

// ======================================================================
// GET: Fetch the live status (Used by Director & Public Dashboard)
// ======================================================================
export async function GET() {
  return NextResponse.json(globalAny.missionState);
}

// ======================================================================
// POST: Update the live status (Used by Director Dashboard)
// ======================================================================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let state = globalAny.missionState;

    // --- 1. HANDLE SYSTEM RESET ---
    if (body.reset) {
      globalAny.missionState = JSON.parse(JSON.stringify(DEFAULT_STATE));
      return NextResponse.json({ success: true, message: "MISSION_RESET" });
    }

    // --- 2. HANDLE NEW EVENTS/LOGS ---
    if (body.event) {
      state.events.unshift({
        time: new Date().toISOString(),
        msg: body.event.msg,
        type: body.event.type || "info"
      });
      // Keep only the last 50 events to prevent memory leaks
      if (state.events.length > 50) state.events.pop();
    }

    // --- 3. HANDLE TOP-LEVEL UPDATES (Status, Armed, Countdown, Time) ---
    if (body.status !== undefined) state.status = body.status;
    if (body.armed !== undefined) state.armed = body.armed;
    if (body.countdown !== undefined) {
      state.countdown = body.countdown;
      state.missionTime = -body.countdown; // Sync T- minus time
    }
    if (body.missionTime !== undefined) state.missionTime = body.missionTime;

    // --- 4. HANDLE TELEMETRY UPDATES ---
    if (body.telemetry) {
      state.telemetry = { ...state.telemetry, ...body.telemetry };
      
      // Auto-update max altitude and max velocity metrics
      if (state.telemetry.altitude > state.maxAlt) {
        state.maxAlt = state.telemetry.altitude;
      }
      if (state.telemetry.velocity > state.maxVel) {
        state.maxVel = state.telemetry.velocity;
      }
    }

    return NextResponse.json({ success: true, state });

  } catch (error) {
    console.error("API Error [POST /api/mission]:", error);
    return NextResponse.json({ success: false, error: "DATA_CORRUPTION" }, { status: 500 });
  }
}