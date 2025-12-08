"use client";

import {
  Briefcase,
  MessageSquare,
  Settings,
  BarChart,
  Menu,
  X,
  Home,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  activePage: string;
  onToggleSidebar: () => void;
  onPageChange: (pageName: string) => void;
}

const menuItems = [
  { name: "home", label: "Home", icon: <Home size={20} /> },
  { name: "dashboard", label: "Dashboard", icon: <BarChart size={20} /> },
  { name: "projects", label: "Projects", icon: <Briefcase size={20} /> },
  { name: "messages", label: "Messages", icon: <MessageSquare size={20} /> },
  { name: "settings", label: "Settings", icon: <Settings size={20} /> },
];

export default function Sidebar({
  sidebarOpen,
  activePage,
  onToggleSidebar,
  onPageChange,
}: SidebarProps) {
  return (
    <>
      {/* Mobile toggle button (only visible on small screens) */}
      <div className="md:hidden fixed top-5 scale-110 left-4 z-80">
        <button
          onClick={onToggleSidebar}
          className={`p-2 rounded ${sidebarOpen ? "" : ""} text-black`}
        >
          {sidebarOpen ? "" : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-blue-600 text-white z-60
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          w-64
          md:static md:translate-x-0 md:w-64
        `}
        onClick={() => onToggleSidebar()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-500">
          <span className="font-bold text-lg whitespace-nowrap">Admin</span>
          {/* Hide close button on desktop */}
          <button
            onClick={onToggleSidebar}
            className="p-1 hover:bg-blue-500 rounded md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
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
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Dark overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={onToggleSidebar}
          className="fixed inset-0 bg-white/20 backdrop-blur-xs bg-opacity-20 z-[55] md:hidden"
        />
      )}
    </>
  );
}
