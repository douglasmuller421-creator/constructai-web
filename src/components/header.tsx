import { Search, Bell, Bot, User } from "lucide-react";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white px-4 lg:left-64">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search projects, logs, documents..."
          className="h-10 w-72 rounded-lg border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button className="flex h-10 items-center gap-2 rounded-lg bg-orange-50 px-3 text-sm font-medium text-orange-600 hover:bg-orange-100">
          <Bot className="h-4 w-4" />
          <span className="hidden sm:inline">AI Assistant</span>
        </button>

        <div className="h-6 w-px bg-border" />

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          JM
        </div>
      </div>
    </header>
  );
}
