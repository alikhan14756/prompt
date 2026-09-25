import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-navy-900 shadow-[0_0_12px_rgba(20,184,166,0.5)]">
            AI
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Prompt Playbook</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="/#features" className="hover:text-teal-400 transition">Features</a>
          <a href="/#examples" className="hover:text-teal-400 transition">Examples</a>
          <a href="/#pricing" className="hover:text-teal-400 transition">Pricing</a>
          <Link to="/order-status" className="hover:text-teal-400 transition flex items-center gap-1.5">
            <i className="fa-solid fa-truck-fast text-xs"></i> Order Status
          </Link>
          <Link to="/admin/login" className="hover:text-teal-400 transition text-slate-400 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10">
            <i className="fa-solid fa-lock text-[10px]"></i> Admin
          </Link>
        </nav>
        <a href="/#pricing" className="btn-primary py-2 px-5 text-sm font-bold">Buy Now ($20)</a>
      </div>
    </header>
  );
};
export default Header;
