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

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#1e293b] text-white flex flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f97316]">
          <HardHat className="h-5 w-5 text-white" />
        </div>
        <div>
          <span className="text-sm font-bold leading-tight">ConstructAI</span>
          <p className="text-[10px] text-white/50">AI Construction Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-[#f97316] text-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="h-[18px] w-[18px]" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings */}
      <div className="border-t border-white/10 px-3 py-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white"
        >
          <Settings className="h-[18px] w-[18px]" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
