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
  Plus,
  Filter,
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
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: "#0f172a",
          color: "white",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo */}
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              background: "#1e40af",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HardHat size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: 0.3 }}>
              ConstructAI
            </div>
            <div style={{ fontSize: 10, opacity: 0.4, marginTop: 2 }}>
              AI Construction Platform
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: "rgba(255,255,255,0.3)",
              padding: "0 12px",
              marginBottom: 8,
            }}
          >
            Main Menu
          </div>
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
                marginBottom: 2,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                background: item.active ? "#1e40af" : "transparent",
                color: item.active ? "white" : "rgba(255,255,255,0.6)",
                transition: "all 0.15s",
              }}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}

          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.08)",
              margin: "16px 0",
            }}
          />

          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: "rgba(255,255,255,0.3)",
              padding: "0 12px",
              marginBottom: 8,
            }}
          >
            Account
          </div>
          <Link
            href="/settings"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <Settings size={18} />
            Settings
          </Link>
        </nav>

        {/* User */}
        <div
          style={{
            padding: 16,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#1e40af",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            JM
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>John Manager</div>
            <div style={{ fontSize: 11, opacity: 0.4 }}>john@construct.co</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ marginLeft: 260, flex: 1 }}>
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
            left: 260,
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
                width: 320,
                paddingLeft: 40,
                paddingRight: 16,
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 14,
                background: "#f8fafc",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                padding: "0 14px",
                borderRadius: 8,
                background: "#1e40af",
                color: "white",
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
          </div>
        </header>

        {/* Content */}
        <main style={{ padding: "88px 24px 24px" }}>
          {/* Page Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>
                Dashboard
              </h1>
              <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
                Welcome back, John. Here&apos;s your project overview.
              </p>
            </div>
            <button
              style={{
                height: 40,
                padding: "0 16px",
                borderRadius: 8,
                background: "#1e40af",
                color: "white",
                border: "none",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Plus size={16} />
              New Project
            </button>
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
                icon: <FolderKanban size={20} color="#1e40af" />,
                bg: "#eff6ff",
              },
              {
                title: "Budget Utilized",
                value: "78%",
                change: "+12% vs last month",
                trend: "down",
                icon: <DollarSign size={20} color="#1e40af" />,
                bg: "#eff6ff",
              },
              {
                title: "Open Safety Issues",
                value: "8",
                change: "-3 resolved",
                trend: "up",
                icon: <Shield size={20} color="#dc2626" />,
                bg: "#fef2f2",
              },
              {
                title: "AI Risk Score",
                value: "Low",
                valueSub: "12%",
                change: "Stable",
                trend: "neutral",
                icon: <TrendingUp size={20} color="#16a34a" />,
                bg: "#f0fdf4",
              },
            ].map((kpi) => (
              <div
                key={kpi.title}
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: 20,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
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
                    <p style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
                      {kpi.title}
                    </p>
                    <p
                      style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: "#0f172a",
                        marginTop: 4,
                      }}
                    >
                      {kpi.value}
                    </p>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}
                    >
                      {kpi.trend === "up" && (
                        <ArrowUpRight size={14} color="#16a34a" />
                      )}
                      {kpi.trend === "down" && (
                        <ArrowDownRight size={14} color="#dc2626" />
                      )}
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color:
                            kpi.trend === "up"
                              ? "#16a34a"
                              : kpi.trend === "down"
                              ? "#dc2626"
                              : "#64748b",
                        }}
                      >
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      background: kpi.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {kpi.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
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
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>
                  Project Progress
                </h3>
                <button
                  style={{
                    fontSize: 12,
                    color: "#1e40af",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  View All
                </button>
              </div>
              {[
                { name: "Office Renovation", progress: 78, color: "#1e40af" },
                { name: "Residential Complex", progress: 32, color: "#1e40af" },
                { name: "Warehouse Extension", progress: 65, color: "#1e40af" },
                { name: "Retail Unit", progress: 90, color: "#16a34a" },
              ].map((p) => (
                <div key={p.name} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: "#334155", fontWeight: 500 }}>{p.name}</span>
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
                        background: p.color,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Budget */}
            <div
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>
                  Budget vs Actual
                </h3>
                <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#1e40af",
                        display: "inline-block",
                      }}
                    />
                    Budget
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#94a3b8",
                        display: "inline-block",
                      }}
                    />
                    Actual
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  height: 140,
                  gap: 12,
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
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 3,
                        height: 100,
                      }}
                    >
                      <div
                        style={{
                          width: 14,
                          height: `${50 + i * 10}%`,
                          background: "#1e40af",
                          borderRadius: "3px 3px 0 0",
                        }}
                      />
                      <div
                        style={{
                          width: 14,
                          height: `${45 + i * 12}%`,
                          background: "#94a3b8",
                          borderRadius: "3px 3px 0 0",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{m}</span>
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
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
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
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>
                  Recent Activity
                </h3>
                <button
                  style={{
                    fontSize: 12,
                    color: "#1e40af",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  View All
                </button>
              </div>
              {[
                { text: "Project A updated", time: "2h ago", color: "#1e40af" },
                { text: "Safety report submitted", time: "5h ago", color: "#16a34a" },
                { text: "New subcontractor added", time: "1d ago", color: "#64748b" },
                { text: "Cost estimate generated", time: "2d ago", color: "#1e40af" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 20px",
                    borderBottom: "1px solid #f8fafc",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: item.color,
                    }}
                  />
                  <span style={{ fontSize: 14, color: "#334155", flex: 1 }}>
                    {item.text}
                  </span>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{item.time}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
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
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>
                  Upcoming Deadlines
                </h3>
                <button
                  style={{
                    fontSize: 12,
                    color: "#1e40af",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  View Calendar
                </button>
              </div>
              {[
                { title: "Tender Due", date: "Tomorrow, 5PM", urgent: true },
                { title: "RAMS Review", date: "Jun 28, 2026", urgent: false },
                { title: "Site Inspection", date: "Jul 1, 2026", urgent: false },
                { title: "Material Delivery", date: "Jul 3, 2026", urgent: false },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 20px",
                    borderBottom: "1px solid #f8fafc",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: item.urgent ? "#dc2626" : "#1e40af",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#334155" }}>
                      {item.title}
                    </div>
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
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 20px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bot size={18} color="#1e40af" />
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>
                  AI Insights
                </h3>
                <p style={{ fontSize: 12, color: "#64748b" }}>
                  Powered by ConstructAI
                </p>
              </div>
            </div>
            {[
              {
                type: "warning",
                title: "Delay Predicted",
                text: "Project Alpha may be delayed 6 days due to weather forecast",
              },
              {
                type: "danger",
                title: "Cost Overrun",
                text: "Concrete package exceeds estimate by 18%",
              },
              {
                type: "warning",
                title: "Safety Alert",
                text: "Safety incidents trending upward this week",
              },
              {
                type: "success",
                title: "On Track",
                text: "Electrical package submitted within budget",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "14px 20px",
                  borderBottom: "1px solid #f8fafc",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      item.type === "warning"
                        ? "#f59e0b"
                        : item.type === "danger"
                        ? "#dc2626"
                        : "#16a34a",
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
                    {item.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
