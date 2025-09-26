"use client";

import {
  Briefcase,
  MessageSquare,
  Settings,
  BarChart,
  // ListChecks,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  activePage: string;
  onToggleSidebar: () => void;
  onPageChange: (pageName: string) => void;
}

const menuItems = [
  { name: "dashboard", label: "Dashboard", icon: <BarChart size={20} /> },
  { name: "projects", label: "Projects", icon: <Briefcase size={20} /> },
  { name: "messages", label: "Messages", icon: <MessageSquare size={20} /> },
  // { name: "waitlist", label: "Waitlist", icon: <ListChecks size={20} /> },
  { name: "settings", label: "Settings", icon: <Settings size={20} /> },
];

export default function Sidebar({
  sidebarOpen,
  activePage,
  onToggleSidebar,
  onPageChange,
}: SidebarProps) {
  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-blue-600 text-white transition-all duration-300 flex flex-col relative z-50`}
    >
      <div className="flex items-center justify-between p-4 border-b border-blue-600">
        <span className="font-bold text-lg whitespace-nowrap">
          {sidebarOpen ? "Admin" : "B"}
        </span>
        <button
          onClick={onToggleSidebar}
          className="p-1 hover:bg-blue-500 rounded"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name} className="list-none">
              <button
                onClick={() => onPageChange(item.name)}
                className={`w-full flex items-center space-x-3 p-3 rounded cursor-pointer hover:bg-blue-500 transition-colors ${
                  activePage === item.name ? "bg-blue-700" : ""
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {sidebarOpen && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
