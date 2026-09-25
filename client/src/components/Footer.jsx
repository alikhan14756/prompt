import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#02040a] py-14 mt-20 border-t border-white/5 text-sm">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center font-bold text-navy-900">
            AI
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Prompt Playbook</span>
        </div>
        <p className="text-slate-400 mb-6 max-w-md mx-auto text-xs leading-relaxed">
          The definitive production framework for prompt engineering across Code, Visuals, Copy, and AI Agents.
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-xs font-semibold text-slate-400">
          <Link to="/order-status" className="hover:text-teal-400 transition flex items-center gap-1.5">
            <i className="fa-solid fa-magnifying-glass"></i> Order Status
          </Link>
          <a href="https://wa.me/923055389967" target="_blank" rel="noreferrer" className="hover:text-green-400 transition flex items-center gap-1.5">
            <i className="fa-brands fa-whatsapp"></i> WhatsApp Support
          </a>
          <a href="mailto:alikhan1475623@gmail.com" className="hover:text-teal-400 transition flex items-center gap-1.5">
            <i className="fa-solid fa-envelope"></i> Contact Author
          </a>
          <Link to="/admin/login" className="text-slate-500 hover:text-teal-400 transition flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
            <i className="fa-solid fa-lock text-[10px]"></i> Admin Portal
          </Link>
        </div>
        
        <p className="text-xs text-slate-600">© {new Date().getFullYear()} Muhammad Ali • AliBuild Digital. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
