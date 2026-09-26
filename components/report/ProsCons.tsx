"use client";

import React from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { GlassCard } from "../glass/GlassCard";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export const ProsCons: React.FC<ProsConsProps> = ({ pros, cons }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {/* Pros Card */}
      <GlassCard className="p-6 border-emerald-200/80 bg-emerald-50/20">
        <div className="flex items-center gap-2 mb-4 text-emerald-700 font-extrabold text-sm uppercase tracking-wider">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Strategic Benefits & Pros</span>
        </div>
        <ul className="space-y-3">
          {pros.map((p, i) => (
            <li key={i} className="text-xs md:text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </GlassCard>

      {/* Cons Card */}
      <GlassCard className="p-6 border-rose-200/80 bg-rose-50/20">
        <div className="flex items-center gap-2 mb-4 text-rose-700 font-extrabold text-sm uppercase tracking-wider">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <span>Downside Trade-offs & Cons</span>
        </div>
        <ul className="space-y-3">
          {cons.map((c, i) => (
            <li key={i} className="text-xs md:text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
};
