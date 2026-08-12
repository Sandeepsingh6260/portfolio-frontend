import React, { useState } from 'react';
import { Server, Code, Database, Wrench, Rss, Layers, CheckCircle2 } from 'lucide-react';

export const SkillsSection = ({ skills = [] }) => {
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = [
    'ALL',
    'Languages & Core',
    'Backend',
    'Frontend',
    'Database & Cache',
    'Tools',
    'Messaging'
  ];

  const filteredSkills = activeTab === 'ALL'
    ? skills
    : skills.filter(s => s.category === activeTab);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Backend': return <Server size={18} className="text-orange-400" />;
      case 'Frontend': return <Code size={18} className="text-orange-400" />;
      case 'Database & Cache': return <Database size={18} className="text-orange-400" />;
      case 'Tools': return <Wrench size={18} className="text-orange-400" />;
      case 'Messaging': return <Rss size={18} className="text-orange-400" />;
      default: return <Layers size={18} className="text-orange-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#131519]/50 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">SKILLS</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Technical Stack & Core Competencies
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-btn text-xs font-mono font-semibold transition-all ${
                activeTab === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'glass-card text-muted hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id || skill.name}
              className="glass-card p-4 rounded-card border border-white/10 flex items-center justify-between group hover:border-orange-500/40"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#0B0C0E] border border-white/5 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(skill.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm group-hover:text-orange-400 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-[11px] text-muted font-mono">{skill.category}</p>
                </div>
              </div>

              <CheckCircle2 size={16} className="text-orange-500 opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
