import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0C0E] border-t border-white/5 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-display font-bold text-lg">
              S.
            </div>
            <div>
              <p className="font-display font-bold text-white text-base">Sandeep Singh</p>
              <p className="text-xs text-muted font-mono">Built with React + Spring Boot • WorkSphere Live</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-muted">
            <a
              href={profile?.githubUrl || "https://github.com/Sandeepsingh6260"}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-btn bg-[#131519] border border-white/5 hover:text-white hover:border-orange-500/40 transition-all"
            >
              <Github size={18} />
            </a>
            <a
              href={profile?.linkedinUrl || "https://linkedin.com/in/sandeep-singh-a29314260"}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-btn bg-[#131519] border border-white/5 hover:text-white hover:border-orange-500/40 transition-all"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${profile?.email || 'sandeep9singroul@gmail.com'}`}
              className="p-2.5 rounded-btn bg-[#131519] border border-white/5 hover:text-white hover:border-orange-500/40 transition-all"
            >
              <Mail size={18} />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500 font-mono">
              © {new Date().getFullYear()} Sandeep Singh
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-btn bg-[#131519] border border-white/10 text-slate-400 hover:text-white hover:border-orange-500/40 transition-colors"
              title="Back to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
