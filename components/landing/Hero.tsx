"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";
import { BoardroomPromptComposer } from "./BoardroomPromptComposer";

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-12 pb-16 md:pt-20 md:pb-24 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-semibold text-violet-700 mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-violet-600" />
        <span>Multi-Agent AI Executive Boardroom</span>
        <span className="bg-violet-100 text-violet-800 text-[10px] px-2 py-0.5 rounded-full font-bold">v2.5</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6"
      >
        Let your AI boardroom <br />
        <span className="text-gradient-purple">debate and decide.</span>
      </motion.h1>

      {/* Sub-text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed font-normal"
      >
        Spawns 4 specialized AI executives (CEO, CFO, CTO, CMO) to debate your business decisions live — then synthesizes an actionable Executive Consensus Report.
      </motion.p>

      {/* Custom Boardroom Prompt Composer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full flex justify-center"
      >
        <BoardroomPromptComposer />
      </motion.div>

      {/* Security notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 mt-6 text-xs text-slate-500 font-medium"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Server-side encryption & zero data retention. Your API keys stay private.</span>
      </motion.div>
    </div>
  );
};
