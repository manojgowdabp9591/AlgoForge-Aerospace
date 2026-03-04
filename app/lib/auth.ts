import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "RGVCy4P6XB3W346bNuoqDhZgdmmpTTQRyZDc3tLlzucd");
    const { payload } = await jwtVerify(token, secret);
    
    // Returns { username: "director", role: "FLIGHT_DIRECTOR", ... }
    return payload; 
  } catch (err) {
    return null;
  }
}