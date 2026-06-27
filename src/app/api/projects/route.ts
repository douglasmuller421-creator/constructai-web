import { NextRequest, NextResponse } from "next/server";
import { getDb, verifyToken } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: { message: "Invalid token" } }, { status: 401 });
    }

    const db = getDb();
    const projects = db.prepare(`
      SELECT p.*,
        (SELECT COUNT(*) FROM costs WHERE project_id = p.id) as cost_count,
        (SELECT COALESCE(SUM(amount * quantity), 0) FROM costs WHERE project_id = p.id) as total_cost,
        (SELECT COUNT(*) FROM daily_logs WHERE project_id = p.id) as log_count
      FROM projects p
      WHERE p.owner_id = ?
      ORDER BY p.created_at DESC
    `).all(payload.userId);

    return NextResponse.json({ success: true, data: { items: projects } });
  } catch (error) {
    return NextResponse.json({ success: false, error: { message: "Server error" } }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: { message: "Invalid token" } }, { status: 401 });
    }

    const { name, description, status, location, budget, startDate, endDate } = await req.json();

    if (!name) {
      return NextResponse.json({ success: false, error: { message: "Project name is required" } }, { status: 400 });
    }

    const db = getDb();
    const id = `proj-${Date.now()}`;
    db.prepare(`
      INSERT INTO projects (id, name, description, status, location, budget, start_date, end_date, owner_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, name, description || null, status || "PLANNING", location || null, budget || 0, startDate || null, endDate || null, payload.userId);

    const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);
    return NextResponse.json({ success: true, data: project, message: "Project created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: { message: "Server error" } }, { status: 500 });
  }
}
