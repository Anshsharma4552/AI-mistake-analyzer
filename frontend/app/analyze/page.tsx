'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeEditor from '../components/CodeEditor';
import Scanner from '../components/Scanner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Code, FileText, CheckSquare, Zap } from 'lucide-react';

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
      // For demo purposes, we'll wait 3 seconds to show the scanner
      // In production, this would be the actual API call
      const response = await axios.post('http://localhost:8000/analyze', {
        type: inputType,
        content: content
      });
      
      // Store result in local storage or state management to pass to results page
      localStorage.setItem('analysis_result', JSON.stringify(response.data));
      router.push('/result');
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze. Make sure backend is running.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-180px)]">
        
        {/* Left Panel: Input */}
        <motion.div 
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/10 glass">
            <div className="flex space-x-2">
              <TabButton 
                active={inputType === 'code'} 
                onClick={() => setInputType('code')}
                icon={<Code size={16} />}
                label="Code"
              />
              <TabButton 
                active={inputType === 'text'} 
                onClick={() => setInputType('text')}
                icon={<FileText size={16} />}
                label="Answer"
              />
              <TabButton 
                active={inputType === 'mcq'} 
                onClick={() => setInputType('mcq')}
                icon={<CheckSquare size={16} />}
                label="MCQ"
              />
            </div>
          </div>

          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            {inputType === 'code' ? (
              <CodeEditor code={content} onChange={(v) => setContent(v || '')} />
            ) : (
              <textarea
                className="w-full h-full bg-black/40 text-white p-6 rounded-xl border border-white/10 glass focus:outline-none focus:border-accent/50 transition-colors resize-none font-sans"
                placeholder={inputType === 'text' ? "Paste your written answer here..." : "Paste the MCQ question and your reasoning here..."}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !content.trim()}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold tracking-widest uppercase hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 neon-glow"
          >
            <Zap size={20} fill="currentColor" />
            <span>Analyze My Thinking</span>
          </button>
        </motion.div>

        {/* Right Panel: Placeholder or Result Preview */}
        <motion.div 
          className="relative flex items-center justify-center rounded-xl border border-white/5 glass bg-white/[0.02] overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Scanner />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-4 px-12"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap size={32} className="text-white/20" />
                </div>
                <h3 className="text-xl font-medium text-white/60">Ready for Analysis</h3>
                <p className="text-white/40 text-sm">
                  Provide your work on the left and click analyze to start the deep reasoning scan.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </motion.div>

      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
        active 
          ? 'bg-white/10 text-white' 
          : 'text-white/40 hover:text-white/60 hover:bg-white/5'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
