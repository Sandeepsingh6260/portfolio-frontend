import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Github, Linkedin, MapPin, Phone } from 'lucide-react';
import { portfolioApi } from '../../services/api';

export const ContactSection = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await portfolioApi.sendContact(formData);
      if (res.data.success) {
        setStatus({
          loading: false,
          success: 'Thank you! Your message has been sent successfully. I will get back to you soon.',
          error: null
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: null,
        error: err.response?.data?.message || 'Failed to send message. Please check input fields.'
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#131519]/60 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">CONTACT</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Let's Connect & Build
          </h2>
          <p className="text-muted text-sm">
            Interested in discussing WorkSphere, full-stack developer roles, or collaboration? Send a message below!
          </p>
          <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 rounded-card border border-white/10 space-y-6">
              <h3 className="text-xl font-display font-bold text-white">Direct Contact</h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-[#1B1E24] text-orange-400 border border-orange-500/20">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-muted">Email</p>
                    <a href={`mailto:${profile?.email || 'sandeep9singroul@gmail.com'}`} className="text-white hover:text-orange-400 font-medium">
                      {profile?.email || 'sandeep9singroul@gmail.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-[#1B1E24] text-orange-400 border border-orange-500/20">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-muted">Phone</p>
                    <a href={`tel:${profile?.phone || '6260676770'}`} className="text-white hover:text-orange-400 font-medium">
                      {profile?.phone || '+91 6260676770'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-[#1B1E24] text-orange-400 border border-orange-500/20">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-muted">Location</p>
                    <p className="text-white font-medium">{profile?.location || 'Madhya Pradesh, India'}</p>
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="pt-4 border-t border-white/10 flex gap-3">
                <a
                  href={profile?.githubUrl || "https://github.com/Sandeepsingh6260"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-btn bg-[#0B0C0E] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono"
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href={profile?.linkedinUrl || "https://linkedin.com/in/sandeep-singh-a29314260"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-btn bg-[#0B0C0E] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-card border border-white/10 space-y-5">
              {status.success && (
                <div className="p-4 rounded-btn bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>{status.success}</span>
                </div>
              )}

              {status.error && (
                <div className="p-4 rounded-btn bg-red-950/80 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Sandeep Singh"
                    className="w-full px-4 py-3 rounded-btn bg-[#0B0C0E] border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-btn bg-[#0B0C0E] border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry / WorkSphere / Opportunity"
                  className="w-full px-4 py-3 rounded-btn bg-[#0B0C0E] border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Sandeep, I looked at your portfolio and WorkSphere project..."
                  className="w-full px-4 py-3 rounded-btn bg-[#0B0C0E] border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-3.5 px-6 rounded-btn bg-orange-500 hover:bg-orange-400 text-white font-semibold text-xs transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status.loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
