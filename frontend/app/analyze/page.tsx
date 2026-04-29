'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeEditor from '../components/CodeEditor';
import Scanner from '../components/Scanner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Code, FileText, CheckSquare, Zap, Target, ArrowRight, Sparkles } from 'lucide-react';

type InputType = 'code' | 'text' | 'mcq';

export default function AnalyzePage() {
  const [inputType, setInputType] = useState<InputType>('code');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setIsAnalyzing(true);
    
    try {
      const response = await axios.post('http://localhost:8000/analyze', {
        type: inputType,
        content: content
      });
      
      localStorage.setItem('analysis_result', JSON.stringify(response.data));
      router.push('/result');
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Neural sync failed. Ensure core engine is running.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 px-6 pb-20 selection:bg-accent/30">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Info */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center space-x-2 text-accent mb-2">
              <Sparkles size={16} />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">Cognitive Phase 01</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">DATA INGESTION</h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-white/20 text-xs font-mono tracking-widest uppercase">System status: <span className="text-green-500">OPTIMAL</span></p>
            <p className="text-white/10 text-[10px] font-mono mt-1">LATENCY: 24MS • SYNC: TRUE</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[600px]">
          
          {/* Left Panel: Input Pod (7 cols) */}
          <motion.div 
            className="lg:col-span-7 flex flex-col space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Type Selector */}
            <div className="flex items-center p-1.5 bg-white/[0.03] border border-white/5 rounded-2xl w-fit glass">
              <TabButton 
                active={inputType === 'code'} 
                onClick={() => setInputType('code')}
                icon={<Code size={14} />}
                label="CODE"
              />
              <TabButton 
                active={inputType === 'text'} 
                onClick={() => setInputType('text')}
                icon={<FileText size={14} />}
                label="ANSWER"
              />
              <TabButton 
                active={inputType === 'mcq'} 
                onClick={() => setInputType('mcq')}
                icon={<CheckSquare size={14} />}
                label="MCQ"
              />
            </div>

            {/* Input Pod */}
            <div className="flex-1 relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-3xl blur-sm opacity-50 group-focus-within:opacity-100 transition duration-1000"></div>
              <div className="relative h-full w-full bg-black/40 rounded-3xl border border-white/10 glass overflow-hidden">
                {inputType === 'code' ? (
                  <CodeEditor code={content} onChange={(v) => setContent(v || '')} />
                ) : (
                  <textarea
                    className="w-full h-full bg-transparent text-white p-10 rounded-3xl focus:outline-none transition-all resize-none font-sans text-lg placeholder:text-white/10 leading-relaxed"
                    placeholder={inputType === 'text' ? "Deploy your written reasoning here..." : "Input MCQ question and your thought process..."}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                )}
                
                {/* Visual accents */}
                <div className="absolute top-4 right-4 flex space-x-1">
                  <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                  <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                  <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Action Pod */}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !content.trim()}
              className="group relative w-full h-20 rounded-3xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <div className="absolute inset-0 bg-white group-hover:bg-accent transition-colors duration-500"></div>
              <div className="relative flex items-center justify-center space-x-3 text-black group-hover:text-white transition-colors duration-500">
                <span className="text-xl font-black tracking-[0.2em]">INITIATE ANALYSIS</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          </motion.div>

          {/* Right Panel: Processing Pod (5 cols) */}
          <motion.div 
            className="lg:col-span-5 relative flex items-center justify-center rounded-[40px] border border-white/5 glass-dark overflow-hidden group min-h-[400px]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Activity size={200} className="text-accent" />
            </div>
            
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="flex flex-col items-center"
                >
                  <Scanner />
                  <div className="mt-8 space-y-2 text-center">
                    <p className="text-accent font-black tracking-[0.3em] text-[10px] animate-pulse">DECODING NEURAL PATHS</p>
                    <p className="text-white/20 text-[10px] font-mono">EST. REMAINING: 1.4S</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-6 px-16 relative z-10"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-[30px] flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <Target size={32} className="text-white/20 group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-white/80">READY FOR SCAN</h3>
                    <p className="text-white/30 text-sm font-light mt-2 leading-relaxed">
                      Deploy your work to the ingestion port and click initiate to perform a deep cognitive reasoning scan.
                    </p>
                  </div>
                  
                  {/* Status Bar */}
                  <div className="pt-6 border-t border-white/5 flex items-center justify-center space-x-6">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Logic</span>
                      <span className="text-xs font-mono text-white/40">OFFLINE</span>
                    </div>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Gaps</span>
                      <span className="text-xs font-mono text-white/40">OFFLINE</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Decorative Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all duration-300 ${
        active 
          ? 'bg-white text-black shadow-xl scale-105' 
          : 'text-white/30 hover:text-white/60 hover:bg-white/5'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
