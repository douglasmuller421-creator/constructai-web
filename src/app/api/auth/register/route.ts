import { NextRequest, NextResponse } from "next/server";
import { getDb, createToken } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: { message: "All fields are required" } },
        { status: 400 }
      );
    }

    const db = getDb();
    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: { message: "Email already registered" } },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const id = `user-${Date.now()}`;
    db.prepare("INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)").run(id, email, hashedPassword, name);

    const token = createToken(id, email, "MANAGER");

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      data: { token, user: { id, email, name, role: "MANAGER" } },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
