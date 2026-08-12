import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { SkillsSection } from '../components/home/SkillsSection';
import { ExperienceSection } from '../components/home/ExperienceSection';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { EducationSection } from '../components/home/EducationSection';
import { ContactSection } from '../components/home/ContactSection';
import { AdminLoginModal } from '../components/admin/AdminLoginModal';
import { portfolioApi } from '../services/api';
import { Loader2 } from 'lucide-react';

export const HomePage = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      const [profRes, skillRes, expRes, projRes, eduRes, certRes] = await Promise.all([
        portfolioApi.getProfile(),
        portfolioApi.getSkills(),
        portfolioApi.getExperience(),
        portfolioApi.getProjects(),
        portfolioApi.getEducation(),
        portfolioApi.getCertificates()
      ]);

      if (profRes.data.success) setProfile(profRes.data.data);
      if (skillRes.data.success) setSkills(skillRes.data.data);
      if (expRes.data.success) setExperiences(expRes.data.data);
      if (projRes.data.success) setProjects(projRes.data.data);
      if (eduRes.data.success) setEducation(eduRes.data.data);
      if (certRes.data.success) setCertificates(certRes.data.data);
    } catch (error) {
      console.error("Failed to load portfolio data from Spring Boot API", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07070A] flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 size={40} className="animate-spin text-violet-500" />
        <p className="font-mono text-sm text-slate-400">Loading Sandeep Singh's Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070A] text-slate-200 selection:bg-violet-600/30 selection:text-violet-300">
      <Navbar onOpenAdminLogin={() => setIsAdminModalOpen(true)} />

      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} />
        <EducationSection education={education} certificates={certificates} />
        <ContactSection profile={profile} />
      </main>

      <Footer profile={profile} />

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};
