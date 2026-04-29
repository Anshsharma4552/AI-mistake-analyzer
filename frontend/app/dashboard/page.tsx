'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  History, TrendingUp, AlertTriangle, CheckCircle2, 
  Calendar, ArrowUpRight, Search, Filter
} from 'lucide-react';
import axios from 'axios';

const trendData = [
  { name: 'Mon', mistakes: 4 },
  { name: 'Tue', mistakes: 7 },
  { name: 'Wed', mistakes: 5 },
  { name: 'Thu', mistakes: 8 },
  { name: 'Fri', mistakes: 3 },
  { name: 'Sat', mistakes: 6 },
  { name: 'Sun', mistakes: 4 },
];

const categoryData = [
  { name: 'Logic', value: 45, color: '#8b5cf6' },
  { name: 'Concept', value: 30, color: '#0ea5e9' },
  { name: 'Thinking', value: 25, color: '#22c55e' },
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
        console.error('Failed to fetch history:', err);
        // Using mock history if server fails
        setHistory([
          { _id: '1', type: 'code', analysis: { mistake_type: 'Logic Error' }, timestamp: '2024-03-20T10:00:00Z' },
          { _id: '2', type: 'text', analysis: { mistake_type: 'Concept Gap' }, timestamp: '2024-03-19T15:30:00Z' },
          { _id: '3', type: 'mcq', analysis: { mistake_type: 'Thinking Bias' }, timestamp: '2024-03-18T09:15:00Z' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cognitive Dashboard</h1>
            <p className="text-white/40 text-sm mt-1">Tracking your thinking evolution over time.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Search history..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 glass rounded-lg focus:outline-none focus:border-accent/50 transition-colors text-sm"
              />
            </div>
            <button className="p-2 bg-white/5 border border-white/10 glass rounded-lg hover:bg-white/10 transition-colors">
              <Filter size={18} className="text-white/60" />
            </button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Scans" value="42" change="+12%" icon={<History className="text-primary" />} />
          <StatCard title="Avg logic" value="78%" change="+5%" icon={<TrendingUp className="text-accent" />} />
          <StatCard title="Top Mistake" value="Logic" change="Steady" icon={<AlertTriangle className="text-yellow-500" />} />
          <StatCard title="Goals Met" value="8/10" change="+2" icon={<CheckCircle2 className="text-green-500" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Trends Graph */}
          <motion.div 
            className="lg:col-span-2 p-8 rounded-3xl glass border border-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold uppercase tracking-widest text-white/40 text-xs">Thinking Trends</h3>
              <select className="bg-transparent text-xs text-white/60 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff20" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#ffffff20" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#8b5cf6' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mistakes" 
                    stroke="#8b5cf6" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div 
            className="p-8 rounded-3xl glass border border-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-bold uppercase tracking-widest text-white/40 text-xs mb-8">Mistake Distribution</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff20" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>

        {/* History Table */}
        <motion.div 
          className="p-8 rounded-3xl glass border border-white/5 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold uppercase tracking-widest text-white/40 text-xs">Recent Analysis History</h3>
            <button className="text-xs text-accent hover:underline flex items-center space-x-1">
              <span>View All</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {history.map((item, i) => (
              <div key={item._id} className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.type === 'code' ? 'bg-primary/10 text-primary' : 
                    item.type === 'text' ? 'bg-accent/10 text-accent' : 'bg-green-500/10 text-green-500'
                  }`}>
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{item.analysis?.mistake_type || 'General Analysis'}</h4>
                    <p className="text-xs text-white/30 uppercase tracking-tighter">{item.type} • {new Date(item.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-white/20">#{item._id.slice(-6)}</div>
                  <ArrowUpRight size={16} className="text-white/10 group-hover:text-accent transition-colors ml-auto mt-1" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl glass border border-white/5 group hover:border-white/10 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-white/10 text-white/40'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-white/30 text-xs uppercase tracking-widest mt-1 font-medium">{title}</p>
    </div>
  );
}
