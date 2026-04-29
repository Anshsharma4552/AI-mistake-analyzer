'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CircularProgress from '../components/CircularProgress';
import Typewriter from '../components/Typewriter';
import { ChevronLeft, Brain, Target, Lightbulb, TrendingUp, Download, Share2, Activity, Zap } from 'lucide-react';

interface AnalysisResult {
  mistake_type: string;
  concept_gap: string;
  thinking_error: string;
  detailed_analysis: string;
  improvement_plan: string[];
  difficulty_level: string;
  confidence_score: string;
}

export default function ResultPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedResult = localStorage.getItem('analysis_result');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      setResult({
        mistake_type: "Logic/Sequence Error",
        concept_gap: "Asynchronous Execution Flow",
        thinking_error: "Over-reliance on Synchronous Intuition",
        detailed_analysis: "The core engine detected a divergence between your intent and execution. You implemented a loop expecting immediate availability of data, failing to account for the non-blocking nature of the runtime. This results in a race condition where the subsequent operation is triggered before the prior dependency resolves.",
        improvement_plan: [
          "Master the Event Loop concept in Node.js",
          "Practice converting callbacks to Promises",
          "Implement 'await' inside iterative structures using Promise.all"
        ],
        difficulty_level: "Intermediate",
        confidence_score: "0.94"
      });
    }
  }, []);

  if (!result) return null;

  return (
    <div className="min-h-screen bg-background pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Controls */}
        <div className="flex items-center justify-between border-b border-white/5 pb-10">
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-3 text-white/30 hover:text-white transition-all group"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors">
              <ChevronLeft size={16} />
            </div>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Abort Report</span>
          </button>
          
          <div className="flex space-x-3">
            <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-[10px] font-bold tracking-widest flex items-center space-x-2">
              <Download size={14} />
              <span>EXPORT DATA</span>
            </button>
            <button className="px-5 py-2 bg-primary/20 border border-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-all text-[10px] font-bold tracking-widest flex items-center space-x-2">
              <Share2 size={14} />
              <span>SHARE SCAN</span>
            </button>
          </div>
        </div>

        {/* Main Header / KPI Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 rounded-[40px] glass relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-10"
        >
          <div className="relative z-10 space-y-4">
            <div className="flex items-center space-x-2 text-accent">
              <Activity size={16} />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">Cognitive Scan Successful</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              REASONING <br /> REPORT
            </h1>
            <p className="text-white/30 font-mono text-xs tracking-widest uppercase">ID: SC-{Math.floor(Math.random()*90000) + 10000} • CONFIDENCE: {result.confidence_score}</p>
          </div>
          
          <div className="relative z-10 flex flex-wrap gap-10 md:px-12 md:py-8 rounded-3xl glass-dark border-white/5">
            <CircularProgress score={88} label="Logic Flow" color="#8b5cf6" />
            <CircularProgress score={64} label="Concept Map" color="#0ea5e9" />
            <CircularProgress score={result.difficulty_level === 'Intermediate' ? 72 : 85} label="Efficiency" color="#22c55e" />
          </div>

          {/* Decorative SVG Graph in background */}
          <div className="absolute top-0 right-0 h-full w-1/2 opacity-[0.03] pointer-events-none">
             <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 80 Q 20 60, 40 70 T 80 40 T 100 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
             </svg>
          </div>
        </motion.div>

        {/* Breakdown Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ModuleCard 
            title="MISTAKE TYPE" 
            content={result.mistake_type} 
            icon={<Brain className="text-primary" />} 
            delay={0.1}
            sub="Structural Logic"
          />
          <ModuleCard 
            title="CONCEPT GAP" 
            content={result.concept_gap} 
            icon={<Target className="text-accent" />} 
            delay={0.2}
            sub="Fundamental Void"
          />
          <ModuleCard 
            title="THINKING ERROR" 
            content={result.thinking_error} 
            icon={<Lightbulb className="text-yellow-400" />} 
            delay={0.3}
            sub="Cognitive Bias"
          />
        </div>

        {/* Detailed Insights Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* AI Insights Pod */}
          <motion.div 
            className="lg:col-span-8 p-12 rounded-[40px] glass relative overflow-hidden min-h-[400px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/40">Neural Deep Insight</h3>
              <div className="flex space-x-1">
                 {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }}></div>)}
              </div>
            </div>
            <div className="max-w-2xl">
              <Typewriter text={result.detailed_analysis} speed={15} />
            </div>
            
            {/* Background Texture */}
            <div className="absolute -bottom-20 -right-20 p-10 opacity-[0.02]">
              <Zap size={300} />
            </div>
          </motion.div>

          {/* Improvement Plan Pod */}
          <motion.div 
            className="lg:col-span-4 p-12 rounded-[40px] glass border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/40 mb-10 flex items-center space-x-3">
              <TrendingUp className="text-accent" size={16} />
              <span>PROTOCOL UPGRADE</span>
            </h3>
            <div className="space-y-6">
              {result.improvement_plan.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/[0.03] transition-all cursor-default"
                >
                  <div className="mt-1 w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0 flex items-center justify-center text-[10px] font-black text-accent group-hover:bg-accent group-hover:text-white transition-all">
                    0{i + 1}
                  </div>
                  <p className="text-sm text-white/60 group-hover:text-white/90 transition-colors leading-relaxed">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

function ModuleCard({ title, content, icon, delay, sub }: { title: string, content: string, icon: React.ReactNode, delay: number, sub: string }) {
  return (
    <motion.div 
      className="p-10 rounded-[40px] glass flex flex-col space-y-6 group hover:border-white/20 transition-all duration-500"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-black tracking-[0.2em] text-white/20">{title}</span>
          <span className="text-[8px] font-bold text-accent/40 tracking-[0.3em] uppercase mt-0.5">{sub}</span>
        </div>
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-black text-white/90 leading-tight group-hover:text-white transition-colors">{content}</p>
    </motion.div>
  );
}
