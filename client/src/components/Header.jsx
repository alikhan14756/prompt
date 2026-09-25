import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* AivanoLabs Modern Logo */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center p-0.5 shadow-[0_0_18px_rgba(20,184,166,0.45)] group-hover:shadow-[0_0_28px_rgba(20,184,166,0.8)] transition-all">
            <div className="w-full h-full bg-navy-900 rounded-[8px] sm:rounded-[10px] flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-teal-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L3 20h4l2.5-5.5h5L17 20h4L12 2z"/>
                <circle cx="12" cy="11" r="1.5" fill="#2dd4bf" stroke="none"/>
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-base sm:text-xl font-black text-white tracking-tight">Aivano<span className="text-teal-400">Labs</span></span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 tracking-wider block -mt-1">aivanolabs.site</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
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

        {/* Right Actions (Shifted WhatsApp Button + Buy CTA + Hamburger) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="https://wa.me/923055389967"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,211,102,0.2)] shrink-0"
            title="Chat on WhatsApp"
          >
            <i className="fa-brands fa-whatsapp text-sm sm:text-base"></i>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <a
            href="/#pricing"
            className="btn-primary py-1.5 px-3 sm:py-2 sm:px-4 text-xs sm:text-sm font-extrabold shadow-[0_0_15px_rgba(20,184,166,0.3)] whitespace-nowrap shrink-0"
          >
            Buy <span className="opacity-80 font-mono font-normal">($20)</span>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-white bg-slate-800/90 hover:bg-slate-700 border border-white/15 focus:outline-none flex items-center justify-center transition-colors shrink-0 shadow-md"
            aria-label="Toggle navigation"
          >
            <i className={`fa-solid fa-${mobileMenuOpen ? 'xmark' : 'bars'} text-base text-teal-300`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-navy-950/98 backdrop-blur-2xl px-5 py-5 space-y-3.5 shadow-2xl">
          <a
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-sm font-medium text-slate-200 hover:text-teal-400 py-1.5 border-b border-white/5"
          >
            <i className="fa-solid fa-layer-group text-xs text-teal-400"></i> Features
          </a>
          <a
            href="/#examples"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-sm font-medium text-slate-200 hover:text-teal-400 py-1.5 border-b border-white/5"
          >
            <i className="fa-solid fa-terminal text-xs text-teal-400"></i> Real Examples
          </a>
          <a
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-sm font-medium text-slate-200 hover:text-teal-400 py-1.5 border-b border-white/5"
          >
            <i className="fa-solid fa-tag text-xs text-teal-400"></i> Pricing ($20 / Rs. 5,600)
          </a>
          <Link
            to="/order-status"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-sm font-medium text-teal-400 py-1.5 border-b border-white/5"
          >
            <i className="fa-solid fa-truck-fast text-xs"></i> Order Status Lookup
          </Link>
          <Link
            to="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-sm font-medium text-slate-400 hover:text-white py-1.5 border-b border-white/5"
          >
            <i className="fa-solid fa-lock text-xs text-teal-400"></i> 🔒 Admin Dashboard Login
          </Link>
          <a
            href="https://wa.me/923055389967"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-bold"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i> WhatsApp Support (+92 305 5389967)
          </a>
        </div>
      )}
    </header>
  );
};
export default Header;
