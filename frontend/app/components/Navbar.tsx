'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, LayoutDashboard, History, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? 'py-4' : 'py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between px-8 py-3 rounded-3xl transition-all duration-500 ${
          scrolled ? 'glass-dark shadow-2xl scale-[0.98]' : 'bg-transparent'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-neon group-hover:rotate-12 transition-transform duration-500">
              <Brain size={24} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter leading-none">MISTAKE</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase leading-none mt-1">Analyzer</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink href="/" active={pathname === '/'} label="HOME" />
            <NavLink href="/analyze" active={pathname === '/analyze'} label="ANALYZE" />
            <NavLink href="/dashboard" active={pathname === '/dashboard'} label="DASHBOARD" />
          </div>

          {/* Action Button */}
          <div className="hidden md:block">
            <Link href="/analyze">
              <button className="px-6 py-2.5 bg-white text-black text-xs font-black rounded-xl hover:bg-accent hover:text-white transition-all active:scale-95">
                GET STARTED
              </button>
            </Link>
          </div>
          
          {/* Mobile Toggle (Simplified for MVP) */}
          <button className="md:hidden p-2 text-white/60">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, active, label }: { href: string, active: boolean, label: string }) {
  return (
    <Link href={href} className="relative px-6 py-2 group">
      <span className={`text-[11px] font-black tracking-[0.2em] transition-colors duration-300 ${
        active ? 'text-white' : 'text-white/40 group-hover:text-white'
      }`}>
        {label}
      </span>
      
      {/* Hover/Active Indicator */}
      {active && (
        <motion.div 
          layoutId="nav-pill"
          className="absolute inset-0 bg-white/[0.05] border border-white/[0.05] rounded-xl z-[-1]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      {!active && (
        <div className="absolute inset-x-6 bottom-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      )}
    </Link>
  );
}
