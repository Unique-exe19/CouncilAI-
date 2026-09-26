"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquareText, ShieldCheck, FileCheck, ArrowRight } from "lucide-react";
import { GlassCard } from "../glass/GlassCard";

const STEPS = [
  {
    step: "01",
    icon: <MessageSquareText className="w-6 h-6 text-violet-600" />,
    title: "Propose Strategic Dilemma",
    desc: "Enter any high-stakes business proposal, pricing change, or engineering pivot.",
  },
  {
    step: "02",
    icon: <ShieldCheck className="w-6 h-6 text-sky-600" />,
    title: "Live Multi-Agent Debate",
    desc: "CEO, CFO, CTO, and CMO debate across 3 rounds — challenging assumptions and defending trade-offs.",
  },
  {
    step: "03",
    icon: <FileCheck className="w-6 h-6 text-amber-600" />,
    title: "Executive Consensus Report",
    desc: "Boardroom Moderator synthesizes final Verdict, Risk Matrix, and prioritized Action Items.",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          How CouncilAI Works
        </h2>
        <p className="text-slate-600 max-w-md mx-auto text-base">
          From complex dilemma to actionable executive consensus in under 60 seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {STEPS.map((s, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <GlassCard className="h-full p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/80 shadow-sm border border-slate-200/60 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-400 font-mono">STEP {s.step}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>

              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
