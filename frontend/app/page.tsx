'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, Brain, Shield, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      
      {/* Floating Particles (CSS only for performance) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white/10 rounded-full animate-float"
            style={{
              width: Math.random() * 4 + 'px',
              height: Math.random() * 4 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 10 + 10 + 's',
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="z-10 text-center space-y-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 glass mb-4"
        >
          <Sparkles size={16} className="text-accent" />
          <span className="text-xs font-medium tracking-widest uppercase text-white/60">
            Evolutionary Cognitive Analysis
          </span>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl font-black tracking-tighter leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          We don’t fix <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent">
            your answers.
          </span>
          <br />
          We fix your thinking.
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Meet the world's first AI mentor that scans your reasoning logic, detects conceptual gaps, and maps your cognitive growth in real-time.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link href="/analyze" className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <button className="relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-white/90 transition-all flex items-center space-x-3">
              <span>Initiate Scan</span>
              <Zap size={20} fill="black" />
            </button>
          </Link>
          
          <button className="px-10 py-5 bg-white/5 border border-white/10 glass rounded-full font-bold text-lg hover:bg-white/10 transition-all">
            How it works
          </button>
        </motion.div>
      </div>

      {/* Feature Micro-cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <FeatureCard 
          icon={<Brain className="text-primary" />}
          title="Cognitive Mapping"
          desc="AI identifies patterns in your logic to pinpoint exactly where your reasoning breaks down."
        />
        <FeatureCard 
          icon={<Shield className="text-accent" />}
          title="Concept Gap Detection"
          desc="Visualizes missing foundational knowledge that prevents you from solving complex problems."
        />
        <FeatureCard 
          icon={<Sparkles className="text-yellow-400" />}
          title="Adaptive Mentorship"
          desc="Not just an AI, but a mentor that grows with you, adjusting challenges to your logic profile."
        />
      </motion.div>

      {/* Decorative Blur Gradients */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 glass hover:border-white/10 transition-all group">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
