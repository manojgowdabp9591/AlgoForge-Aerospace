// app/api/apply/route.ts

import { applications } from "@/app/lib/store";

export async function POST(req: Request) {
  const data = await req.formData();

  applications.push({
    name: String(data.get("name")),
    email: String(data.get("email")),
    role: String(data.get("role")),
    message: String(data.get("message")),
    time: new Date().toLocaleString(),
  });

  return Response.json({ success: true });
}
