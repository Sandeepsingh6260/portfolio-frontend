import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

export const ExperienceSection = ({ experiences = [] }) => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">EXPERIENCE</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Work & Training History
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-6 before:md:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-orange-500 before:via-orange-500/30 before:to-transparent">
          {experiences.map((exp, idx) => {
            const highlightsList = exp.highlights
              ? (typeof exp.highlights === 'string' && exp.highlights.startsWith('[')
                  ? JSON.parse(exp.highlights)
                  : exp.highlights.split('\n'))
              : [];

            return (
              <div key={exp.id || idx} className="relative flex items-center md:justify-between group">
                {/* Timeline Marker Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-orange-500 border-4 border-[#0B0C0E] flex items-center justify-center text-white shadow-lg shadow-orange-500/40 group-hover:scale-125 transition-transform z-10">
                  <Briefcase size={14} />
                </div>

                {/* Card Container */}
                <div className="ml-16 md:ml-0 md:w-[calc(50%-2rem)] glass-card p-6 rounded-card border border-white/10 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded bg-orange-950/60 border border-orange-500/30 text-orange-400 text-[10px] font-mono uppercase mb-1">
                        {exp.currentRole ? 'CURRENT ROLE' : 'TRAINING & PROJECTS'}
                      </span>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <p className="text-sm font-semibold text-orange-400">{exp.company}</p>
                    </div>

                    <div className="text-right text-xs text-muted font-mono space-y-1">
                      <div className="flex items-center gap-1 justify-end">
                        <Calendar size={12} className="text-orange-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        <MapPin size={12} className="text-slate-500" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {highlightsList.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      {highlightsList.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-muted">
                          <CheckCircle size={14} className="text-orange-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
