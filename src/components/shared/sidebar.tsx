import Logo from "./logo";
import SideBarNavigation from "./sidebar-navigation";

export default function Sidebar() {
  return (
    <aside className="fixed start-0 top-0 h-screen bg-[#1E2939] w-64 pt-4 text-white flex flex-col justify-between">
      <div className="space-y-16">
        {/* logo */}
        <Logo />
        {/* navigation */}
        <SideBarNavigation />
      </div>

      {/* user */}
      <div className="p-4">
        <p className="text-sm">Logged in as</p>
        <p className="font-semibold">John Doe</p>
      </div>
    </aside>
  );
}

