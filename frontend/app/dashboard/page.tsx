'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';
import { 
  History, TrendingUp, AlertTriangle, CheckCircle2, 
  Calendar, ArrowUpRight, Search, Filter, Activity, Cpu, Layers
} from 'lucide-react';
import axios from 'axios';

const trendData = [
  { name: 'MON', val: 4, alt: 2 },
  { name: 'TUE', val: 7, alt: 4 },
  { name: 'WED', val: 5, alt: 3 },
  { name: 'THU', val: 9, alt: 6 },
  { name: 'FRI', val: 3, alt: 2 },
  { name: 'SAT', val: 6, alt: 5 },
  { name: 'SUN', val: 4, alt: 3 },
];

const categoryData = [
  { name: 'LOGIC', value: 45, color: '#8b5cf6' },
  { name: 'CONCEPT', value: 30, color: '#0ea5e9' },
  { name: 'THINKING', value: 25, color: '#22c55e' },
];

export default function Dashboard() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:8000/history');
        setHistory(res.data);
      } catch (err) {
        setHistory([
          { _id: '1', type: 'code', analysis: { mistake_type: 'Logic Divergence' }, timestamp: '2024-03-20T10:00:00Z' },
          { _id: '2', type: 'text', analysis: { mistake_type: 'Conceptual Void' }, timestamp: '2024-03-19T15:30:00Z' },
          { _id: '3', type: 'mcq', analysis: { mistake_type: 'Heuristic Bias' }, timestamp: '2024-03-18T09:15:00Z' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Command Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center space-x-2 text-accent mb-2">
              <Activity size={16} />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">Cognitive Telemetry</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">COMMAND CENTER</h1>
          </div>
          
          <div className="flex items-center space-x-4">
             <div className="hidden md:block text-right pr-6 border-r border-white/5">
                <p className="text-white/20 text-[10px] font-mono tracking-widest uppercase">UPTIME: 142H</p>
                <p className="text-white/10 text-[8px] font-mono mt-1 uppercase tracking-widest">ENCRYPTION: ACTIVE</p>
             </div>
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="SEARCH ARCHIVE..." 
                  className="pl-12 pr-6 py-3 bg-white/[0.03] border border-white/10 glass rounded-2xl focus:outline-none focus:border-accent/40 transition-all text-[10px] font-bold tracking-widest w-64"
                />
             </div>
          </div>
        </header>

        {/* High-Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <StatModule title="TOTAL SCANS" value="142" sub="+12.4% vs L/M" icon={<Layers className="text-primary" />} />
          <StatModule title="LOGIC INDEX" value="84.2" sub="Optimal Level" icon={<Cpu className="text-accent" />} />
          <StatModule title="CONCEPT VOIDS" value="03" sub="-2 Resolved" icon={<AlertTriangle className="text-yellow-500" />} />
          <StatModule title="SYNC RATE" value="98%" sub="Core Connected" icon={<CheckCircle2 className="text-green-500" />} />
        </div>

        {/* Data Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Trends Area Chart (8 cols) */}
          <motion.div 
            className="lg:col-span-8 p-10 rounded-[40px] glass relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/40">Cognitive Evolution</h3>
                <p className="text-[10px] font-bold text-accent mt-1">7-DAY SCAN FREQUENCY</p>
              </div>
              <div className="flex space-x-2">
                 <div className="w-2 h-2 bg-primary rounded-full"></div>
                 <div className="w-2 h-2 bg-accent/20 rounded-full"></div>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff10" 
                    fontSize={10} 
                    fontWeight="900"
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#ffffff10" 
                    fontSize={10} 
                    fontWeight="900"
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '12px' }}
                    labelStyle={{ color: '#ffffff40', fontSize: '10px', fontWeight: '900', marginBottom: '4px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="val" 
                    stroke="#8b5cf6" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorVal)" 
                    animationDuration={2000}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="alt" 
                    stroke="#ffffff10" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Distribution Pod (4 cols) */}
          <motion.div 
            className="lg:col-span-4 p-10 rounded-[40px] glass relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/40 mb-12">Anomaly Distribution</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category"
                    stroke="#ffffff20" 
                    fontSize={10} 
                    fontWeight="900"
                    tickLine={false} 
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip 
                    cursor={{ fill: '#ffffff03' }}
                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                  />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
               {categoryData.map(c => (
                 <div key={c.name} className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-white/20 tracking-widest">{c.name}</span>
                    <span className="text-xs font-mono font-black">{c.value}%</span>
                 </div>
               ))}
            </div>
          </motion.div>

        </div>

        {/* History Archive Pod */}
        <motion.div 
          className="p-12 rounded-[50px] glass relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/40">Neural History Archive</h3>
            <button className="text-[10px] font-black tracking-[0.2em] text-accent hover:text-white transition-colors flex items-center space-x-2">
              <span>EXPAND LOGS</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item, i) => (
              <div 
                key={item._id} 
                className="group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    item.type === 'code' ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(139,92,246,0.1)]' : 
                    item.type === 'text' ? 'bg-accent/10 text-accent shadow-[0_0_20px_rgba(14,165,233,0.1)]' : 'bg-green-500/10 text-green-500'
                  }`}>
                    <Calendar size={20} />
                  </div>
                  <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest">{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                
                <h4 className="text-lg font-black tracking-tight mb-2 group-hover:text-accent transition-colors">{item.analysis?.mistake_type || 'CORE SCAN'}</h4>
                <div className="flex items-center space-x-2">
                   <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-white/5 text-white/40 tracking-[0.2em] uppercase">{item.type}</span>
                   <div className="w-1 h-1 bg-white/10 rounded-full"></div>
                   <span className="text-[8px] font-black text-white/20 tracking-[0.2em] uppercase">SYNCED</span>
                </div>

                <div className="absolute -bottom-4 -right-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                   <Layers size={100} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function StatModule({ title, value, sub, icon }: { title: string, value: string, sub: string, icon: React.ReactNode }) {
  return (
    <div className="p-8 rounded-[35px] glass group hover:border-white/20 transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
          {icon}
        </div>
        <div className="h-1 w-8 bg-white/5 rounded-full overflow-hidden">
           <div className="h-full w-2/3 bg-accent animate-pulse"></div>
        </div>
      </div>
      <h3 className="text-4xl font-black tracking-tighter mb-1">{value}</h3>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase">{title}</span>
        <span className={`text-[8px] font-bold mt-1 tracking-widest ${
          sub.includes('+') || sub.includes('Optimal') ? 'text-green-500/60' : 'text-white/20'
        }`}>
          {sub}
        </span>
      </div>
    </div>
  );
}
