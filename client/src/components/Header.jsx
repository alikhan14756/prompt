import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* AivanoLabs Modern Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center p-0.5 shadow-[0_0_18px_rgba(20,184,166,0.45)] group-hover:shadow-[0_0_28px_rgba(20,184,166,0.8)] transition-all">
            <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L3 20h4l2.5-5.5h5L17 20h4L12 2z"/>
                <circle cx="12" cy="11" r="1.5" fill="#2dd4bf" stroke="none"/>
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-black text-white tracking-tight">Aivano<span className="text-teal-400">Labs</span></span>
            </div>
            <span className="text-[9px] font-mono text-slate-400 tracking-wider block -mt-1">aivanolabs.site</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="/#features" className="hover:text-teal-400 transition">Features</a>
          <a href="/#examples" className="hover:text-teal-400 transition">Examples</a>
          <a href="/#pricing" className="hover:text-teal-400 transition">Pricing</a>
          <Link to="/order-status" className="hover:text-teal-400 transition flex items-center gap-1.5">
            <i className="fa-solid fa-truck-fast text-xs text-teal-400"></i> Order Status
          </Link>
          <Link to="/admin/login" className="hover:text-teal-400 transition text-slate-400 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:border-teal-500/30">
            <i className="fa-solid fa-lock text-[10px] text-teal-400"></i> Admin
          </Link>
        </nav>

        <a href="/#pricing" className="btn-primary py-2 px-5 text-sm font-bold shadow-[0_0_20px_rgba(20,184,166,0.3)]">Buy Now ($20)</a>
      </div>
    </header>
  );
};
export default Header;
