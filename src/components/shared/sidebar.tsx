"use client";
import Logo from "./logo";
import SideBarNavigation from "./sidebar-navigation";

export default function Sidebar() {
  return (
    <aside className="fixed start-0 top-0 h-screen bg-[#1E2939] w-64 text-white flex flex-col">
      <div className="flex-1 pt-4 space-y-3 overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#374151 transparent" }}>
        <Logo />
        <SideBarNavigation />
      </div>

      <div className="p-4 border-t border-white/10 shrink-0">
        <p className="text-sm text-white/60">Logged in as</p>
        <p className="font-semibold">John Doe</p>
      </div>
    </aside>
  );
}