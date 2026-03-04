import { NextRequest, NextResponse } from "next/server";

// In-memory state (use Redis/DB for production)
let missionState = {
  status: "STANDBY",
  countdown: 600,
  armed: false,
  telemetry: {
    altitude: 0, velocity: 0, accel: 9.8,
    pitch: 0, roll: 0, stage: 0,
    lox: 100, methane: 100,
    thrust: 0, motor_temp: 25,
    battery: 100, signal: -60,
  },
  maxAlt: 0,
  maxVel: 0,
  missionTime: 0,
  events: [] as { time: string; msg: string; type: string }[],
};

export async function GET() {
  return NextResponse.json(missionState);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.telemetry) {
    missionState.telemetry = { ...missionState.telemetry, ...body.telemetry };
    missionState.maxAlt = Math.max(missionState.maxAlt, body.telemetry.altitude ?? 0);
    missionState.maxVel = Math.max(missionState.maxVel, body.telemetry.velocity ?? 0);
  }
  if (body.status)    missionState.status    = body.status;
  if (body.countdown !== undefined) missionState.countdown = body.countdown;
  if (body.armed !== undefined)     missionState.armed     = body.armed;
  if (body.missionTime !== undefined) missionState.missionTime = body.missionTime;
  if (body.event) {
    missionState.events.unshift({ time: new Date().toISOString(), ...body.event });
    missionState.events = missionState.events.slice(0, 100);
  }
  if (body.reset) {
    missionState = {
      ...missionState,
      status: "STANDBY", countdown: 600, armed: false,
      maxAlt: 0, maxVel: 0, missionTime: 0, events: [],
      telemetry: { ...missionState.telemetry, altitude: 0, velocity: 0, stage: 0 }
    };
  }

  return NextResponse.json({ ok: true });
}
