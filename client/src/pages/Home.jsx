import React from 'react';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { setIsPaymentModalOpen } = useCart();

  const features = [
    { icon: 'bolt', title: 'Instant Productivity', desc: 'Get templates that cut your work time in half immediately.' },
    { icon: 'wand-magic-sparkles', title: 'Zero Guesswork', desc: 'Stop staring at a blank prompt box. Just fill in the blanks.' },
    { icon: 'brain', title: 'Advanced Frameworks', desc: 'Learn to stack prompts for complex, multi-step tasks.' },
    { icon: 'rocket', title: 'Scale Your Output', desc: 'Generate a month of content or entire apps in minutes.' },
    { icon: 'shield-halved', title: 'Bypass Filters', desc: 'Techniques to get the AI to give you exactly what you need.' },
    { icon: 'code', title: 'Developer Ready', desc: 'Specialized prompts for coding, debugging, and architecture.' },
  ];

  const chapters = [
    { part: 'Part 1: The Foundations', ch: ['Introduction to Prompt Engineering', 'Understanding LLMs', 'The Anatomy of a Perfect Prompt'] },
    { part: 'Part 2: Core Techniques', ch: ['Few-Shot Prompting', 'Chain of Thought', 'Role-Playing & Personas', 'Context Injecting'] },
    { part: 'Part 3: Advanced Strategies', ch: ['Prompt Chaining', 'Self-Consistency', 'ReAct Framework', 'Tree of Thoughts', 'Handling Hallucinations'] },
    { part: 'Part 4: Real-World Use Cases', ch: ['Coding & Development', 'Content Creation & Marketing', 'Data Analysis', 'Business Strategy', 'Creative Writing', 'Productivity Automation'] },
  ];

  const testimonials = [
    { name: 'Sarah J.', role: 'Content Marketer', text: 'This playbook completely changed how I use ChatGPT. My output has 10x\'d in quality.' },
    { name: 'David M.', role: 'Software Engineer', text: 'The coding prompts are insane. I built a full MVP in a weekend using the architecture templates.' },
    { name: 'Elena R.', role: 'Agency Owner', text: 'Best $20 I ever spent. The frameworks are crystal clear and easy to train my team on.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-500/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-navy-900 to-navy-900 pointer-events-none"></div>
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-semibold mb-6">
              V2.0 is live! Now includes Claude & Gemini frameworks.
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master AI. <br />
              <span className="text-gradient">Automate Your Life.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
              Stop getting generic responses. The Practical AI Prompt Playbook gives you the exact copy-paste templates to command any LLM like an expert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => setIsPaymentModalOpen(true)} className="btn-primary text-lg">
                Get Instant Access — $20
              </button>
              <a href="#examples" className="glass px-6 py-3 rounded-lg text-lg font-semibold hover:bg-white/5 transition">
                See Real Examples
              </a>
            </div>
            <div className="mt-8">
              <a href="/prompt-engineering-starter-guide.pdf" download className="text-teal-400 hover:underline text-sm">
                <i className="fa-solid fa-download mr-2"></i> Download Free Sample Chapter (PDF)
              </a>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md relative animate-float">
            <div className="absolute -inset-4 bg-teal-500/30 blur-2xl rounded-full animate-glow z-0"></div>
            <div className="glass rounded-xl p-2 relative z-10 aspect-[3/4] flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900 border-teal-500/30 shadow-2xl">
              <div className="text-center p-8">
                <i className="fa-solid fa-book-open text-6xl text-teal-400 mb-6"></i>
                <h3 className="text-2xl font-bold mb-2">The Practical AI<br/>Prompt Playbook</h3>
                <p className="text-teal-400 text-sm">By Muhammad Ali</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-y border-white/5 py-8 bg-black/20">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-12 text-gray-500 text-2xl">
          <div className="flex items-center gap-2"><i className="fa-solid fa-robot"></i> ChatGPT</div>
          <div className="flex items-center gap-2"><i className="fa-solid fa-brain"></i> Claude</div>
          <div className="flex items-center gap-2"><i className="fa-solid fa-terminal"></i> Cursor</div>
          <div className="flex items-center gap-2"><i className="fa-solid fa-palette"></i> Midjourney</div>
        </div>
      </section>

      {/* Real Examples */}
      <section id="examples" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Stop Settling for <span className="text-red-400">Average</span> Outputs</h2>
            <p className="text-xl text-gray-400">See the difference a master prompt makes.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-6 rounded-xl border-red-500/20 bg-red-950/20">
              <div className="text-red-400 font-bold mb-4 flex items-center"><i className="fa-solid fa-xmark mr-2"></i> The "Normal" Way</div>
              <div className="bg-navy-900 p-4 rounded-lg mb-4 text-sm font-mono text-gray-400">
                Prompt: Write a blog post about AI in marketing.
              </div>
              <div className="text-gray-500 text-sm italic">
                Output: Generic, robotic tone. Lacks structure. Sounds like a Wikipedia article. Zero personality.
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl border-teal-500/30 bg-teal-900/10">
              <div className="text-teal-400 font-bold mb-4 flex items-center"><i className="fa-solid fa-check mr-2"></i> The Playbook Way</div>
              <div className="bg-navy-900 p-4 rounded-lg mb-4 text-sm font-mono text-teal-200/80">
                Prompt: Act as a senior copywriter. Write a controversial, contrarian blog post about AI in marketing targeting CMOs. Use a punchy, direct tone. Structure: Hook, Myth, Truth, Actionable Advice.
              </div>
              <div className="text-gray-300 text-sm">
                Output: Highly engaging, deeply insightful, ready to publish. Reads like it was written by a $150/hr consultant.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 bg-navy-800/30 border-y border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to <span className="text-gradient">Level Up</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass p-8 rounded-xl hover:border-teal-500/50 transition-colors group">
                <div className="text-teal-400 text-3xl mb-4 group-hover:scale-110 transition-transform"><i className={`fa-solid fa-${f.icon}`}></i></div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Inside the Playbook</h2>
            <p className="text-xl text-gray-400">18 Chapters. 100+ Templates. Pure signal, zero noise.</p>
          </div>
          <div className="space-y-6">
            {chapters.map((c, i) => (
              <div key={i} className="glass p-6 rounded-xl border-l-4 border-l-teal-500">
                <h3 className="text-xl font-bold mb-4 text-teal-400">{c.part}</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {c.ch.map((chapter, j) => (
                    <li key={j} className="flex items-center text-gray-300"><i className="fa-solid fa-angle-right text-teal-500/50 mr-3 text-sm"></i> {chapter}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-navy-800/30 border-y border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Readers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass p-8 rounded-xl relative">
                <i className="fa-solid fa-quote-left text-4xl text-white/5 absolute top-6 left-6"></i>
                <p className="text-gray-300 mb-6 relative z-10 pt-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-sky-400 flex items-center justify-center font-bold text-navy-900">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-teal-400 text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl glass p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-teal-500/30 shrink-0">
            <img src="/author-pic.jpg" alt="Muhammad Ali" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=Author'; }} />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Hi, I'm Muhammad Ali</h2>
            <p className="text-teal-400 font-semibold mb-4">AI Engineer & Full-Stack Developer</p>
            <p className="text-gray-300 mb-6">
              I've spent the last 2 years building AI applications and engineering prompts for enterprise clients. I realized most people are only using 10% of what AI is capable of because they don't know how to talk to it. I wrote this playbook to give you the exact frameworks I use daily.
            </p>
            <div className="flex gap-4 text-sm font-mono text-gray-400">
              <a href="https://wa.me/923055389967" target="_blank" rel="noreferrer" className="hover:text-teal-400"><i className="fa-brands fa-whatsapp"></i> +923055389967</a>
              <a href="mailto:alikhan1475623@gmail.com" className="hover:text-teal-400"><i className="fa-solid fa-envelope"></i> alikhan1475623@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & CTA */}
      <section id="pricing" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-500/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/10 via-navy-900 to-navy-900 pointer-events-none"></div>
        <div className="container mx-auto max-w-lg relative z-10">
          <div className="glass p-8 md:p-12 rounded-3xl text-center border-teal-500/50 shadow-[0_0_50px_rgba(45,212,191,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-teal-500 text-navy-900 text-xs font-bold px-4 py-1 rounded-bl-lg">ONE-TIME PAYMENT</div>
            <h2 className="text-3xl font-bold mb-2">Get The Playbook</h2>
            <div className="text-5xl font-bold text-teal-400 mb-6 mt-4">$20</div>
            
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-start gap-3"><i className="fa-solid fa-check text-teal-400 mt-1"></i> <span>100+ Copy-Paste Prompt Templates</span></li>
              <li className="flex items-start gap-3"><i className="fa-solid fa-check text-teal-400 mt-1"></i> <span>Lifetime Updates (Including V3)</span></li>
              <li className="flex items-start gap-3"><i className="fa-solid fa-check text-teal-400 mt-1"></i> <span>PDF + Notion Formats included</span></li>
              <li className="flex items-start gap-3"><i className="fa-solid fa-check text-teal-400 mt-1"></i> <span>Direct WhatsApp Support</span></li>
            </ul>
            
            <button onClick={() => setIsPaymentModalOpen(true)} className="btn-primary w-full text-xl py-4 flex items-center justify-center gap-2">
              <i className="fa-solid fa-bolt"></i> Get Instant Access
            </button>
            <p className="text-gray-500 text-sm mt-4">Secure checkout via JazzCash, EasyPaisa, SadaPay, Binance</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-navy-800/30 border-t border-white/5">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is this for beginners or experts?", a: "Both. The first part builds the foundation, while parts 3 and 4 dive deep into advanced chaining, ReAct frameworks, and complex automations." },
              { q: "Does this work with Claude or Gemini?", a: "Yes. While examples primarily use ChatGPT, the underlying frameworks and logic apply to all major LLMs." },
              { q: "How do I receive the book?", a: "After payment, send your transaction ID to the provided WhatsApp number. The PDF and Notion links will be sent directly to you instantly." }
            ].map((faq, i) => (
              <div key={i} className="glass p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-teal-400">{faq.q}</h4>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
