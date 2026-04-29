'use client';

import { motion } from 'framer-motion';

interface CircularProgressProps {
  score: number;
  label: string;
  color?: string;
}

export default function CircularProgress({ score, label, color = "#8b5cf6" }: CircularProgressProps) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-xl font-bold font-mono">
          {score}%
        </span>
      </div>
      <span className="text-xs uppercase tracking-widest text-white/40 font-medium">{label}</span>
    </div>
  );
}
