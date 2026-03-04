import { NextResponse } from "next/server";
import { SignJWT } from "jose";

// Temporary mock database to test your roles
const USERS = [
  {
    username: process.env.ADMIN_USER || "admin@algoforge.com",
    password: process.env.ADMIN_PASSWORD || "ASpace2026!",
    role: "HR_ADMIN",
    redirect: "/admin/applications"
  },
  {
    username: process.env.DIRECTOR_USER || "director@algoforge.com",
    password: process.env.DIRECTOR_PASSWORD || "ASpace2026!",
    role: "FLIGHT_DIRECTOR",
    redirect: "/admin/mission"
  },
  {
    username: process.env.GROUND_USER || "gnc@algoforge.com",
    password: process.env.GROUND_PASSWORD || "ASpace2026!",
    role: "GROUND_CONTROL",
    redirect: "/admin/launch-pad"
  }
];

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Find the matching user in our list
  const user = USERS.find(u => u.username === username && u.password === password);

  if (user) {
    // Make sure you have JWT_SECRET in your .env.local file!
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "RGVCy4P6XB3W346bNuoqDhZgdmmpTTQRyZDc3tLlzucd");
    
    // Create the secure JWT
    const token = await new SignJWT({
      username: user.username,
      role: user.role
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    // Tell the frontend it worked and where to send the user
    const response = NextResponse.json({ 
      success: true, 
      role: user.role,
      redirectTo: user.redirect 
    });

    // Set the token matching what middleware expects
    response.cookies.set({
      name: "token", 
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: "INVALID_CREDENTIALS" },
    { status: 401 }
  );
}