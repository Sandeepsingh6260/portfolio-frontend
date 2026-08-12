import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { portfolioApi } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, FolderGit2, Cpu, Briefcase, Mail, LogOut, Plus, Trash2, Edit3, Check, Loader2, ArrowLeft } from 'lucide-react';

export const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('PROJECTS');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Modals
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
    features: '["Feature 1", "Feature 2"]'
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
      const [projRes, skillRes, expRes, msgRes] = await Promise.all([
        portfolioApi.getAllAdminProjects(),
        portfolioApi.getSkills(),
        portfolioApi.getExperience(),
        portfolioApi.getAllMessages()
      ]);

      if (projRes.data.success) setProjects(projRes.data.data);
      if (skillRes.data.success) setSkills(skillRes.data.data);
      if (expRes.data.success) setExperiences(expRes.data.data);
      if (msgRes.data.success) setMessages(msgRes.data.data);
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await portfolioApi.deleteProject(id);
      loadAdminData();
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await portfolioApi.updateProject(editingProject.id, projectForm);
      } else {
        await portfolioApi.createProject(projectForm);
      }
      setShowProjectModal(false);
      setEditingProject(null);
      loadAdminData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving project');
    }
  };

  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      category: 'Full-Stack App',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
      liveUrl: '',
      githubUrl: '',
      statusBadge: 'FEATURED',
      featured: false,
      published: true,
      sortOrder: projects.length + 1,
      techStack: '["Java 17", "Spring Boot", "React.js"]',
      features: '["REST APIs", "Clean Architecture"]'
    });
    setShowProjectModal(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingProject(proj);
    setProjectForm({ ...proj });
    setShowProjectModal(true);
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm("Delete this contact message?")) {
      await portfolioApi.deleteMessage(id);
      loadAdminData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07070A] text-white">
        <Loader2 size={32} className="animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070A] text-slate-200">
      {/* Top Header */}
      <header className="glass-panel sticky top-0 z-30 py-4 px-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 rounded-xl bg-dark-900 border border-white/10 hover:text-white text-slate-400">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2 text-violet-400 font-display font-bold text-lg">
            <Shield size={22} />
            <span>Admin CMS Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-slate-400">Signed in as <strong className="text-white">{user?.username}</strong></span>
          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-1.5 hover:bg-red-900/40"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('PROJECTS')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 ${
              activeTab === 'PROJECTS' ? 'bg-violet-600 text-white' : 'glass-card text-slate-400'
            }`}
          >
            <FolderGit2 size={16} /> Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('SKILLS')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 ${
              activeTab === 'SKILLS' ? 'bg-violet-600 text-white' : 'glass-card text-slate-400'
            }`}
          >
            <Cpu size={16} /> Skills ({skills.length})
          </button>
          <button
            onClick={() => setActiveTab('EXPERIENCE')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 ${
              activeTab === 'EXPERIENCE' ? 'bg-violet-600 text-white' : 'glass-card text-slate-400'
            }`}
          >
            <Briefcase size={16} /> Experience ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('MESSAGES')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 ${
              activeTab === 'MESSAGES' ? 'bg-violet-600 text-white' : 'glass-card text-slate-400'
            }`}
          >
            <Mail size={16} /> Contact Messages ({messages.length})
          </button>
        </div>

        {/* PROJECTS TAB */}
        {activeTab === 'PROJECTS' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Portfolio Projects Management</h2>
              <button
                onClick={openNewProjectModal}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-violet-600/30"
              >
                <Plus size={16} /> Add New Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="glass-card p-5 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 text-[10px] font-mono">
                        {proj.statusBadge}
                      </span>
                      {proj.featured && <span className="text-[10px] font-bold text-yellow-400">FEATURED</span>}
                    </div>
                    <h3 className="font-bold text-white text-lg">{proj.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{proj.shortDescription}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
                    <button
                      onClick={() => openEditProjectModal(proj)}
                      className="p-2 rounded-lg bg-dark-900 border border-white/10 text-slate-300 hover:text-white"
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
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'MESSAGES' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Received Contact Messages</h2>

            {messages.length === 0 ? (
              <p className="text-sm text-slate-400">No contact messages received yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white text-base">{msg.name}</h3>
                        <p className="text-xs font-mono text-violet-400">{msg.email}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
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

      {/* Add / Edit Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 border border-white/10 bg-dark-900/95 my-8">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingProject ? 'Edit Project' : 'Create New Project'}
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
                  value={projectForm.shortDescription}
                  onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-mono">Status Badge</label>
                  <input
                    type="text"
                    value={projectForm.statusBadge}
                    onChange={(e) => setProjectForm({ ...projectForm, statusBadge: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Category</label>
                  <input
                    type="text"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-dark-950 border border-white/10 text-white mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  /> Featured Project
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={projectForm.published}
                    onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })}
                  /> Published
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-dark-950 text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 text-white font-semibold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
