import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Code2 } from 'lucide-react';

export const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  const techList = project.techStack
    ? (typeof project.techStack === 'string' && project.techStack.startsWith('[')
        ? JSON.parse(project.techStack)
        : project.techStack.split(','))
    : [];

  const featuresList = project.features
    ? (typeof project.features === 'string' && project.features.startsWith('[')
        ? JSON.parse(project.features)
        : project.features.split('\n'))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl my-8 bg-[#131519]/95 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0B0C0E]/80 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-[11px] font-mono font-semibold uppercase">
              {project.statusBadge || 'PROJECT'}
            </span>
            <span className="text-xs font-mono text-muted">{project.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-btn bg-[#1B1E24] border border-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          {/* Title & Description */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description || project.shortDescription}
            </p>
          </div>

          {/* Project Image Display */}
          {project.imageUrl && (
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-white/10 bg-[#0B0C0E]">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Tech Stack List */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono text-orange-400 uppercase tracking-widest font-semibold flex items-center gap-2">
              <Code2 size={16} /> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techList.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-md bg-[#1B1E24] border border-orange-500/30 text-orange-300 text-xs font-mono"
                >
                  {t.replace(/["[\]]/g, '').trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Features List */}
          {featuresList.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono text-orange-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} /> Key Features & Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuresList.map((f, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#0B0C0E] border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300">{f.replace(/["[\]]/g, '').trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problem & Contribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            {project.problemStatement && (
              <div className="p-5 rounded-xl bg-[#1B1E24] border border-white/5 space-y-2">
                <h4 className="text-xs font-mono text-orange-400 uppercase font-semibold">Problem / Purpose</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{project.problemStatement}</p>
              </div>
            )}

            {project.myContribution && (
              <div className="p-5 rounded-xl bg-[#1B1E24] border border-white/5 space-y-2">
                <h4 className="text-xs font-mono text-orange-400 uppercase font-semibold">My Contribution</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{project.myContribution}</p>
              </div>
            )}
          </div>

          {/* Architecture Notes */}
          {project.architectureNotes && (
            <div className="p-5 rounded-xl bg-[#0B0C0E] border border-white/5 space-y-2">
              <h4 className="text-xs font-mono text-amber-400 uppercase font-semibold flex items-center gap-1.5">
                <Layers size={14} /> Architecture & Pattern Details
              </h4>
              <p className="text-xs text-muted leading-relaxed font-mono">{project.architectureNotes}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-white/10 bg-[#0B0C0E]/90 flex items-center justify-end gap-3 sticky bottom-0 z-20 backdrop-blur-md">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-btn glass-card text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2"
            >
              <Github size={16} /> Repository
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-btn bg-orange-500 hover:bg-orange-400 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20"
            >
              Live Demo <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
