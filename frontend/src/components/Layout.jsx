import { Link, NavLink, Outlet } from "react-router-dom";
import { Shield, Newspaper, Flag, Users, MessageSquare, LogIn, UserCircle, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import React from "react";
const nav = [
  ["/news", "News", Newspaper],
  ["/ctfs", "CTFs", Flag],
  ["/groups", "Groups", Users],
  ["/discussions", "Discussions", MessageSquare]
];

export default function Layout() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,.10),_transparent_35%),radial-gradient(circle_at_top_left,_rgba(59,130,246,.10),_transparent_30%)]">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight">
            <Shield className="text-cyan-400" /> Cyber<span className="text-cyan-400">Nexus</span>
          </Link>
          <nav className="hidden gap-5 md:flex">
            {nav.map(([to, label, Icon]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-2 text-sm ${isActive ? "text-cyan-300" : "text-slate-400 hover:text-white"}`}>
                <Icon size={16} />{label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link to="/dashboard" className="btn-secondary hidden sm:flex items-center gap-2"><UserCircle size={16} />{user.username}</Link>
                <button onClick={logout} className="btn-secondary" title="Logout"><LogOut size={16} /></button>
              </>
            ) : <Link to="/login" className="btn-primary flex items-center gap-2"><LogIn size={16} /> Login</Link>}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8"><Outlet /></main>
      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">CyberNexus · Community research project</footer>
    </div>
  );
}
