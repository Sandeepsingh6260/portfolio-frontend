import React, { useState } from 'react';
import { ProjectCard } from '../projects/ProjectCard';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';

export const ProjectsSection = ({ projects = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  // WorkSphere featured project first
  const featuredProject = projects.find(p => p.featured || p.slug === 'worksphere') || projects[0];
  const otherProjects = projects.filter(p => p !== featuredProject);

  return (
    <section id="projects" className="py-20 bg-dark-900/40 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">Featured Work</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Production & Engineering Projects
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* WorkSphere Featured Card */}
          {featuredProject && (
            <ProjectCard
              project={featuredProject}
              onSelectProject={setSelectedProject}
              isFeatured={true}
            />
          )}

          {/* Other Projects */}
          {otherProjects.map((project) => (
            <ProjectCard
              key={project.id || project.slug}
              project={project}
              onSelectProject={setSelectedProject}
              isFeatured={false}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
