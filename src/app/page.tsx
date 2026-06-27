import {
  FolderKanban,
  DollarSign,
  Shield,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

function KPICard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          <div className="mt-2 flex items-center gap-1">
            {trend === "up" ? (
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            ) : trend === "down" ? (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            ) : null}
            <span
              className={`text-xs font-medium ${
                trend === "up"
                  ? "text-green-600"
                  : trend === "down"
                  ? "text-red-600"
                  : "text-gray-500"
              }`}
            >
              {change}
            </span>
          </div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-100">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of your construction projects
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Active Projects"
          value="24"
          change="+2 this month"
          trend="up"
          icon={<FolderKanban className="h-5 w-5 text-orange-500" />}
        />
        <KPICard
          title="Budget Utilized"
          value="78%"
          change="+12% vs last month"
          trend="down"
          icon={<DollarSign className="h-5 w-5 text-blue-600" />}
        />
        <KPICard
          title="Open Safety Issues"
          value="8"
          change="-3 resolved"
          trend="up"
          icon={<Shield className="h-5 w-5 text-red-600" />}
        />
        <KPICard
          title="AI Risk Score"
          value="12%"
          change="Low risk"
          trend="neutral"
          icon={<TrendingUp className="h-5 w-5 text-green-600" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Project Progress</h3>
          <div className="space-y-4">
            {[
              { name: "Office Renovation", progress: 78 },
              { name: "Residential Complex", progress: 32 },
              { name: "Warehouse Extension", progress: 65 },
              { name: "Retail Unit", progress: 90 },
            ].map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{p.name}</span>
                  <span className="text-gray-500">{p.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-orange-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Budget vs Actual</h3>
          <div className="flex items-end justify-between gap-2 h-36">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-end gap-0.5 h-28">
                  <div
                    className="w-3 rounded-t bg-orange-400"
                    style={{ height: `${60 + i * 8}%` }}
                  />
                  <div
                    className="w-3 rounded-t bg-blue-400"
                    style={{ height: `${50 + i * 10}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500">{m}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-500" /> Budget
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" /> Actual
            </span>
          </div>
        </div>
      </div>

      {/* Activity + Deadlines */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-xs text-orange-500 font-medium">View All</button>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              "Project A updated",
              "Safety report submitted",
              "New subcontractor added",
              "Cost estimate generated",
            ].map((item, i) => (
              <div key={i} className="px-5 py-3 text-sm text-gray-700">
                {item}
                <span className="ml-2 text-xs text-gray-400">{i + 1}h ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <h3 className="text-sm font-semibold text-gray-900">Upcoming Deadlines</h3>
            <button className="text-xs text-orange-500 font-medium">View Calendar</button>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { title: "Tender Due", date: "Tomorrow", urgent: true },
              { title: "RAMS Review", date: "Jun 28", urgent: false },
              { title: "Inspection", date: "Jul 1", urgent: false },
              { title: "Material Delivery", date: "Jul 3", urgent: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                {item.urgent && <span className="h-2 w-2 rounded-full bg-red-500" />}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-4">
          <TrendingUp className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-semibold text-gray-900">AI Recommendations</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { type: "warning", text: "Project Alpha may be delayed 6 days" },
            { type: "danger", text: "Concrete package exceeds estimate by 18%" },
            { type: "warning", text: "Safety incidents trending upward" },
            { type: "success", text: "Electrical package on schedule" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3">
              <span
                className={`h-2 w-2 rounded-full ${
                  item.type === "warning"
                    ? "bg-orange-500"
                    : item.type === "danger"
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              />
              <p className="text-sm text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
