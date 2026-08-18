import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, Sparkles, Building2 } from 'lucide-react';

export const ExperienceSection = ({ experiences = [] }) => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#0B0C0E]">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/50 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Briefcase size={14} /> Career & Development
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Work & Professional Experience
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            My hands-on experience in Java Full Stack development, software engineering internships, and project executions.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full mt-2" />
        </div>

        {/* Centered Timeline Container */}
        <div className="max-w-5xl mx-auto relative space-y-12 before:absolute before:top-4 before:bottom-4 before:left-5 before:md:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-orange-500 before:via-orange-500/40 before:to-transparent">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            const highlightsList = exp.highlights
              ? (typeof exp.highlights === 'string' && exp.highlights.startsWith('[')
                  ? JSON.parse(exp.highlights)
                  : (typeof exp.highlights === 'string' ? exp.highlights.split('\n') : exp.highlights))
              : [];

            return (
              <div key={exp.id || idx} className="relative flex items-center group">
                {/* Central Timeline Icon Marker */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-6 w-10 h-10 rounded-full bg-[#131519] border-2 border-orange-500 flex items-center justify-center text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.5)] group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all z-20">
                  <Briefcase size={16} />
                </div>

                {/* Alternating Experience Card */}
                <div className={`w-full pl-14 md:pl-0 md:w-[calc(50%-2.5rem)] ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <div className="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-orange-500/40 transition-all duration-300 shadow-xl hover:shadow-orange-500/10 space-y-5 relative overflow-hidden group-hover:-translate-y-1 bg-[#131519]/90">
                    {/* Top Accent Gradient Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600" />

                    {/* Header Info */}
                    <div className="space-y-2 pt-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase border ${
                          exp.currentRole
                            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                            : 'bg-orange-950/80 border-orange-500/40 text-orange-300'
                        }`}>
                          {exp.currentRole ? '⚡ CURRENT ROLE' : '🎓 TRAINING & PROJECTS'}
                        </span>

                        <div className="flex items-center gap-1 text-[11px] font-mono text-orange-400 bg-orange-950/40 px-2.5 py-0.5 rounded-md border border-orange-500/20">
                          <Calendar size={12} />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-display font-bold text-white leading-snug group-hover:text-orange-400 transition-colors">
                        {exp.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-0.5">
                        <div className="flex items-center gap-1.5 font-semibold text-orange-400">
                          <Building2 size={14} />
                          <span>{exp.company}</span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                            <MapPin size={12} className="text-slate-500" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description Narrative */}
                    {exp.description && (
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                        {exp.description}
                      </p>
                    )}

                    {/* Highlights Bullet List */}
                    {highlightsList.length > 0 && (
                      <div className="space-y-2.5 pt-3 border-t border-white/10">
                        <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1">
                          <Sparkles size={12} className="text-orange-400" /> Key Deliverables & Responsibilities:
                        </h4>
                        <div className="space-y-2">
                          {highlightsList.map((h, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                              <CheckCircle size={15} className="text-orange-500 shrink-0 mt-0.5" />
                              <span>{typeof h === 'string' ? h.replace(/["[\]]/g, '').trim() : h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
