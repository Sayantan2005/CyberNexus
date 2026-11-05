import { Link } from "react-router-dom";
import { ArrowRight, Newspaper, Flag, Users, Zap } from "lucide-react";
import React from "react";
const features = [
  ["Automated News", "Fresh cybersecurity news collected from trusted feeds.", Newspaper],
  ["CTF Discovery", "Find upcoming competitions and filter by category.", Flag],
  ["Community Groups", "Create focused spaces for web security, DFIR, SOC and more.", Users],
  ["Community First", "Share questions, ideas and practical knowledge.", Zap]
];

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="grid items-center gap-10 py-12 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">CYBERSECURITY COMMUNITY</div>
          <h1 className="text-5xl font-black leading-tight md:text-7xl">Learn. Compete.<br/><span className="text-cyan-400">Connect.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">CyberNexus brings cybersecurity news, CTF opportunities and community discussions together for learners and enthusiasts.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/news" className="btn-primary flex items-center gap-2">Explore News <ArrowRight size={18}/></Link>
            <Link to="/ctfs" className="btn-secondary">Find CTFs</Link>
          </div>
        </div>
        <div className="card relative overflow-hidden p-8">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl"/>
          <pre className="overflow-x-auto text-sm leading-7 text-cyan-200">{`$ cybernexus status

[✓] News feeds
[✓] CTF discovery
[✓] Community groups
[✓] Discussions
[✓] Secure authentication

> Ready to connect_`}</pre>
        </div>
      </section>

      <section>
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-cyan-400">Everything in one place</p>
          <h2 className="mt-2 text-3xl font-black">Built around the community</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map(([title, desc, Icon]) => (
            <div className="card p-6" key={title}>
              <Icon className="text-cyan-400" />
              <h3 className="mt-5 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
