import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  DollarSign,
  ClipboardList,
  Shield,
  Users,
  FileText,
  BarChart3,
  Bot,
  Settings,
  HardHat,
  Search,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, active: true },
  { name: "Projects", href: "/projects", icon: FolderKanban, active: false },
  { name: "Costs", href: "/costs", icon: DollarSign, active: false },
  { name: "Daily Logs", href: "/logs", icon: ClipboardList, active: false },
  { name: "Safety", href: "/safety", icon: Shield, active: false },
  { name: "Subcontractors", href: "/subcontractors", icon: Users, active: false },
  { name: "Documents", href: "/documents", icon: FileText, active: false },
  { name: "Reports", href: "/reports", icon: BarChart3, active: false },
  { name: "AI Assistant", href: "/ai", icon: Bot, active: false },
];

export default function Home() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 256,
          background: "#1e293b",
          color: "white",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 20px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: "#f97316",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HardHat size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>ConstructAI</div>
            <div style={{ fontSize: 10, opacity: 0.5 }}>AI Construction Platform</div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 8,
                marginBottom: 4,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                background: item.active ? "#f97316" : "transparent",
                color: item.active ? "white" : "rgba(255,255,255,0.6)",
              }}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div style={{ marginLeft: 256, flex: 1 }}>
        {/* Header */}
        <header
          style={{
            height: 64,
            background: "white",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            position: "fixed",
            top: 0,
            left: 256,
            right: 0,
            zIndex: 10,
          }}
        >
          <div style={{ position: "relative" }}>
            <Search
              size={16}
              style={{ position: "absolute", left: 12, top: 10, color: "#94a3b8" }}
            />
            <input
              placeholder="Search projects, logs, documents..."
              style={{
                height: 40,
                width: 280,
                paddingLeft: 40,
                paddingRight: 16,
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 14,
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <Bell size={20} color="#64748b" />
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#dc2626",
                }}
              />
            </button>
            <button
              style={{
                height: 40,
                padding: "0 12px",
                borderRadius: 8,
                background: "#fff7ed",
                color: "#c2410c",
                border: "none",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Bot size={16} />
              AI Assistant
            </button>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#f97316",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              JM
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: "88px 24px 24px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>
              Dashboard
            </h1>
            <p style={{ fontSize: 14, color: "#64748b" }}>
              Overview of your construction projects
            </p>
          </div>

          {/* KPI Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              marginBottom: 24,
            }}
          >
            {[
              {
                title: "Active Projects",
                value: "24",
                change: "+2 this month",
                trend: "up",
                color: "#f97316",
              },
              {
                title: "Budget Utilized",
                value: "78%",
                change: "+12% vs last month",
                trend: "down",
                color: "#2563eb",
              },
              {
                title: "Open Safety Issues",
                value: "8",
                change: "-3 resolved",
                trend: "up",
                color: "#dc2626",
              },
              {
                title: "AI Risk Score",
                value: "12%",
                change: "Low risk",
                trend: "neutral",
                color: "#16a34a",
              },
            ].map((kpi) => (
              <div
                key={kpi.title}
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: 20,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <p style={{ fontSize: 14, color: "#64748b" }}>{kpi.title}</p>
                    <p style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>
                      {kpi.value}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                      {kpi.trend === "up" && <ArrowUpRight size={16} color="#16a34a" />}
                      {kpi.trend === "down" && <ArrowDownRight size={16} color="#dc2626" />}
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: kpi.trend === "up" ? "#16a34a" : kpi.trend === "down" ? "#dc2626" : "#64748b",
                        }}
                      >
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 8,
                      background: "#fff7ed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FolderKanban size={20} color={kpi.color} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 24,
            }}
          >
            {/* Project Progress */}
            <div
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
                Project Progress
              </h3>
              {[
                { name: "Office Renovation", progress: 78 },
                { name: "Residential Complex", progress: 32 },
                { name: "Warehouse Extension", progress: 65 },
                { name: "Retail Unit", progress: 90 },
              ].map((p) => (
                <div key={p.name} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 14,
                      marginBottom: 4,
                    }}
                  >
                    <span>{p.name}</span>
                    <span style={{ color: "#64748b" }}>{p.progress}%</span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      background: "#f1f5f9",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${p.progress}%`,
                        background: "#f97316",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Budget Chart */}
            <div
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
                Budget vs Actual
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  height: 144,
                  gap: 8,
                }}
              >
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
                  <div
                    key={m}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 2,
                        height: 112,
                      }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: `${60 + i * 8}%`,
                          background: "#fb923c",
                          borderRadius: "4px 4px 0 0",
                        }}
                      />
                      <div
                        style={{
                          width: 12,
                          height: `${50 + i * 10}%`,
                          background: "#60a5fa",
                          borderRadius: "4px 4px 0 0",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 10, color: "#64748b" }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity + Deadlines */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <h3 style={{ fontSize: 14, fontWeight: 600 }}>Recent Activity</h3>
                <button style={{ fontSize: 12, color: "#f97316", border: "none", background: "none", cursor: "pointer" }}>
                  View All
                </button>
              </div>
              {[
                "Project A updated",
                "Safety report submitted",
                "New subcontractor added",
                "Cost estimate generated",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 20px",
                    borderBottom: "1px solid #f1f5f9",
                    fontSize: 14,
                  }}
                >
                  {item}
                  <span style={{ marginLeft: 8, fontSize: 12, color: "#94a3b8" }}>
                    {i + 1}h ago
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <h3 style={{ fontSize: 14, fontWeight: 600 }}>Upcoming Deadlines</h3>
                <button style={{ fontSize: 12, color: "#f97316", border: "none", background: "none", cursor: "pointer" }}>
                  View Calendar
                </button>
              </div>
              {[
                { title: "Tender Due", date: "Tomorrow", urgent: true },
                { title: "RAMS Review", date: "Jun 28", urgent: false },
                { title: "Inspection", date: "Jul 1", urgent: false },
                { title: "Material Delivery", date: "Jul 3", urgent: false },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 20px",
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  {item.urgent && (
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#dc2626",
                      }}
                    />
                  )}
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 20px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <TrendingUp size={16} color="#f97316" />
              <h3 style={{ fontSize: 14, fontWeight: 600 }}>AI Recommendations</h3>
            </div>
            {[
              { type: "warning", text: "Project Alpha may be delayed 6 days" },
              { type: "danger", text: "Concrete package exceeds estimate by 18%" },
              { type: "warning", text: "Safety incidents trending upward" },
              { type: "success", text: "Electrical package on schedule" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 20px",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      item.type === "warning"
                        ? "#f97316"
                        : item.type === "danger"
                        ? "#dc2626"
                        : "#16a34a",
                  }}
                />
                <span style={{ fontSize: 14 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
