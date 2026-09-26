"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, CreditCard, Globe, Zap, Users, ShieldAlert } from "lucide-react";
import { useCouncilStore } from "@/lib/store";

const EXAMPLES = [
  {
    icon: <CreditCard className="w-4 h-4 text-violet-600" />,
    label: "Freemium vs Paid Trial",
    prompt: "Should we transition our SaaS from a freemium model to a 14-day free trial with mandatory credit card upfront?",
  },
  {
    icon: <Globe className="w-4 h-4 text-emerald-600" />,
    label: "Global Expansion",
    prompt: "Should we expand our sales and support operations into Southeast Asia and Europe simultaneously this quarter?",
  },
  {
    icon: <Users className="w-4 h-4 text-sky-600" />,
    label: "Hiring vs Freeze",
    prompt: "Should we execute a 15% headcount reduction to extend runway to 24 months or maintain current hiring pace?",
  },
  {
    icon: <Zap className="w-4 h-4 text-amber-600" />,
    label: "Pivot to AI Agents",
    prompt: "Should we pause core product feature development for 2 quarters to rebuild our platform around autonomous AI agents?",
  },
  {
    icon: <TrendingUp className="w-4 h-4 text-rose-600" />,
    label: "Pricing Overhaul",
    prompt: "Should we increase enterprise license prices by 35% while bundling 24/7 dedicated support and custom SLAs?",
  },
  {
    icon: <ShieldAlert className="w-4 h-4 text-indigo-600" />,
    label: "Build vs Buy LLM",
    prompt: "Should we fine-tune our own proprietary open-source LLM models or rely on commercial frontier APIs like Gemini 1.5?",
  },
];

export const ExampleChips: React.FC = () => {
  const router = useRouter();
  const { setDecision, startDebate } = useCouncilStore();

  const handleSelect = (prompt: string) => {
    setDecision(prompt);
    startDebate();
    router.push("/council");
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-violet-500" /> Or pick a boardroom dilemma to test:
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {EXAMPLES.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(item.prompt)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 hover:border-violet-300 hover:bg-white text-slate-700 text-xs md:text-sm font-medium shadow-sm transition-all"
          >
            {item.icon}
            <span>{item.label}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
};
