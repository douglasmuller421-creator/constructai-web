import { NextRequest, NextResponse } from "next/server";
import { getDb, verifyToken } from "@/lib/db";

function requireAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return verifyToken(authHeader.split(" ")[1]);
}

// Costs API
export async function GET(req: NextRequest) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 });

  const db = getDb();
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  let costs;
  if (projectId) {
    costs = db.prepare("SELECT * FROM costs WHERE project_id = ? ORDER BY created_at DESC").all(projectId);
  } else {
    costs = db.prepare(`
      SELECT c.*, p.name as project_name
      FROM costs c
      JOIN projects p ON c.project_id = p.id
      WHERE p.owner_id = ?
      ORDER BY c.created_at DESC
    `).all(payload.userId);
  }

  return NextResponse.json({ success: true, data: { items: costs } });
}

export async function POST(req: NextRequest) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 });

  const { category, description, amount, quantity, unit, projectId } = await req.json();
  if (!category || !description || !amount || !projectId) {
    return NextResponse.json({ success: false, error: { message: "Missing required fields" } }, { status: 400 });
  }

  const db = getDb();
  const id = `cost-${Date.now()}`;
  db.prepare("INSERT INTO costs (id, category, description, amount, quantity, unit, project_id) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .run(id, category, description, amount, quantity || 1, unit || null, projectId);

  return NextResponse.json({ success: true, data: db.prepare("SELECT * FROM costs WHERE id = ?").get(id) }, { status: 201 });
}
