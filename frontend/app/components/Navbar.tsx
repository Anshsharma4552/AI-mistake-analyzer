'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Zap, LayoutDashboard, History } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 glass rounded-full neon-glow">
        <NavLink href="/" active={pathname === '/'} icon={<Brain size={18} />} label="AI Mistake Analyzer" isLogo />
        <div className="w-[1px] h-4 bg-white/10 mx-2" />
        <NavLink href="/analyze" active={pathname === '/analyze'} icon={<Zap size={18} />} label="Analyze" />
        <NavLink href="/dashboard" active={pathname === '/dashboard'} icon={<LayoutDashboard size={18} />} label="Dashboard" />
      </div>
    </nav>
  );
}

function NavLink({ href, active, icon, label, isLogo = false }: { href: string, active: boolean, icon: React.ReactNode, label: string, isLogo?: boolean }) {
  return (
    <Link href={href} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all relative ${
      active ? 'text-white' : 'text-white/40 hover:text-white/70'
    }`}>
      {icon}
      {!isLogo && <span className="text-sm font-medium">{label}</span>}
      {isLogo && <span className="text-sm font-bold tracking-tighter">{label}</span>}
      
      {active && !isLogo && (
        <motion.div 
          layoutId="nav-active"
          className="absolute inset-0 bg-white/10 rounded-full z-[-1]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}
