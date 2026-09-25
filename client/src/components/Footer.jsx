import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy-800 py-12 mt-20 border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-gradient mb-4">The Practical AI Prompt Playbook</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">Master AI and supercharge your productivity with battle-tested prompts.</p>
        <div className="flex justify-center gap-6 mb-8">
          <Link to="/order-status" className="text-gray-400 hover:text-teal-400">Order Status</Link>
          <a href="mailto:alikhan1475623@gmail.com" className="text-gray-400 hover:text-teal-400">Support</a>
        </div>
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} Muhammad Ali. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
