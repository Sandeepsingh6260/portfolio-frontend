import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { portfolioApi } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  FolderGit2, 
  Cpu, 
  Briefcase, 
  Mail, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Loader2, 
  ArrowLeft, 
  User, 
  GraduationCap, 
  Award, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('PROFILE');
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  // Datasets
  const [profile, setProfile] = useState({
    fullName: '',
    primaryTitle: '',
    currentRole: '',
    currentCompany: '',
    heroHeadline: '',
    heroSubheading: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    githubUrl: '',
    linkedinUrl: '',
    resumeUrl: '',
    avatarUrl: ''
  });
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);

  // Modals & Editing states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    category: 'Full-Stack Enterprise App',
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
    statusBadge: 'LIVE PROJECT',
    featured: false,
    published: true,
    sortOrder: 1,
    techStack: '["Java", "Spring Boot", "React.js"]',
    features: '["Feature 1", "Feature 2"]',
    problemStatement: '',
    myContribution: '',
    architectureNotes: ''
  });

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Languages & Core',
    icon: 'code',
    proficiency: 85,
    sortOrder: 1
  });

  const [showExpModal, setShowExpModal] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [expForm, setExpForm] = useState({
    company: '',
    role: '',
    period: '',
    location: '',
    description: '',
    highlights: '["Key Achievement 1", "Key Achievement 2"]',
    currentRole: false,
    sortOrder: 1
  });

  const [showEduModal, setShowEduModal] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [eduForm, setEduForm] = useState({
    degree: '',
    institution: '',
    period: '',
    location: '',
    grade: '',
    description: '',
    sortOrder: 1
  });

  const [showCertModal, setShowCertModal] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    description: '',
    sortOrder: 1
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    loadAdminData();
  }, [isAuthenticated]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [profRes, projRes, skillRes, expRes, eduRes, certRes, msgRes] = await Promise.all([
        portfolioApi.getProfile().catch(() => ({ data: { success: false } })),
        portfolioApi.getAllAdminProjects().catch(() => ({ data: { success: false } })),
        portfolioApi.getSkills().catch(() => ({ data: { success: false } })),
        portfolioApi.getExperience().catch(() => ({ data: { success: false } })),
        portfolioApi.getEducation().catch(() => ({ data: { success: false } })),
        portfolioApi.getCertificates().catch(() => ({ data: { success: false } })),
        portfolioApi.getAllMessages().catch(() => ({ data: { success: false } }))
      ]);

      if (profRes.data?.success && profRes.data.data) setProfile(profRes.data.data);
      if (projRes.data?.success && projRes.data.data) setProjects(projRes.data.data);
      if (skillRes.data?.success && skillRes.data.data) setSkills(skillRes.data.data);
      if (expRes.data?.success && expRes.data.data) setExperiences(expRes.data.data);
      if (eduRes.data?.success && eduRes.data.data) setEducations(eduRes.data.data);
      if (certRes.data?.success && certRes.data.data) setCertificates(certRes.data.data);
      if (msgRes.data?.success && msgRes.data.data) setMessages(msgRes.data.data);
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg, isError = false) => {
    if (isError) {
      setSaveError(msg);
      setTimeout(() => setSaveError(''), 4000);
    } else {
      setSaveSuccess(msg);
      setTimeout(() => setSaveSuccess(''), 4000);
    }
  };

  // --- PROFILE ---
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await portfolioApi.updateProfile(profile);
      if (res.data?.success) {
        showNotification("Profile updated successfully!");
        setProfile(res.data.data);
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to update profile", true);
    }
  };

  // --- PROJECTS ---
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      category: 'Full-Stack Enterprise App',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
      liveUrl: '',
      githubUrl: '',
      statusBadge: 'LIVE PROJECT',
      featured: false,
      published: true,
      sortOrder: projects.length + 1,
      techStack: '["Java 17", "Spring Boot", "React.js", "MySQL"]',
      features: '["Feature 1", "Feature 2"]',
      problemStatement: '',
      myContribution: '',
      architectureNotes: ''
    });
    setShowProjectModal(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingProject(proj);
    setProjectForm({ ...proj });
    setShowProjectModal(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await portfolioApi.updateProject(editingProject.id, projectForm);
        showNotification("Project updated successfully!");
      } else {
        await portfolioApi.createProject(projectForm);
        showNotification("Project created successfully!");
      }
      setShowProjectModal(false);
      loadAdminData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Error saving project', true);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await portfolioApi.deleteProject(id);
      showNotification("Project deleted!");
      loadAdminData();
    }
  };

  // --- SKILLS ---
  const openNewSkillModal = () => {
    setEditingSkill(null);
    setSkillForm({
      name: '',
      category: 'Backend',
      icon: 'server',
      proficiency: 85,
      sortOrder: skills.length + 1
    });
    setShowSkillModal(true);
  };

  const openEditSkillModal = (sk) => {
    setEditingSkill(sk);
    setSkillForm({ ...sk });
    setShowSkillModal(true);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await portfolioApi.updateSkill(editingSkill.id, skillForm);
        showNotification("Skill updated!");
      } else {
        await portfolioApi.createSkill(skillForm);
        showNotification("Skill created!");
      }
      setShowSkillModal(false);
      loadAdminData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Error saving skill', true);
    }
  };

  const handleDeleteSkill = async (id) => {
    if (window.confirm("Delete this skill entry?")) {
      await portfolioApi.deleteSkill(id);
      showNotification("Skill deleted!");
      loadAdminData();
    }
  };

  // --- EXPERIENCE ---
  const openNewExpModal = () => {
    setEditingExp(null);
    setExpForm({
      company: '',
      role: '',
      period: '',
      location: '',
      description: '',
      highlights: '["Key Achievement 1", "Key Achievement 2"]',
      currentRole: false,
      sortOrder: experiences.length + 1
    });
    setShowExpModal(true);
  };

  const openEditExpModal = (exp) => {
    setEditingExp(exp);
    setExpForm({ ...exp });
    setShowExpModal(true);
  };

  const handleSaveExp = async (e) => {
    e.preventDefault();
    try {
      if (editingExp) {
        await portfolioApi.updateExperience(editingExp.id, expForm);
        showNotification("Experience entry updated!");
      } else {
        await portfolioApi.createExperience(expForm);
        showNotification("Experience entry created!");
      }
      setShowExpModal(false);
      loadAdminData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Error saving experience', true);
    }
  };

  const handleDeleteExp = async (id) => {
    if (window.confirm("Delete this experience entry?")) {
      await portfolioApi.deleteExperience(id);
      showNotification("Experience deleted!");
      loadAdminData();
    }
  };

  // --- EDUCATION ---
  const openNewEduModal = () => {
    setEditingEdu(null);
    setEduForm({
      degree: '',
      institution: '',
      period: '',
      location: '',
      grade: '',
      description: '',
      sortOrder: educations.length + 1
    });
    setShowEduModal(true);
  };

  const openEditEduModal = (edu) => {
    setEditingEdu(edu);
    setEduForm({ ...edu });
    setShowEduModal(true);
  };

  const handleSaveEdu = async (e) => {
    e.preventDefault();
    try {
      if (editingEdu) {
        await portfolioApi.updateEducation(editingEdu.id, eduForm);
        showNotification("Education entry updated!");
      } else {
        await portfolioApi.createEducation(eduForm);
        showNotification("Education entry created!");
      }
      setShowEduModal(false);
      loadAdminData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Error saving education entry', true);
    }
  };

  const handleDeleteEdu = async (id) => {
    if (window.confirm("Delete this education entry?")) {
      await portfolioApi.deleteEducation(id);
      showNotification("Education entry deleted!");
      loadAdminData();
    }
  };

  // --- CERTIFICATES ---
  const openNewCertModal = () => {
    setEditingCert(null);
    setCertForm({
      title: '',
      issuer: '',
      issueDate: '',
      credentialUrl: '',
      description: '',
      sortOrder: certificates.length + 1
    });
    setShowCertModal(true);
  };

  const openEditCertModal = (cert) => {
    setEditingCert(cert);
    setCertForm({ ...cert });
    setShowCertModal(true);
  };

  const handleSaveCert = async (e) => {
    e.preventDefault();
    try {
      if (editingCert) {
        await portfolioApi.updateCertificate(editingCert.id, certForm);
        showNotification("Certificate updated!");
      } else {
        await portfolioApi.createCertificate(certForm);
        showNotification("Certificate created!");
      }
      setShowCertModal(false);
      loadAdminData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Error saving certificate', true);
    }
  };

  const handleDeleteCert = async (id) => {
    if (window.confirm("Delete this certificate entry?")) {
      await portfolioApi.deleteCertificate(id);
      showNotification("Certificate deleted!");
      loadAdminData();
    }
  };

  // --- MESSAGES ---
  const handleMarkMessageRead = async (id) => {
    try {
      await portfolioApi.markMessageRead(id);
      showNotification("Message marked as read!");
      loadAdminData();
    } catch (err) {
      showNotification("Error marking message read", true);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm("Delete this contact message?")) {
      await portfolioApi.deleteMessage(id);
      showNotification("Contact message deleted!");
      loadAdminData();
    }
  };

  const unreadMessagesCount = messages.filter(m => !m.read).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07070A] text-white">
        <Loader2 size={36} className="animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070A] text-slate-200">
      {/* Toast Notifications */}
      {saveSuccess && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center gap-2 shadow-2xl backdrop-blur-md">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{saveSuccess}</span>
        </div>
      )}
      {saveError && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl bg-red-950/90 border border-red-500/40 text-red-200 text-xs font-semibold flex items-center gap-2 shadow-2xl backdrop-blur-md">
          <AlertCircle size={16} className="text-red-400" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Header */}
      <header className="glass-panel sticky top-0 z-30 py-4 px-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 rounded-xl bg-dark-900 border border-white/10 hover:text-white text-slate-400 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2 text-violet-400 font-display font-bold text-lg">
            <Shield size={22} />
            <span>Admin CMS Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">Signed in as <strong className="text-white">{user?.username || 'Admin'}</strong></span>
          <button
            onClick={logout}
            className="px-3.5 py-1.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-red-900/40 transition-colors"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2.5 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('PROFILE')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'PROFILE' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <User size={15} /> Profile & Bio
          </button>
          <button
            onClick={() => setActiveTab('PROJECTS')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'PROJECTS' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <FolderGit2 size={15} /> Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('SKILLS')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'SKILLS' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <Cpu size={15} /> Skills ({skills.length})
          </button>
          <button
            onClick={() => setActiveTab('EXPERIENCE')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'EXPERIENCE' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase size={15} /> Experience ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('EDUCATION')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'EDUCATION' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap size={15} /> Education ({educations.length})
          </button>
          <button
            onClick={() => setActiveTab('CERTIFICATES')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'CERTIFICATES' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <Award size={15} /> Certificates ({certificates.length})
          </button>
          <button
            onClick={() => setActiveTab('MESSAGES')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all relative ${
              activeTab === 'MESSAGES' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <Mail size={15} /> Messages ({messages.length})
            {unreadMessagesCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold">
                {unreadMessagesCount}
              </span>
            )}
          </button>
        </div>

        {/* ---------------- PROFILE TAB ---------------- */}
        {activeTab === 'PROFILE' && (
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Portfolio Profile Details</h2>
                <p className="text-xs text-slate-400">Update your hero titles, bio narrative, contact links, and resume URL.</p>
              </div>
              <button
                onClick={handleSaveProfile}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-violet-600/30 transition-all"
              >
                <Save size={16} /> Save Profile Changes
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profile.fullName || ''}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Primary Headline Title</label>
                  <input
                    type="text"
                    required
                    value={profile.primaryTitle || ''}
                    onChange={(e) => setProfile({ ...profile, primaryTitle: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">Current Role</label>
                  <input
                    type="text"
                    value={profile.currentRole || ''}
                    onChange={(e) => setProfile({ ...profile, currentRole: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Current Company / Organization</label>
                  <input
                    type="text"
                    value={profile.currentCompany || ''}
                    onChange={(e) => setProfile({ ...profile, currentCompany: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-mono">Hero Headline Banner</label>
                <input
                  type="text"
                  value={profile.heroHeadline || ''}
                  onChange={(e) => setProfile({ ...profile, heroHeadline: e.target.value })}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono">Hero Subheading</label>
                <textarea
                  rows={2}
                  value={profile.heroSubheading || ''}
                  onChange={(e) => setProfile({ ...profile, heroSubheading: e.target.value })}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono">Full Narrative Bio</label>
                <textarea
                  rows={4}
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">Contact Email</label>
                  <input
                    type="email"
                    value={profile.email || ''}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Phone Number</label>
                  <input
                    type="text"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Location</label>
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={profile.githubUrl || ''}
                    onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={profile.linkedinUrl || ''}
                    onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Resume PDF Asset URL</label>
                  <input
                    type="text"
                    value={profile.resumeUrl || ''}
                    onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-white mt-1.5 focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ---------------- PROJECTS TAB ---------------- */}
        {activeTab === 'PROJECTS' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Portfolio Projects Management</h2>
                <p className="text-xs text-slate-400">Add, edit or delete showcased project entries.</p>
              </div>
              <button
                onClick={openNewProjectModal}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-violet-600/30 transition-all"
              >
                <Plus size={16} /> Add New Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="glass-card p-5 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between hover:border-violet-500/30 transition-all">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-0.5 rounded bg-violet-950 text-violet-300 text-[10px] font-mono border border-violet-800/40">
                        {proj.statusBadge || 'PROJECT'}
                      </span>
                      {proj.featured && <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">FEATURED</span>}
                    </div>
                    <h3 className="font-bold text-white text-base leading-snug">{proj.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{proj.shortDescription}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
                    <span className="font-mono text-[11px] text-violet-400">{proj.category}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditProjectModal(proj)}
                        className="p-2 rounded-lg bg-dark-900 border border-white/10 text-slate-300 hover:text-white hover:border-violet-500/50"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-lg bg-red-950/60 border border-red-500/20 text-red-300 hover:bg-red-900/40"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- SKILLS TAB ---------------- */}
        {activeTab === 'SKILLS' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Technical Skills Management</h2>
                <p className="text-xs text-slate-400">Manage categories, icons, and proficiency percentages.</p>
              </div>
              <button
                onClick={openNewSkillModal}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-violet-600/30 transition-all"
              >
                <Plus size={16} /> Add Skill Entry
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((sk) => (
                <div key={sk.id} className="glass-card p-4 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded bg-violet-950/80 text-violet-300 text-[10px] font-mono border border-violet-800/30">
                        {sk.category}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">{sk.proficiency}%</span>
                    </div>
                    <h3 className="font-bold text-white text-sm mt-2">{sk.name}</h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[11px] font-mono text-slate-500">Icon: {sk.icon}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditSkillModal(sk)}
                        className="p-1.5 rounded-lg bg-dark-900 border border-white/10 text-slate-300 hover:text-white"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(sk.id)}
                        className="p-1.5 rounded-lg bg-red-950/60 border border-red-500/20 text-red-300 hover:bg-red-900/40"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- EXPERIENCE TAB ---------------- */}
        {activeTab === 'EXPERIENCE' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Work & Training Experience</h2>
                <p className="text-xs text-slate-400">Manage professional timeline entries and key achievement highlights.</p>
              </div>
              <button
                onClick={openNewExpModal}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-violet-600/30 transition-all"
              >
                <Plus size={16} /> Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-white text-base">{exp.role}</h3>
                      <span className="px-2.5 py-0.5 rounded bg-violet-950 text-violet-300 text-[10px] font-mono">
                        {exp.period}
                      </span>
                      {exp.currentRole && (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-mono">
                          PRESENT
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-300">{exp.company} • {exp.location}</p>
                    <p className="text-xs text-slate-400">{exp.description}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      onClick={() => openEditExpModal(exp)}
                      className="px-3 py-1.5 rounded-xl bg-dark-900 border border-white/10 text-slate-300 hover:text-white text-xs flex items-center gap-1"
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExp(exp.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/20 text-red-300 hover:bg-red-900/40 text-xs flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- EDUCATION TAB ---------------- */}
        {activeTab === 'EDUCATION' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Education & Degrees</h2>
                <p className="text-xs text-slate-400">Manage academic qualification entries.</p>
              </div>
              <button
                onClick={openNewEduModal}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-violet-600/30 transition-all"
              >
                <Plus size={16} /> Add Education Entry
              </button>
            </div>

            <div className="space-y-4">
              {educations.map((edu) => (
                <div key={edu.id} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-white text-base">{edu.degree}</h3>
                      <span className="px-2.5 py-0.5 rounded bg-violet-950 text-violet-300 text-[10px] font-mono">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-300">{edu.institution}</p>
                    {edu.grade && <p className="text-xs font-mono text-emerald-400">{edu.grade}</p>}
                    <p className="text-xs text-slate-400">{edu.description}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      onClick={() => openEditEduModal(edu)}
                      className="px-3 py-1.5 rounded-xl bg-dark-900 border border-white/10 text-slate-300 hover:text-white text-xs flex items-center gap-1"
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEdu(edu.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/20 text-red-300 hover:bg-red-900/40 text-xs flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- CERTIFICATES TAB ---------------- */}
        {activeTab === 'CERTIFICATES' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Certifications & Training Licenses</h2>
                <p className="text-xs text-slate-400">Manage credentials and verification links.</p>
              </div>
              <button
                onClick={openNewCertModal}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-violet-600/30 transition-all"
              >
                <Plus size={16} /> Add Certificate
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="glass-card p-5 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-0.5 rounded bg-violet-950 text-violet-300 text-[10px] font-mono">
                        {cert.issueDate}
                      </span>
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 text-xs flex items-center gap-1">
                          Verify <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                    <h3 className="font-bold text-white text-base">{cert.title}</h3>
                    <p className="text-xs font-mono text-slate-400">{cert.issuer}</p>
                    <p className="text-xs text-slate-400">{cert.description}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
                    <button
                      onClick={() => openEditCertModal(cert)}
                      className="p-2 rounded-lg bg-dark-900 border border-white/10 text-slate-300 hover:text-white"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteCert(cert.id)}
                      className="p-2 rounded-lg bg-red-950/60 border border-red-500/20 text-red-300 hover:bg-red-900/40"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- MESSAGES TAB ---------------- */}
        {activeTab === 'MESSAGES' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Received Contact Messages</h2>
              <p className="text-xs text-slate-400">Review inquiries submitted via the portfolio contact form.</p>
            </div>

            {messages.length === 0 ? (
              <div className="glass-card p-8 rounded-2xl text-center text-slate-400 text-sm">
                No contact messages received yet.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`glass-card p-6 rounded-2xl border ${msg.read ? 'border-white/5 opacity-80' : 'border-violet-500/40 bg-violet-950/10'} space-y-3`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{msg.name}</h3>
                          {!msg.read && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                              NEW UNREAD
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-violet-400 mt-0.5">{msg.email}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!msg.read && (
                          <button
                            onClick={() => handleMarkMessageRead(msg.id)}
                            className="px-3 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1 hover:bg-emerald-900/40"
                          >
                            <Check size={14} /> Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {msg.subject && <p className="text-xs font-semibold text-slate-200">Subject: {msg.subject}</p>}
                    <p className="text-xs text-slate-300 leading-relaxed bg-dark-950 p-4 rounded-xl border border-white/5">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODALS FOR PROJECT, SKILL, EXPERIENCE, EDUCATION, CERTIFICATE */}
      {/* ========================================================================= */}

      {/* --- PROJECT MODAL --- */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 border border-white/10 bg-dark-900/95 my-8">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingProject ? 'Edit Showcase Project' : 'Create New Showcase Project'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">Title</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Slug</label>
                  <input
                    type="text"
                    required
                    value={projectForm.slug}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-mono">Short Description</label>
                <textarea
                  rows={2}
                  value={projectForm.shortDescription || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono">Full Detailed Description</label>
                <textarea
                  rows={3}
                  value={projectForm.description || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">Status Badge</label>
                  <input
                    type="text"
                    value={projectForm.statusBadge || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, statusBadge: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Category</label>
                  <input
                    type="text"
                    value={projectForm.category || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">Live Demo URL</label>
                  <input
                    type="text"
                    value={projectForm.liveUrl || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={projectForm.githubUrl || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={projectForm.featured || false}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  /> Featured Project
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={projectForm.published ?? true}
                    onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })}
                  /> Published
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-dark-950 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SKILL MODAL --- */}
      {showSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md glass-card rounded-3xl p-6 border border-white/10 bg-dark-900/95">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingSkill ? 'Edit Skill Entry' : 'Create Skill Entry'}
            </h3>

            <form onSubmit={handleSaveSkill} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-mono">Skill Name</label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. Spring Boot"
                  className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">Category</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  >
                    <option value="Languages & Core">Languages & Core</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Database & Cache">Database & Cache</option>
                    <option value="Tools">Tools</option>
                    <option value="Messaging">Messaging</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Icon Keyword</label>
                  <input
                    type="text"
                    value={skillForm.icon}
                    onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
                    placeholder="server, code, database..."
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-mono mb-1">
                  <span>Proficiency Percentage</span>
                  <span className="text-violet-400 font-bold">{skillForm.proficiency}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={skillForm.proficiency}
                  onChange={(e) => setSkillForm({ ...skillForm, proficiency: parseInt(e.target.value) })}
                  className="w-full accent-violet-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowSkillModal(false)}
                  className="px-4 py-2 rounded-xl bg-dark-950 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EXPERIENCE MODAL --- */}
      {showExpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 border border-white/10 bg-dark-900/95">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingExp ? 'Edit Experience Entry' : 'Create Experience Entry'}
            </h3>

            <form onSubmit={handleSaveExp} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">Company / Org</label>
                  <input
                    type="text"
                    required
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Role Title</label>
                  <input
                    type="text"
                    required
                    value={expForm.role}
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">Period (e.g. 04/2026 – Present)</label>
                  <input
                    type="text"
                    required
                    value={expForm.period}
                    onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Location</label>
                  <input
                    type="text"
                    value={expForm.location}
                    onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-mono">Description Summary</label>
                <textarea
                  rows={3}
                  value={expForm.description}
                  onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={expForm.currentRole || false}
                  onChange={(e) => setExpForm({ ...expForm, currentRole: e.target.checked })}
                /> Current Active Role
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowExpModal(false)}
                  className="px-4 py-2 rounded-xl bg-dark-950 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDUCATION MODAL --- */}
      {showEduModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 border border-white/10 bg-dark-900/95">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingEdu ? 'Edit Education Entry' : 'Create Education Entry'}
            </h3>

            <form onSubmit={handleSaveEdu} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-mono">Degree Title</label>
                <input
                  type="text"
                  required
                  value={eduForm.degree}
                  onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono">Institution / University</label>
                <input
                  type="text"
                  required
                  value={eduForm.institution}
                  onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">Period (e.g. 2020 – 2024)</label>
                  <input
                    type="text"
                    required
                    value={eduForm.period}
                    onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Grade / Division</label>
                  <input
                    type="text"
                    value={eduForm.grade}
                    onChange={(e) => setEduForm({ ...eduForm, grade: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-mono">Description</label>
                <textarea
                  rows={2}
                  value={eduForm.description}
                  onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowEduModal(false)}
                  className="px-4 py-2 rounded-xl bg-dark-950 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500"
                >
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CERTIFICATE MODAL --- */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 border border-white/10 bg-dark-900/95">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingCert ? 'Edit Certificate' : 'Create Certificate'}
            </h3>

            <form onSubmit={handleSaveCert} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-mono">Certificate Title</label>
                <input
                  type="text"
                  required
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">Issuer</label>
                  <input
                    type="text"
                    required
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Issue Date / Year</label>
                  <input
                    type="text"
                    value={certForm.issueDate}
                    onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-mono">Credential URL</label>
                <input
                  type="text"
                  value={certForm.credentialUrl}
                  onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono">Description</label>
                <textarea
                  rows={2}
                  value={certForm.description}
                  onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="px-4 py-2 rounded-xl bg-dark-950 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
