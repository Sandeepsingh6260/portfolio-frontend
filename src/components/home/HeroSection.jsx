import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import profilePhoto from '../../assets/sandeep-profile.jpeg';

export const HeroSection = ({ profile }) => {
  // Badges that orbit around the circular profile image
  const orbitalBadges = [
    { name: 'Java 17', dotColor: 'bg-red-400', positionClass: '-top-4 left-1/2 -translate-x-1/2' },
    { name: 'Spring Boot', dotColor: 'bg-emerald-400', positionClass: 'top-1/4 -right-6 -translate-y-1/2' },
    { name: 'MySQL', dotColor: 'bg-blue-400', positionClass: 'bottom-1/4 -right-6 translate-y-1/2' },
    { name: 'REST APIs', dotColor: 'bg-orange-400', positionClass: 'bottom-1/4 -left-6 translate-y-1/2' },
    { name: 'React.js', dotColor: 'bg-cyan-400', positionClass: 'top-1/4 -left-6 -translate-y-1/2' },
  ];

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text Content */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/40 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Java Full Stack Developer
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.05]">
                Hi, I'm <span className="text-orange-500">Sandeep Singh</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
                {profile?.heroHeadline || "Building Secure, Scalable Enterprise Applications."}
              </p>
            </div>

            <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
              {profile?.heroSubheading || "Full-Stack Software Engineer specializing in Java 17, Spring Boot, Spring Security, REST APIs, MySQL, Redis, Kafka, and modern React.js web application development."}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-btn bg-orange-500 hover:bg-orange-400 text-white font-semibold text-xs tracking-wide shadow-lg shadow-orange-500/25 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                View My Work <ArrowRight size={16} />
              </a>

              <a
                href={profile?.resumeUrl || "/assets/Sandeep_Singh_Resume.pdf"}
                download="Sandeep_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-btn glass-card text-slate-200 hover:text-white font-semibold text-xs flex items-center gap-2 border border-white/10"
              >
                <Download size={16} /> Download Resume
              </a>
            </div>

            {/* Social & Contact Links */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-center lg:justify-start gap-6 text-muted">
              <a
                href={profile?.githubUrl || "https://github.com/Sandeepsingh6260"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-orange-400 transition-colors text-xs font-mono"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href={profile?.linkedinUrl || "https://linkedin.com/in/sandeep-singh-a29314260"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-orange-400 transition-colors text-xs font-mono"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a
                href={`mailto:${profile?.email || 'sandeep9singroul@gmail.com'}`}
                className="flex items-center gap-2 hover:text-orange-400 transition-colors text-xs font-mono"
              >
                <Mail size={18} /> Email
              </a>
            </div>
          </div>

          {/* Right Column Rotating Profile & Revolving Badges Showcase */}
          <div className="lg:col-span-6 flex justify-center items-center relative py-10">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">

              {/* Ambient Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 via-teal-500/20 to-indigo-500/30 rounded-full blur-3xl pointer-events-none" />

              {/* Rotating Gradient Ring */}
              <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-orange-500 via-teal-400 to-indigo-500 animate-spin-slow shadow-2xl shadow-orange-500/20" />

              {/* Inner Circular Portrait Frame */}
              <div className="relative w-[calc(100%-14px)] h-[calc(100%-14px)] rounded-full overflow-hidden border-4 border-[#0B0C0E] shadow-2xl bg-[#131519] group z-10">
                <img
                  src={profilePhoto}
                  alt="Sandeep Singh"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* 360-Degree Revolving Orbital Container */}
              <div className="absolute -inset-6 rounded-full animate-orbit pointer-events-none z-20">
                {orbitalBadges.map((badge, idx) => (
                  <div key={idx} className={`absolute ${badge.positionClass} pointer-events-auto`}>
                    {/* Counter-rotation to keep badge text upright */}
                    <div className="animate-orbit-counter">
                      <div className="px-3.5 py-1.5 rounded-xl bg-[#131519]/95 border border-white/10 shadow-2xl backdrop-blur-md flex items-center gap-2 hover:scale-110 transition-transform">
                        <span className={`w-2 h-2 rounded-full ${badge.dotColor}`} />
                        <span className="text-xs font-mono font-semibold text-white whitespace-nowrap">{badge.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fixed Status Pill Badge at Bottom Center */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 w-max max-w-[90%] pointer-events-auto">
                <div className="px-4 py-2 rounded-full bg-[#131519]/95 border border-orange-500/40 shadow-2xl backdrop-blur-md flex items-center gap-2 hover:border-orange-400 transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute" />
                  <span className="text-xs font-sans font-medium text-slate-200 pl-3">
                    Open to internship & developer opportunities
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
