"use client";

import React from "react";
import { motion } from "framer-motion";

export const TypingDots: React.FC = () => {
  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-slate-100/80 rounded-2xl w-fit">
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
        className="w-1.5 h-1.5 bg-slate-500 rounded-full"
      />
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
        className="w-1.5 h-1.5 bg-slate-500 rounded-full"
      />
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
        className="w-1.5 h-1.5 bg-slate-500 rounded-full"
      />
    </div>
  );
};
