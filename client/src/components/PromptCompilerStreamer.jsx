import React, { useState, useEffect } from 'react';

const promptsList = [
  {
    category: 'WEBSITES & UI',
    role: 'Principal Front-End Engineer',
    prompt: 'Create a dark-mode SaaS dashboard in React & Tailwind with accessible ARIA tables, KPI metrics, and sub-second rendering.',
    output: '✓ Generated responsive clean JSX with zero bloat (Score: 99/100)'
  },
  {
    category: 'DIFFUSION OPTICS',
    role: 'Commercial Cinematographer',
    prompt: 'Medium format 85mm f/1.4 studio portrait, natural 45° key light, micro-skin texture, zero plastic airbrushing --ar 4:5 --v 6.0',
    output: '✓ Optical photorealism benchmark verified (Midjourney / Flux)'
  },
  {
    category: 'BACKEND ARCHITECTURE',
    role: 'Systems Architect',
    prompt: 'Build a secure Stripe webhook handler in TypeScript + Fastify with distributed Redis locks and strict Zod validation.',
    output: '✓ Idempotent multi-tenant transaction logic compiled'
  },
  {
    category: 'AI AGENTS & SWARMS',
    role: 'Autonomous Swarm Lead',
    prompt: 'Multi-agent supervisor coordinating DataEngineer and SecurityAuditor with ReAct loop guardrails and circuit breaker.',
    output: '✓ Deterministic multi-turn execution pipeline ready'
  }
];

const PromptCompilerStreamer = () => {
  const [index, setIndex] = useState(0);
  const [displayedPrompt, setDisplayedPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let charIndex = 0;
    const fullText = promptsList[index].prompt;
    setDisplayedPrompt('');
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedPrompt((prev) => prev + fullText.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        // Pause then advance to next prompt
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % promptsList.length);
        }, 3200);
      }
    }, 28);

    return () => clearInterval(typingInterval);
  }, [index]);

  const current = promptsList[index];

  return (
    <div className="glass rounded-2xl p-4 border border-teal-500/20 shadow-xl max-w-xl text-left font-mono text-xs space-y-2 mt-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
          <span className="text-teal-400 font-bold ml-1">PLAYBOOK COMPILER</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 font-bold">
          {current.category}
        </span>
      </div>

      <div className="text-[11px] text-slate-400">
        <span className="text-purple-400 font-semibold">[Persona]:</span> {current.role}
      </div>

      <div className="text-slate-200 min-h-[38px] leading-relaxed">
        <span className="text-teal-400 font-bold">&gt;&nbsp;</span>
        {displayedPrompt}
        {isTyping && <span className="inline-block w-1.5 h-3 bg-teal-400 ml-1 animate-pulse"></span>}
      </div>

      <div className={`text-[11px] transition-opacity duration-300 ${!isTyping ? 'text-green-400 opacity-100' : 'opacity-0'}`}>
        {current.output}
      </div>
    </div>
  );
};

export default PromptCompilerStreamer;
