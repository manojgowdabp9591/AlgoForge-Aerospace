import { NextResponse } from "next/server";
import { applications } from "../../lib/store";

export async function POST(req: Request) {
  const data = await req.formData();

  applications.push({
    // Add 'as string' to fix the type error
    name: data.get("name") as string,
    email: data.get("email") as string,
    role: data.get("role") as string,
    time: new Date().toISOString(),
  });

  console.log("NEW APPLICATION:", Object.fromEntries(data));

  return NextResponse.json({ success: true });
}