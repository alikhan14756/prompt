import React, { useState, useRef } from 'react';

const Hero3DBook = () => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 5, y: -12 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 5, y: -12 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      className="relative w-full max-w-md mx-auto aspect-[3/4] perspective-[1200px] cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute -inset-6 bg-gradient-to-r from-teal-500/30 via-cyan-500/20 to-blue-600/30 blur-3xl rounded-full animate-pulse opacity-70 pointer-events-none"></div>

      {/* Floating Interactive 3D Book Container */}
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#0b1329] via-[#070e1f] to-[#030712] border-2 border-teal-500/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(20,184,166,0.3)] flex flex-col justify-between p-8 overflow-hidden group select-none"
      >
        {/* Specular Glare Reflection Overlay */}
        <div
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 60%)`,
            opacity: glare.opacity,
            transition: 'opacity 0.3s ease',
          }}
          className="absolute inset-0 pointer-events-none z-20"
        />

        {/* Geometric Circuit Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        {/* Top Branding Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center font-black text-navy-900 shadow-[0_0_15px_rgba(45,212,191,0.6)] text-base">
              AL
            </div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-teal-400 uppercase">
              AIVANOLABS V2.0
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-[10px] font-mono font-bold text-teal-300">
            69 PAGES
          </span>
        </div>

        {/* Middle Title Area */}
        <div className="relative z-10 my-auto text-center space-y-3">
          <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mx-auto"></div>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
            THE PRACTICAL AI <br />
            <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              PROMPT PLAYBOOK
            </span>
          </h2>
          <p className="text-xs text-slate-400 font-mono tracking-wide max-w-xs mx-auto">
            180 Production Prompts & Templates for Web, Code, Ads, Images & Agents
          </p>
        </div>

        {/* Bottom Author & License Footer */}
        <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
          <div>
            <div className="font-extrabold text-white text-xs">MUHAMMAD ALI</div>
            <div className="text-[10px] text-teal-400 font-mono">aivanolabs.site</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Commercial License
            </span>
            <span className="text-[10px] font-mono text-teal-300 font-bold">Included</span>
          </div>
        </div>
      </div>

      {/* Floating Badges with Parallax & Bobbing */}
      <div
        className="absolute -right-6 top-10 glass border border-teal-500/40 p-3 rounded-xl shadow-2xl z-30 animate-bounce pointer-events-none"
        style={{ animationDuration: '3.5s' }}
      >
        <span className="text-white font-bold text-xs flex items-center gap-1.5">
          <span className="text-teal-400 text-sm">⚡</span> 18 Master Chapters
        </span>
      </div>

      <div
        className="absolute -left-6 bottom-24 glass border border-cyan-500/40 p-3 rounded-xl shadow-2xl z-30 animate-bounce pointer-events-none"
        style={{ animationDuration: '4.5s', animationDelay: '1s' }}
      >
        <span className="text-white font-bold text-xs flex items-center gap-1.5">
          <span className="text-yellow-400 text-sm">🔥</span> 10 Visual Proof Plates
        </span>
      </div>

      <div
        className="absolute right-4 -bottom-4 glass border border-green-500/40 px-3.5 py-2 rounded-xl shadow-2xl z-30 pointer-events-none"
      >
        <span className="text-green-300 font-bold text-[11px] flex items-center gap-1.5 font-mono">
          <i className="fa-solid fa-circle-check text-green-400"></i> Full Commercial Rights
        </span>
      </div>
    </div>
  );
};

export default Hero3DBook;
