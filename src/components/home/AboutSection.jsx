import React from 'react';
import { UserCheck, GraduationCap, Building2, ShieldCheck, Database, Layers } from 'lucide-react';

export const AboutSection = ({ profile }) => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">About Me</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Engineering Full-Stack Enterprise Solutions
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Bio Card */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-8 space-y-6 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

            <h3 className="text-2xl font-display font-bold text-white">
              Java Full Stack Developer Intern at Dollop Infotech
            </h3>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {profile?.bio || "Engineering background (B.Tech from SATI Vidisha) with hands-on experience building production-grade enterprise web applications. Passionate about clean code, robust backend design, database optimization, and intuitive user experiences."}
            </p>

            <p className="text-slate-400 leading-relaxed text-sm">
              My engineering approach centers around building modular 3-tier Java applications with Spring Boot backend services, secure JWT state management, optimized relational databases (MySQL, PostgreSQL), caching layers (Redis), and reactive frontend applications in React.js.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-dark-900/80 border border-white/5">
                <Building2 className="text-violet-400 shrink-0" size={20} />
                <div>
                  <p className="text-xs text-slate-400 font-mono">Current Workplace</p>
                  <p className="text-sm font-semibold text-white">Dollop Infotech Pvt. Ltd.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-dark-900/80 border border-white/5">
                <GraduationCap className="text-indigo-400 shrink-0" size={20} />
                <div>
                  <p className="text-xs text-slate-400 font-mono">Education</p>
                  <p className="text-sm font-semibold text-white">B.Tech (CSE) SATI Vidisha</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlights & Stats */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-violet-950/60 text-violet-400 border border-violet-500/20">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-base font-semibold text-white">Spring Security & JWT</h4>
                <p className="text-xs text-slate-400 mt-1">Stateless authorization rules, RBAC, password encryption, and token validation.</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-500/20">
                <Database size={24} />
              </div>
              <div>
                <h4 className="text-base font-semibold text-white">Database & Caching Optimization</h4>
                <p className="text-xs text-slate-400 mt-1">Relational schema design with JPA/Hibernate, MySQL, PostgreSQL, and Redis query caching.</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-500/20">
                <Layers size={24} />
              </div>
              <div>
                <h4 className="text-base font-semibold text-white">Modular Architecture</h4>
                <p className="text-xs text-slate-400 mt-1">Strict Layered Pattern (Controller → Service → Repository → DTO) for maintainability.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
