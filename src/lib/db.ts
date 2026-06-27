import Database from "better-sqlite3";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const DB_PATH = path.join(process.cwd(), "data.db");
const JWT_SECRET = process.env.JWT_SECRET || "constructai-secret-key-change-in-production";

let db: Database.Database;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initDb();
  }
  return db;
}

function initDb() {
  const db = getDb();
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'MANAGER',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'PLANNING',
      location TEXT,
      budget REAL DEFAULT 0,
      start_date TEXT,
      end_date TEXT,
      owner_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS costs (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      amount REAL NOT NULL,
      quantity REAL DEFAULT 1,
      unit TEXT,
      project_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id)
    );

    CREATE TABLE IF NOT EXISTS daily_logs (
      id TEXT PRIMARY KEY,
      type TEXT DEFAULT 'GENERAL',
      content TEXT NOT NULL,
      summary TEXT,
      weather TEXT,
      crew_size INTEGER,
      project_id TEXT NOT NULL,
      author_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id)
    );

    CREATE TABLE IF NOT EXISTS subcontractors (
      id TEXT PRIMARY KEY,
      company_name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      city TEXT,
      trade_categories TEXT,
      status TEXT DEFAULT 'ACTIVE',
      risk_level TEXT DEFAULT 'LOW',
      rating REAL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed demo data if empty
  const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
  if (userCount.count === 0) {
    const hashedPassword = bcrypt.hashSync("Password123", 12);
    db.prepare("INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)").run(
      "user-1", "demo@construction.com", hashedPassword, "John Manager"
    );

    // Seed projects
    const projects = [
      { id: "proj-1", name: "Downtown Office Renovation", description: "Full interior renovation of 5-story office building", status: "ACTIVE", location: "123 Main St, London", budget: 250000, ownerId: "user-1" },
      { id: "proj-2", name: "Residential Complex Phase 1", description: "Foundation and framing for 3 residential buildings", status: "PLANNING", location: "456 Oak Ave, Manchester", budget: 850000, ownerId: "user-1" },
      { id: "proj-3", name: "Warehouse Extension", description: "Adding 10,000 sq ft logistics warehouse extension", status: "ACTIVE", location: "789 Industrial Blvd, Birmingham", budget: 420000, ownerId: "user-1" },
      { id: "proj-4", name: "Retail Unit Fit-Out", description: "Complete fit-out for high street retail space", status: "COMPLETED", location: "12 High Street, Leeds", budget: 180000, ownerId: "user-1" },
    ];

    const insertProject = db.prepare("INSERT INTO projects (id, name, description, status, location, budget, owner_id, start_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    projects.forEach((p, i) => {
      const startDate = new Date(2026, 1 + i * 2, 1).toISOString().split("T")[0];
      insertProject.run(p.id, p.name, p.description, p.status, p.location, p.budget, p.ownerId, startDate);
    });

    // Seed costs
    const costs = [
      { category: "MATERIALS", description: "Steel beams and structural materials", amount: 45000, projectId: "proj-1" },
      { category: "LABOR", description: "Foundation crew - week 1-4", amount: 12500, projectId: "proj-1" },
      { category: "EQUIPMENT", description: "Excavator rental", amount: 3200, quantity: 2, unit: "weeks", projectId: "proj-1" },
      { category: "MATERIALS", description: "Concrete delivery", amount: 28000, projectId: "proj-2" },
      { category: "LABOR", description: "Framing team", amount: 18000, projectId: "proj-2" },
      { category: "MATERIALS", description: "Roofing materials", amount: 55000, projectId: "proj-3" },
      { category: "SUBCONTRACTOR", description: "Electrical rough-in", amount: 22000, projectId: "proj-4" },
      { category: "LABOR", description: "Fit-out crew", amount: 35000, projectId: "proj-4" },
    ];

    const insertCost = db.prepare("INSERT INTO costs (id, category, description, amount, quantity, unit, project_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
    costs.forEach((c, i) => {
      insertCost.run(`cost-${i + 1}`, c.category, c.description, c.amount, c.quantity || 1, c.unit || null, c.projectId);
    });

    // Seed logs
    const logs = [
      { type: "PROGRESS", content: "Completed foundation pour for section A. Weather was clear, crew of 8 on site. Concrete delivery arrived on schedule.", weather: "Clear, 18C", crewSize: 8, projectId: "proj-1" },
      { type: "SAFETY", content: "Safety inspection completed. All PPE in order. No incidents reported.", projectId: "proj-1" },
      { type: "PROGRESS", content: "Steel frame erection began on schedule. Crane arrived on time and setup completed without issues.", weather: "Partly cloudy, 16C", crewSize: 12, projectId: "proj-3" },
      { type: "DELAY", content: "Steel delivery delayed by 3 days due to supplier issues. Revised delivery date confirmed.", weather: "Rain, 14C", crewSize: 6, projectId: "proj-3" },
      { type: "INSPECTION", content: "Building inspector visited site. All work approved to proceed. No corrective actions required.", projectId: "proj-2" },
    ];

    const insertLog = db.prepare("INSERT INTO daily_logs (id, type, content, weather, crew_size, project_id, author_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
    logs.forEach((l, i) => {
      insertLog.run(`log-${i + 1}`, l.type, l.content, l.weather || null, l.crewSize || null, l.projectId, "user-1");
    });

    // Seed subcontractors
    const subs = [
      { companyName: "ABC Electrical Ltd", email: "info@abcelec.co.uk", phone: "020 7946 0958", city: "London", tradeCategories: "Electrical,Fire Alarm,Security", riskLevel: "LOW", rating: 4.5 },
      { companyName: "XYZ Plumbing & Heating", email: "jobs@xyzplumbing.co.uk", phone: "0161 496 0321", city: "Manchester", tradeCategories: "Plumbing,HAS,Gas", riskLevel: "LOW", rating: 4.2 },
      { companyName: "SteelFrame Solutions", email: "contact@steelframe.co.uk", phone: "0121 496 0123", city: "Birmingham", tradeCategories: "Structural Steel,Cladding", riskLevel: "MEDIUM", rating: 3.8 },
      { companyName: "BuildRight Contractors", email: "info@buildright.co.uk", phone: "0113 496 0456", city: "Leeds", tradeCategories: "General Building,Landscaping", riskLevel: "LOW", rating: 4.8 },
    ];

    const insertSub = db.prepare("INSERT INTO subcontractors (id, company_name, email, phone, city, trade_categories, risk_level, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    subs.forEach((s, i) => {
      insertSub.run(`sub-${i + 1}`, s.companyName, s.email, s.phone, s.city, s.tradeCategories, s.riskLevel, s.rating);
    });
  }
}

export function createToken(userId: string, email: string, role: string): string {
  return jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string; email: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string };
  } catch {
    return null;
  }
}

export { getDb };
