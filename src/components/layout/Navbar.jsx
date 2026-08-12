import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield, LogOut, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ onOpenAdminLogin, resumeUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-panel py-3.5 shadow-xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Monogram Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              S.
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-orange-400 transition-colors">
                Sandeep Singh
              </span>
              <span className="block text-[10px] text-orange-500 font-mono tracking-wider uppercase font-medium">Java Full Stack Developer</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#131519]/90 px-3 py-1.5 rounded-full border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={resumeUrl || "#"}
              download
              className="px-4 py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-400 rounded-btn shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] flex items-center gap-1.5"
            >
              <Download size={14} /> Resume
            </a>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="px-3 py-2 text-xs font-medium text-orange-400 bg-orange-950/40 border border-orange-500/30 rounded-btn flex items-center gap-1.5 hover:bg-orange-900/40"
                >
                  <Shield size={14} /> Admin CMS
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-btn transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-2 text-slate-400 hover:text-orange-400 hover:bg-white/5 rounded-btn transition-colors"
                title="Admin Portal"
              >
                <Shield size={16} />
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-btn bg-[#131519] border border-white/10"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-orange-400 hover:bg-white/5 rounded-lg"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={resumeUrl || "#"}
              download
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold text-white bg-orange-500 rounded-btn flex items-center justify-center gap-1.5"
            >
              <Download size={14} /> Download Resume
            </a>
            {!isAuthenticated && (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdminLogin(); }}
                className="w-full text-center py-2 text-xs text-slate-400 hover:text-orange-300"
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
