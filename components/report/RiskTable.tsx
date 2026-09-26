"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";
import { RiskItem } from "@/lib/schema";
import { GlassCard } from "../glass/GlassCard";

interface RiskTableProps {
  risks: RiskItem[];
}

export const RiskTable: React.FC<RiskTableProps> = ({ risks }) => {
  const severityBadge = (severity: "Low" | "Medium" | "High") => {
    switch (severity) {
      case "High":
        return "bg-rose-100 text-rose-800 border-rose-300";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Low":
        return "bg-sky-100 text-sky-800 border-sky-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  return (
    <GlassCard className="p-6 my-6">
      <div className="flex items-center gap-2 mb-4 text-slate-900 font-extrabold text-sm uppercase tracking-wider">
        <ShieldAlert className="w-5 h-5 text-rose-600" />
        <span>Risk Assessment Matrix</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs md:text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3">Identified Risk</th>
              <th className="py-3 px-3">Severity</th>
              <th className="py-3 px-3">Mitigation Strategy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60">
            {risks.map((r, i) => (
              <tr key={i} className="hover:bg-white/50 transition-colors">
                <td className="py-3.5 px-3 font-semibold text-slate-800 max-w-xs">{r.risk}</td>
                <td className="py-3.5 px-3">
                  <span className={`px-2.5 py-1 rounded-full border text-[11px] font-extrabold ${severityBadge(r.severity)}`}>
                    {r.severity}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-slate-600 leading-relaxed">{r.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
