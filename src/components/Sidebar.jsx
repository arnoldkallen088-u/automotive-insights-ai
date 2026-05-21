import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Car, PlusCircle, Settings, ShieldCheck } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Inventory", icon: Car, path: "/dashboard/cars" },
    { name: "New Arrival", icon: PlusCircle, path: "/dashboard/cars/add" },
    { name: "Security", icon: ShieldCheck, path: "/dashboard" },
    { name: "Settings", icon: Settings, path: "/dashboard" },
  ];

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-800 h-[calc(100vh-64px)] fixed left-0 top-16 z-40 overflow-y-auto hidden md:block">
      <div className="p-6">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Management</p>
        <nav className="space-y-1.5">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                }`}
              >
                <link.icon size={18} className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`} />
                <span className="text-sm font-bold tracking-tight">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="absolute bottom-8 left-6 right-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Cloud Sync Active</p>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-blue-500 w-3/4 rounded-full"></div>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Database capacity: <span className="text-slate-200">75%</span></p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;