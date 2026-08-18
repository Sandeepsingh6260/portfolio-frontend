import React from 'react';
import { Github, ArrowRight, Sparkles } from 'lucide-react';
import { getProjectImage } from '../../utils/projectImages';

export const ProjectCard = ({ project, onSelectProject, isFeatured = false }) => {
  const techList = project.techStack
    ? (typeof project.techStack === 'string' && project.techStack.startsWith('[')
        ? JSON.parse(project.techStack)
        : project.techStack.split(','))
    : [];

  const imageUrl = getProjectImage(project);

  return (
    <div
      className={`glass-card overflow-hidden border border-white/10 flex flex-col group transition-all duration-300 ${
        isFeatured
          ? 'lg:col-span-12 bg-gradient-to-br from-[#131519] via-[#1B1E24] to-[#131519] border-orange-500/40 shadow-2xl shadow-black'
          : 'lg:col-span-6'
      }`}
    >
      <div className={`grid grid-cols-1 ${isFeatured ? 'lg:grid-cols-12' : ''} gap-0 h-full`}>
        {/* Thumbnail Image Box */}
        <div className={`relative overflow-hidden bg-[#0B0C0E] ${isFeatured ? 'lg:col-span-7 h-64 lg:h-[340px]' : 'h-56'}`}>
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-black/20" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-[11px] font-mono font-semibold tracking-wide uppercase shadow-lg shadow-orange-500/40 flex items-center gap-1">
              {isFeatured && <Sparkles size={12} className="text-yellow-200" />}
              {project.statusBadge || 'FEATURED'}
            </span>
          </div>
        </div>

        {/* Project Content Box */}
        <div className={`p-6 sm:p-8 flex flex-col justify-between space-y-6 ${isFeatured ? 'lg:col-span-5' : ''}`}>
          <div className="space-y-3">
            <span className="text-xs font-mono text-orange-400 font-semibold uppercase tracking-wider">
              {project.category}
            </span>

            <h3 className={`font-display font-bold text-white group-hover:text-orange-400 transition-colors ${isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
              {project.title}
            </h3>

            <p className="text-muted text-xs sm:text-sm leading-relaxed line-clamp-3">
              {project.shortDescription || project.description}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {techList.slice(0, 6).map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-[#1B1E24] border border-white/5 text-[11px] font-mono text-slate-300"
                >
                  {tech.replace(/["[\]]/g, '').trim()}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onSelectProject(project)}
                className="flex-1 py-2.5 px-4 rounded-btn bg-orange-500 hover:bg-orange-400 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20"
              >
                View Project Details <ArrowRight size={14} />
              </button>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-btn glass-card text-slate-300 hover:text-white"
                  title="View GitHub Repository"
                >
                  <Github size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
