import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gradient">Prompt Playbook</Link>
        <nav className="hidden md:flex gap-6">
          <a href="/#features" className="hover:text-teal-400 transition">Features</a>
          <a href="/#examples" className="hover:text-teal-400 transition">Examples</a>
          <a href="/#pricing" className="hover:text-teal-400 transition">Pricing</a>
          <Link to="/order-status" className="hover:text-teal-400 transition">Order Status</Link>
        </nav>
        <a href="/#pricing" className="btn-primary py-2 px-4 text-sm">Buy Now</a>
      </div>
    </header>
  );
};
export default Header;
