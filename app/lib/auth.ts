// app/lib/auth.ts

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not defined");
}

export type AdminPayload = {
  email: string;
};

// Create JWT
export function signAdminToken(payload: AdminPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
}

// Verify JWT (used ONLY in Node APIs, not middleware)
export function verifyAdminToken(token: string): AdminPayload {
  return jwt.verify(token, JWT_SECRET) as AdminPayload;
}
