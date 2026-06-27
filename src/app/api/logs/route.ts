import { NextRequest, NextResponse } from "next/server";
import { getDb, verifyToken } from "@/lib/db";

function requireAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return verifyToken(authHeader.split(" ")[1]);
}

// Logs API
export async function GET(req: NextRequest) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 });

  const db = getDb();
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  let logs;
  if (projectId) {
    logs = db.prepare("SELECT * FROM daily_logs WHERE project_id = ? ORDER BY created_at DESC").all(projectId);
  } else {
    logs = db.prepare(`
      SELECT l.*, p.name as project_name
      FROM daily_logs l
      JOIN projects p ON l.project_id = p.id
      WHERE p.owner_id = ?
      ORDER BY l.created_at DESC
      LIMIT 50
    `).all(payload.userId);
  }

  return NextResponse.json({ success: true, data: { items: logs } });
}

export async function POST(req: NextRequest) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 });

  const { type, content, weather, crewSize, projectId } = await req.json();
  if (!content || !projectId) {
    return NextResponse.json({ success: false, error: { message: "Content and project are required" } }, { status: 400 });
  }

  const db = getDb();
  const id = `log-${Date.now()}`;
  db.prepare("INSERT INTO daily_logs (id, type, content, weather, crew_size, project_id, author_id) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .run(id, type || "GENERAL", content, weather || null, crewSize || null, projectId, payload.userId);

  return NextResponse.json({ success: true, data: db.prepare("SELECT * FROM daily_logs WHERE id = ?").get(id) }, { status: 201 });
}
