import React from 'react';
import { useCart } from '../context/CartContext';
import ParticleNetwork from '../components/ParticleNetwork';
import Hero3DBook from '../components/Hero3DBook';
import PromptCompilerStreamer from '../components/PromptCompilerStreamer';

const Home = () => {
  const { setIsPaymentModalOpen } = useCart();

  const features = [
    { icon: 'layer-group', title: '8-Step Framework™', desc: 'Role → Objective → Context → Constraints → Output Schema + Self-Audit. Complete deterministic formula.' },
    { icon: 'terminal', title: '180 Production Prompts', desc: 'Tier 1 (Beginner), Tier 2 (Intermediate), and Tier 3 (Advanced) across every engineering & business domain.' },
    { icon: 'images', title: '10 Visual Proof Plates', desc: 'Side-by-side Midjourney, Flux, React, and Tailwind outputs compared with raw prompts.' },
    { icon: 'file-contract', title: 'Full Commercial License', desc: 'Use in client deliverables, SaaS backends, and agency workflows with zero attribution required.' },
    { icon: 'microchip', title: 'Vendor-Neutral', desc: 'Engineered and benchmarked for ChatGPT, Claude 3.5, Gemini 1.5 Pro, Midjourney, and Cursor.' },
    { icon: 'hammer', title: 'Built for Builders', desc: 'Created for freelance developers, indie hackers, and creators who need high-precision results fast.' },
  ];

  const chapters = [
    {
      part: 'Part I: Core Architecture & Visual Creation',
      tag: 'FOUNDATION',
      color: 'border-l-teal-500',
      ch: [
        'Chapter 01: 8-Step Prompt Engineering Framework™',
        'Chapter 02: Anatomy of a High-Precision Prompt',
        'Chapter 03: Image Generation (Diffusion Optics & Lighting)',
        'Chapter 04: Video Generation (Cinematic Kinematics & Motion)'
      ]
    },
    {
      part: 'Part II: Code, Software & Technical Assets',
      tag: 'FULL-STACK',
      color: 'border-l-blue-500',
      ch: [
        'Chapter 05: Website Generation (HTML5 + Tailwind CSS)',
        'Chapter 06: Web Apps & Software (React, State & Database)',
        'Chapter 07: Business Documents, Whitepapers & SOW Contracts',
        'Chapter 08: Content & Long-Form Thought Leadership'
      ]
    },
    {
      part: 'Part III: Marketing, Freelancing & Distribution',
      tag: 'CONVERSION',
      color: 'border-l-purple-500',
      ch: [
        'Chapter 09: Marketing & Direct-Response Advertising',
        'Chapter 10: Social Media & Audience Growth Pipelines',
        'Chapter 11: Business & Freelance Client Operations',
        'Chapter 12: Coding, Architecture & Debugging Workflows'
      ]
    },
    {
      part: 'Part IV: Advanced Systems & Multi-Agent Swarms',
      tag: 'ORCHESTRATION',
      color: 'border-l-orange-500',
      ch: [
        'Chapter 13: Research & Competitive Intelligence Teardowns',
        'Chapter 14: Autonomous AI Agents & ReAct Loops',
        'Chapter 15: Prompt Chaining & Multi-Step Sequential Pipelines',
        'Chapter 16: Prompt Diagnostics & Hallucination Recovery',
        'Chapter 17: Advanced Reasoning (Chain/Tree of Thought)',
        'Chapter 18: Master Meta-Library & System Prompt Formulas'
      ]
    },
  ];

  const testimonials = [
    { name: 'James D.', role: 'Full-Stack Developer', text: 'I was using ChatGPT like a search engine. This playbook taught me how to use it like a compiler. The UI generation prompts alone paid for the book.' },
    { name: 'Sarah M.', role: 'Agency Founder', text: 'The 8-Step Framework is incredible. I have standardized all my agency client deliverables using these exact templates. Saves us 15+ hours every week.' },
    { name: 'Alex T.', role: 'UI/UX & Product Designer', text: 'Finally, a guide that is not just 1000 random prompts. It actually teaches the mechanics of how models think. The Midjourney plates are stunning.' },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* 1. HERO SECTION WITH INTERACTIVE JS CANVAS & 3D BOOK TILT */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-32 px-4 relative overflow-hidden bg-gradient-to-b from-[#030712] via-[#081024] to-[#030712]">
        
        {/* Interactive Neural Particle Network Canvas */}
        <ParticleNetwork />

        {/* Ambient Glowing Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-12 relative z-10">
          
          {/* Left Hero Text & Prompt Compiler */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(20,184,166,0.2)]">
              <i className="fa-solid fa-certificate text-teal-400"></i> Full Commercial License Included
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
              The Practical AI <br />
              <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Prompt Playbook
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              180 ready-to-use production prompts & templates for Images, Video, Websites, Apps, Marketing, Coding & AI Agents. Master the official <strong className="text-white">8-Step Prompt Engineering Framework™</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full sm:w-auto btn-primary text-base sm:text-lg py-3.5 px-8 font-extrabold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(20,184,166,0.4)] transform hover:-translate-y-0.5 transition-all"
              >
                <i className="fa-solid fa-bolt text-navy-900"></i> Get Instant Access — $20
              </button>
              <a
                href="#pricing"
                className="w-full sm:w-auto glass px-6 py-3.5 rounded-xl font-bold text-slate-200 hover:text-white hover:bg-white/5 border border-slate-700 transition flex items-center justify-center gap-2"
              >
                See Pricing & Info
              </a>
            </div>

            {/* Free Sample Download */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-400">
              <a
                href="/prompt-engineering-starter-guide.pdf"
                download="The-8-Step-Prompt-Starter-Guide.pdf"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:text-teal-300 transition-colors"
              >
                <i className="fa-solid fa-file-pdf"></i> Download Free 5-Page Demo (PDF)
              </a>
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-bolt text-yellow-400"></i> Instant PDF</span>
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-arrows-rotate text-teal-400"></i> Lifetime Updates</span>
            </div>

            {/* Live Interactive Prompt Compiler Typewriter Streamer */}
            <PromptCompilerStreamer />
          </div>

          {/* Right Hero 3D Book Visual with Mouse Physics */}
          <div className="flex-1 w-full flex justify-center items-center">
            <Hero3DBook />
          </div>

        </div>
      </section>

      {/* 2. VENDOR-NEUTRAL TECH BAND */}
      <section className="border-y border-white/5 py-8 bg-[#02050f]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Tested & Optimized Across Frontier AI Models</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 text-slate-400 font-bold text-lg md:text-xl opacity-75">
            <div className="flex items-center gap-2 hover:text-teal-400 transition-colors"><i className="fa-solid fa-robot text-teal-400"></i> ChatGPT (GPT-4o)</div>
            <div className="flex items-center gap-2 hover:text-teal-400 transition-colors"><i className="fa-solid fa-brain text-purple-400"></i> Claude 3.5 Sonnet</div>
            <div className="flex items-center gap-2 hover:text-teal-400 transition-colors"><i className="fa-solid fa-terminal text-blue-400"></i> Cursor & Copilot</div>
            <div className="flex items-center gap-2 hover:text-teal-400 transition-colors"><i className="fa-solid fa-palette text-pink-400"></i> Midjourney v6 / Flux.1</div>
            <div className="flex items-center gap-2 hover:text-teal-400 transition-colors"><i className="fa-solid fa-network-wired text-green-400"></i> LangGraph & Agents</div>
          </div>
        </div>
      </section>

      {/* 3. REAL EXAMPLES (VISUAL PROOF) */}
      <section id="examples" className="py-24 px-4 bg-[#030712]">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
              10 Visual Proof Plates
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Stop Outputting Plastic. <br/><span className="text-gradient">Start Engineering.</span></h2>
            <p className="text-slate-400 text-sm sm:text-base">See the difference between generic amateur prompts and the 8-Step Architectural Method.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-6 md:p-8 rounded-2xl border-red-500/20 bg-red-950/10 space-y-4">
              <div className="text-red-400 font-bold flex items-center text-sm uppercase tracking-wider">
                <i className="fa-solid fa-xmark mr-2 text-base"></i> Flat Amateur Prompt (1.2% CVR)
              </div>
              <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-red-300/80 border border-red-900/30">
                "Write a landing page and code a pricing card for my SaaS startup."
              </div>
              <div className="text-slate-400 text-xs leading-relaxed space-y-2">
                <p>❌ <strong>Result:</strong> Generic corporate fluff ("Unleash Your Potential"), missing error handling, broken mobile responsiveness, and zero conversion psychology.</p>
              </div>
            </div>
            
            <div className="glass p-6 md:p-8 rounded-2xl border-teal-500/40 bg-teal-950/10 space-y-4">
              <div className="text-teal-400 font-bold flex items-center text-sm uppercase tracking-wider">
                <i className="fa-solid fa-check mr-2 text-base"></i> The 8-Step Framework (5.8% CVR)
              </div>
              <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-teal-300 border border-teal-900/40">
                [Role: Staff UI Architect] + [Objective: High-Converting Bento Grid] + [Constraints: Tailwind CSS + WCAG AA] + [Schema: React JSX + Lucide Icons]
              </div>
              <div className="text-slate-300 text-xs leading-relaxed space-y-2">
                <p>✅ <strong>Result:</strong> Production-ready, accessible component with micro-animations, copy with high psychological momentum, and sub-second rendering.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES GRID */}
      <section id="features" className="py-24 px-4 bg-[#050b1a] border-y border-white/5">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Why This Playbook <span className="text-gradient">Wins</span></h2>
            <p className="text-slate-400 text-sm sm:text-base">Built specifically for solo software developers, freelance agency leads, and digital creators.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass p-8 rounded-2xl hover:border-teal-500/50 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 text-2xl mb-6 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-navy-900 transition-all">
                  <i className={`fa-solid fa-${f.icon}`}></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPLETE ARCHITECTURE (18 CHAPTERS) */}
      <section className="py-24 px-4 bg-[#030712]">
        <div className="container mx-auto max-w-5xl space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Complete Playbook Architecture</h2>
            <p className="text-slate-400 text-sm sm:text-base">18 Master Chapters spanning 69 Pages of high-density knowledge.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {chapters.map((c, i) => (
              <div key={i} className={`glass p-6 md:p-8 rounded-2xl border-l-4 ${c.color} space-y-4`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400">{c.tag}</span>
                  <span className="text-xs text-teal-400 font-semibold">4 Chapters</span>
                </div>
                <h3 className="text-lg font-bold text-white">{c.part}</h3>
                <ul className="space-y-2.5 pt-2">
                  {c.ch.map((chapter, j) => (
                    <li key={j} className="flex items-start text-xs text-slate-300">
                      <i className="fa-solid fa-circle-check text-teal-400 mr-2.5 mt-0.5 text-xs"></i>
                      <span>{chapter}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 px-4 bg-[#050b1a] border-y border-white/5">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Trusted by Digital Builders</h2>
            <p className="text-slate-400 text-sm sm:text-base">Real feedback from developers and agency founders.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass p-8 rounded-2xl relative space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex text-yellow-400 text-xs mb-4">
                    <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                  </div>
                  <p className="text-slate-300 text-xs italic leading-relaxed">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center font-bold text-navy-900 text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">{t.name}</div>
                    <div className="text-teal-400 text-[11px]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AUTHOR SECTION */}
      <section className="py-24 px-4 bg-[#030712]">
        <div className="container mx-auto max-w-4xl glass p-8 md:p-12 rounded-3xl border border-teal-500/30 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-teal-500/40 shrink-0 shadow-[0_0_30px_rgba(20,184,166,0.3)]">
            <img
              src="/author-pic.jpg"
              alt="Muhammad Ali"
              className="w-full h-full object-cover object-top"
              onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Muhammad+Ali&background=0d9488&color=fff&size=256'; }}
            />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Muhammad Ali</h2>
              <p className="text-teal-400 font-semibold text-xs sm:text-sm">Front-End Web Developer & UI Engineer • Founder, AliBuild Digital</p>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Based in Khyber Pakhtunkhwa, Pakistan. Specializes in high-performance responsive web interfaces, modern Tailwind CSS architecture, and end-to-end automated media generation pipelines.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href="https://wa.me/923055389967"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold hover:bg-green-500/20 transition-colors"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i> WhatsApp: +92 305 5389967
              </a>
              <a
                href="mailto:alikhan1475623@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-colors"
              >
                <i className="fa-solid fa-envelope"></i> alikhan1475623@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRICING SECTION */}
      <section id="pricing" className="py-24 px-4 bg-[#050b1a] border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto max-w-lg relative z-10">
          <div className="glass p-8 md:p-12 rounded-3xl text-center border-2 border-teal-500/40 shadow-[0_0_60px_rgba(20,184,166,0.2)] relative space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono text-[10px] font-bold uppercase tracking-wider">
              LIFETIME ACCESS • NO SUBSCRIPTION
            </div>
            
            <div>
              <h2 className="text-3xl font-black text-white">Get Instant Access</h2>
              <div className="flex items-center justify-center gap-1 mt-3">
                <span className="text-slate-500 font-bold text-2xl mt-2">$</span>
                <span className="text-6xl font-black text-white tracking-tighter">20</span>
                <span className="text-slate-500 text-sm font-semibold ml-1">USD</span>
              </div>
              <p className="text-teal-400 text-xs font-semibold mt-1">One-time payment • Promo discount code supported</p>
            </div>

            <ul className="text-left space-y-3.5 text-xs text-slate-300 border-y border-white/10 py-6">
              <li className="flex items-center gap-3"><i className="fa-solid fa-check text-teal-400"></i> <span><strong>180 Production-Ready</strong> prompts & templates</span></li>
              <li className="flex items-center gap-3"><i className="fa-solid fa-check text-teal-400"></i> <span>Full <strong>8-Step Engineering Framework™</strong></span></li>
              <li className="flex items-center gap-3"><i className="fa-solid fa-check text-teal-400"></i> <span><strong>18 Master Chapters</strong> (69 Pages Complete Edition)</span></li>
              <li className="flex items-center gap-3"><i className="fa-solid fa-check text-teal-400"></i> <span><strong>10 Visual Proof Plates</strong> (Code & Image benchmarks)</span></li>
              <li className="flex items-center gap-3 text-white font-bold bg-teal-500/10 p-2 rounded-lg border border-teal-500/30">
                <i className="fa-solid fa-certificate text-teal-400"></i> <span>Unrestricted Commercial License Included</span>
              </li>
              <li className="flex items-center gap-3"><i className="fa-solid fa-check text-teal-400"></i> <span>Instant high-res PDF download</span></li>
            </ul>

            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="btn-primary w-full text-lg py-4 font-extrabold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(20,184,166,0.4)]"
            >
              <i className="fa-solid fa-bolt text-navy-900"></i> Buy Now — $20
            </button>
            
            <p className="text-slate-500 text-[11px]">
              Accepted: JazzCash • EasyPaisa • SadaPay • NayaPay • Binance Pay
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 px-4 bg-[#030712] border-t border-white/5">
        <div className="container mx-auto max-w-3xl space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-xs">Everything you need to know before purchasing</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Is this a recurring subscription?", a: "No. It is a single one-time payment of $20. You get instant access and lifetime updates whenever new model chapters are released." },
              { q: "How do I receive the full 69-page playbook?", a: "After sending your payment through any of our payment accounts (JazzCash, EasyPaisa, SadaPay, NayaPay, or Binance), tap the WhatsApp confirmation button to send your Transaction ID. You will receive the high-res PDF immediately." },
              { q: "Can I use the generated outputs for commercial client work?", a: "Yes. Every purchase includes an unrestricted Commercial Single-User License. You can use all prompts in client deliverables, software products, and agency campaigns without attribution." },
              { q: "Do you offer promo code discounts?", a: "Yes! If you have an active promo code (like WALEED for 50% off), you can enter it right in the checkout modal to drop the price to $10." }
            ].map((faq, i) => (
              <div key={i} className="glass p-6 rounded-2xl border border-white/5 space-y-2">
                <h4 className="font-bold text-sm text-teal-400">{faq.q}</h4>
                <p className="text-slate-300 text-xs leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
