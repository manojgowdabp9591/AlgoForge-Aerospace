import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "RGVCy4P6XB3W346bNuoqDhZgdmmpTTQRyZDc3tLlzucd";

export function signAdminToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
}
