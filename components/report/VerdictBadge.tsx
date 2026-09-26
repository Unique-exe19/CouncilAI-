"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface VerdictBadgeProps {
  verdict: "Go" | "No-Go" | "Conditional Go";
}

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({ verdict }) => {
  const styles = {
    Go: {
      bg: "bg-emerald-500/10 text-emerald-700 border-emerald-300",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      label: "VERDICT: GO",
    },
    "No-Go": {
      bg: "bg-rose-500/10 text-rose-700 border-rose-300",
      icon: <XCircle className="w-5 h-5 text-rose-600" />,
      label: "VERDICT: NO-GO",
    },
    "Conditional Go": {
      bg: "bg-amber-500/10 text-amber-800 border-amber-300",
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      label: "VERDICT: CONDITIONAL GO",
    },
  };

  const current = styles[verdict] || styles["Conditional Go"];

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-sm md:text-base font-extrabold shadow-sm ${current.bg}`}
    >
      {current.icon}
      <span>{current.label}</span>
    </div>
  );
};
