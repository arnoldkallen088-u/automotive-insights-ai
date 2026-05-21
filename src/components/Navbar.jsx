import React from "react";
import { Link } from "react-router-dom";
import { Car, Search, User, LogOut } from "lucide-react";

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="glass h-16 sticky top-0 z-50 flex items-center justify-between px-8">
      <div className="flex items-center space-x-10">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
            <Car className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
            AUTO<span className="text-blue-600">ELITE</span>
          </span>
        </Link>

        {!isAuthenticated && (
          <div className="hidden lg:flex items-center space-x-8 text-[13px] font-bold uppercase tracking-widest text-slate-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">Showroom</Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">Collections</Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">Experience</Link>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center relative group">
          <Search className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
          <input
            type="text"
            placeholder="Find your drive..."
            className="pl-12 pr-6 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-xs font-medium focus:ring-2 focus:ring-blue-500/50 transition-all w-48 lg:w-72"
          />
        </div>

        {isAuthenticated ? (
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-2.5 rounded-full hover:shadow-lg transition-all">
              ADMIN PORTAL
            </Link>
            <button 
              onClick={onLogout}
              className="text-slate-400 hover:text-red-600 transition-colors p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="flex items-center space-x-2 text-slate-900 dark:text-white hover:text-blue-600 font-bold text-xs uppercase tracking-wider transition-all border-2 border-slate-900 dark:border-white px-6 py-2.5 rounded-full hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900"
          >
            <User size={16} />
            <span>Dealer Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;