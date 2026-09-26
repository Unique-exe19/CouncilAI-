"use client";

import React from "react";
import { motion } from "framer-motion";

interface ConfidenceMeterProps {
  score: number; // 0 to 100
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ score }) => {
  const strokeDashoffset = 283 - (283 * score) / 100;

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="text-slate-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            className="text-violet-600"
            strokeWidth="8"
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-slate-900 leading-none">{score}%</span>
          <span className="text-[9px] uppercase font-bold text-slate-400">Confidence</span>
        </div>
      </div>
    </div>
  );
};
