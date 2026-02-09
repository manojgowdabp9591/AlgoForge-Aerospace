export const runtime = "nodejs";

import { cookies } from "next/headers";
import { signAdminToken } from "@/app/lib/auth"; // Ensure path matches
import { NextResponse } from "next/server";

const ADMIN_EMAIL = "admin@vortexspace.com";
const ADMIN_PASSWORD = "VSpace2026!";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Check Credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 2. Create Token
    const token = signAdminToken({ email });

    // 3. Set Cookie (FIXED SETTINGS)
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // False on localhost, True on Vercel
      sameSite: "lax", // FIX: "Lax" is much safer than "Strict" for redirects
      path: "/",
      maxAge: 60 * 60 * 24, // 1 Day
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}