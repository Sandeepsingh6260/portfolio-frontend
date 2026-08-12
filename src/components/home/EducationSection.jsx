import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, ExternalLink } from 'lucide-react';

export const EducationSection = ({ education = [], certificates = [] }) => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold flex items-center gap-2">
                <GraduationCap size={16} /> EDUCATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Academic Background
              </h2>
            </div>

            <div className="space-y-6">
              {education.map((edu, i) => (
                <div key={edu.id || i} className="glass-card p-6 rounded-card border border-white/10 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                      <p className="text-sm font-semibold text-orange-400">{edu.institution}</p>
                    </div>
                    {edu.grade && (
                      <span className="px-2.5 py-1 rounded bg-orange-950/60 border border-orange-500/30 text-orange-300 text-[10px] font-mono">
                        {edu.grade}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted font-mono">
                    <span className="flex items-center gap-1"><Calendar size={12} className="text-orange-400" /> {edu.period}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-500" /> {edu.location}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold flex items-center gap-2">
                <Award size={16} /> CERTIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Training & Credentials
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.map((cert, i) => (
                <div key={cert.id || i} className="glass-card p-5 rounded-card border border-white/10 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Award size={18} className="text-orange-400" />
                      {cert.issueDate && (
                        <span className="text-[10px] font-mono text-muted">{cert.issueDate}</span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">{cert.title}</h3>
                    <p className="text-xs font-mono text-orange-400">{cert.issuer}</p>
                    <p className="text-[11px] text-muted leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-mono text-orange-400 hover:underline flex items-center gap-1 pt-2 border-t border-white/5"
                    >
                      Verify Credential <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
