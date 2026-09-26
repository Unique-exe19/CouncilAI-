"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface RoundStepperProps {
  currentRound: 1 | 2 | 3 | 4;
}

const ROUNDS = [
  { round: 1, label: "Round 1", sub: "Opening Pitch" },
  { round: 2, label: "Round 2", sub: "Rebuttals" },
  { round: 3, label: "Round 3", sub: "Final Positions" },
  { round: 4, label: "Report", sub: "Consensus Synthesis" },
];

export const RoundStepper: React.FC<RoundStepperProps> = ({ currentRound }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-3 mb-6 sticky top-[68px] z-20 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
      {ROUNDS.map((r, idx) => {
        const isComplete = currentRound > r.round;
        const isCurrent = currentRound === r.round;

        return (
          <React.Fragment key={r.round}>
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isComplete
                    ? "bg-emerald-500 text-white shadow-emerald-500/20"
                    : isCurrent
                    ? "bg-violet-600 text-white ring-4 ring-violet-100 shadow-violet-500/20"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {isComplete ? <CheckCircle2 className="w-4 h-4" /> : r.round}
              </div>
              <div className="hidden sm:flex flex-col">
                <span
                  className={`text-xs font-bold leading-none ${
                    isCurrent ? "text-violet-700" : isComplete ? "text-slate-800" : "text-slate-400"
                  }`}
                >
                  {r.label}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">{r.sub}</span>
              </div>
            </div>

            {idx < ROUNDS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${
                  currentRound > r.round ? "bg-emerald-400" : "bg-slate-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
