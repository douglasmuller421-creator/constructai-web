import { NextRequest, NextResponse } from "next/server";
import { getDb, verifyToken } from "@/lib/db";

function requireAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return verifyToken(authHeader.split(" ")[1]);
}

// Subcontractors API
export async function GET(req: NextRequest) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 });

  const db = getDb();
  const subs = db.prepare("SELECT * FROM subcontractors ORDER BY company_name").all();

  return NextResponse.json({ success: true, data: { items: subs } });
}

export async function POST(req: NextRequest) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 });

  const { companyName, email, phone, city, tradeCategories } = await req.json();
  if (!companyName) {
    return NextResponse.json({ success: false, error: { message: "Company name is required" } }, { status: 400 });
  }

  const db = getDb();
  const id = `sub-${Date.now()}`;
  db.prepare("INSERT INTO subcontractors (id, company_name, email, phone, city, trade_categories) VALUES (?, ?, ?, ?, ?, ?)")
    .run(id, companyName, email || null, phone || null, city || null, tradeCategories || null);

  return NextResponse.json({ success: true, data: db.prepare("SELECT * FROM subcontractors WHERE id = ?").get(id) }, { status: 201 });
}
