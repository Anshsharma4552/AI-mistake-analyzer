'use client';

import { motion } from 'framer-motion';

export default function Scanner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative w-48 h-48">
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 border-2 border-accent/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Rotating Segment */}
        <motion.div
          className="absolute inset-0 border-t-2 border-accent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulse Core */}
        <motion.div
          className="absolute inset-8 bg-accent/20 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Inner Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#0ea5e9]" />
        </div>
      </div>
      
      <motion.p
        className="text-accent font-mono text-sm uppercase tracking-widest"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Analyzing thinking patterns...
      </motion.p>
    </div>
  );
}
