'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CircularProgress from '../components/CircularProgress';
import Typewriter from '../components/Typewriter';
import { ChevronLeft, Brain, Target, Lightbulb, TrendingUp } from 'lucide-react';

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
      // Mock data for testing if no real result exists
      setResult({
        mistake_type: "Logic/Sequence Error",
        concept_gap: "Asynchronous Execution Flow",
        thinking_error: "Over-reliance on Synchronous Intuition",
        detailed_analysis: "The user implemented the loop assuming the data would be available immediately within the next iteration. However, the API call is non-blocking, leading to a race condition where the process continues before the data is ready.",
        improvement_plan: [
          "Master the Event Loop concept in Node.js",
          "Practice converting callbacks to Promises",
          "Implement 'await' inside iterative structures using Promise.all"
        ],
        difficulty_level: "Intermediate",
        confidence_score: "0.92"
      });
    }
  }, []);

  if (!result) return null;

  return (
    <div className="min-h-screen bg-background pt-24 px-6 pb-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <button 
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-white/40 hover:text-white transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Analysis</span>
        </button>

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              Cognitive Scan Report
            </h1>
            <p className="text-white/40 font-mono text-sm mt-2">ID: #AI-{Math.floor(Math.random()*10000)} • CONFIDENCE: {result.confidence_score}</p>
          </div>
          <div className="flex space-x-8 px-6 py-4 rounded-2xl glass neon-border">
            <CircularProgress score={85} label="Logic" color="#8b5cf6" />
            <CircularProgress score={62} label="Concept" color="#0ea5e9" />
            <CircularProgress score={74} label="Accuracy" color="#22c55e" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResultCard 
            title="Mistake Type" 
            content={result.mistake_type} 
            icon={<Brain className="text-primary" />} 
            delay={0.1}
          />
          <ResultCard 
            title="Concept Gap" 
            content={result.concept_gap} 
            icon={<Target className="text-accent" />} 
            delay={0.2}
          />
          <ResultCard 
            title="Thinking Error" 
            content={result.thinking_error} 
            icon={<Lightbulb className="text-yellow-400" />} 
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2 p-8 rounded-2xl glass neon-border relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-bold uppercase tracking-widest text-white/60 mb-6 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span>AI Deep Insight</span>
            </h3>
            <Typewriter text={result.detailed_analysis} />
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Zap size={120} />
            </div>
          </motion.div>

          <motion.div 
            className="p-8 rounded-2xl glass neon-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-bold uppercase tracking-widest text-white/60 mb-6 flex items-center space-x-2">
              <TrendingUp className="text-accent" size={20} />
              <span>Improvement Plan</span>
            </h3>
            <ul className="space-y-4">
              {result.improvement_plan.map((step, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="flex items-start space-x-3 text-sm text-white/70"
                >
                  <div className="mt-1 w-4 h-4 rounded border border-accent/40 flex-shrink-0 flex items-center justify-center text-[10px] text-accent">
                    {i + 1}
                  </div>
                  <span>{step}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

function ResultCard({ title, content, icon, delay }: { title: string, content: string, icon: React.ReactNode, delay: number }) {
  return (
    <motion.div 
      className="p-6 rounded-2xl glass neon-border flex flex-col space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-tighter text-white/30">{title}</span>
        {icon}
      </div>
      <p className="text-xl font-bold text-white/90 leading-tight">{content}</p>
    </motion.div>
  );
}

function Zap({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}
