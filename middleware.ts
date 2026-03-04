import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Let login pages through
  if (pathname.startsWith("/admin/login") || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // Protect /admin and /api/admin
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "RGVCy4P6XB3W346bNuoqDhZgdmmpTTQRyZDc3tLlzucd");
      const { payload } = await jwtVerify(token, secret);
      const role = payload.role as string;

      // --- ROLE-BASED ROUTING ---
      // Stop HR from accessing Mission Control
      if (pathname.startsWith("/admin/mission") && role !== "FLIGHT_DIRECTOR") {
        return NextResponse.redirect(new URL("/admin/applications", req.url)); 
      }
      
      // Stop Ground Control from accessing HR apps
      if (pathname.startsWith("/admin/applications") && role !== "HR_ADMIN") {
        return NextResponse.redirect(new URL("/admin/launch-pad", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      // If token is tampered with or expired, kick them out
      const response = NextResponse.redirect(new URL("/admin/login", req.url));
      response.cookies.delete("token"); 
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};