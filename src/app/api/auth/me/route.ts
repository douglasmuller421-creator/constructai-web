import { NextRequest, NextResponse } from "next/server";
import { getDb, verifyToken } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: { message: "No token provided" } },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: { message: "Invalid token" } },
        { status: 401 }
      );
    }

    const db = getDb();
    const user = db.prepare("SELECT id, email, name, role FROM users WHERE id = ?").get(payload.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: "User not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
