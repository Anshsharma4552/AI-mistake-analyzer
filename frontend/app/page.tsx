'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Zap, Brain, Shield, Sparkles, ChevronRight, Activity, Cpu, Target } from 'lucide-react';
import { useRef } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] bg-background">
      
      {/* --- BACKGROUND SYSTEM --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Dynamic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-grid-move"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="particle absolute bg-white/20 rounded-full"
              style={{
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-6xl w-full flex flex-col items-center text-center space-y-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group flex items-center space-x-3 px-5 py-2 rounded-full glass border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-5 h-5 rounded-full border border-black bg-gradient-to-br from-primary to-accent"></div>
              ))}
            </div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 group-hover:text-white/80 transition-colors">
              Neural Analysis Engine v4.2
            </span>
            <ChevronRight size={14} className="text-white/30 group-hover:translate-x-1 transition-transform" />
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <motion.h1 
              className="text-6xl md:text-9xl font-black tracking-tight leading-[0.9]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-gradient">NOT JUST</span><br />
              <span className="text-gradient-vibrant italic">ANSWERS.</span>
            </motion.h1>
            <motion.p 
              className="text-4xl md:text-6xl font-bold text-white/20 tracking-tighter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              COGNITIVE RECONSTRUCTION.
            </motion.p>
          </div>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            We deploy advanced neural mapping to scan your thinking patterns. 
            Identify logical loops, bridge conceptual voids, and transform your reasoning into a competitive advantage.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link href="/analyze" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <button className="relative px-12 py-6 bg-white text-black rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-3">
                <span>START SCAN</span>
                <Activity size={24} className="animate-pulse" />
              </button>
            </Link>
            
            <button className="px-12 py-6 bg-white/5 border border-white/10 glass rounded-2xl font-bold text-xl hover:bg-white/10 transition-all flex items-center space-x-2">
              <Cpu size={20} className="text-white/40" />
              <span>CORE LOGS</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-30"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            index={1}
            icon={<Brain size={32} className="text-primary" />}
            title="Reasoning Scan"
            desc="Our AI doesn't look at the result. It looks at the path you took to get there, mapping every logical junction."
          />
          <FeatureCard 
            index={2}
            icon={<Target size={32} className="text-accent" />}
            title="Void Identification"
            desc="We pinpoint the exact 'missing links' in your conceptual framework that lead to repetitive errors."
          />
          <FeatureCard 
            index={3}
            icon={<Shield size={32} className="text-green-400" />}
            title="Thinking Defense"
            desc="Build a robust cognitive architecture. We help you identify and eliminate common logical biases and rushing."
          />
        </div>
      </section>

      {/* Footer / CTA Bottom */}
      <section className="relative z-10 py-64 px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h2 className="text-5xl md:text-8xl font-black tracking-tight text-gradient italic">READY TO EVOLVE?</h2>
          <div className="flex justify-center">
            <Link href="/analyze">
              <button className="px-20 py-8 border-2 border-white/20 rounded-full font-black text-3xl hover:bg-white hover:text-black hover:border-white transition-all duration-500 group">
                <span className="flex items-center space-x-4">
                  <span>ENTER ANALYZER</span>
                  <Zap size={32} className="group-hover:fill-current" />
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

function FeatureCard({ index, icon, title, desc }: { index: number, icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 glass hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] translate-x-16 -translate-y-16 group-hover:bg-primary/20 transition-colors"></div>
      
      <div className="mb-10 w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-xl">
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-white/40 leading-relaxed font-light text-lg">{desc}</p>
      
      <div className="mt-8 flex items-center space-x-2 text-xs font-bold tracking-widest uppercase text-white/20 group-hover:text-white/60 transition-colors">
        <span>Learn Phase 0{index}</span>
        <div className="w-8 h-[1px] bg-current"></div>
      </div>
    </motion.div>
  );
}
