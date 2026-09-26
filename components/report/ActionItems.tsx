"use client";

import React from "react";
import { CheckSquare, Calendar, Flag } from "lucide-react";
import { ActionItem } from "@/lib/schema";
import { AGENTS } from "@/lib/agents";
import { GlassCard } from "../glass/GlassCard";
import { AgentAvatar } from "../glass/AgentAvatar";

interface ActionItemsProps {
  items: ActionItem[];
}

export const ActionItems: React.FC<ActionItemsProps> = ({ items }) => {
  const priorityStyle = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return "text-rose-600 bg-rose-50 border-rose-200";
      case "Medium":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "Low":
        return "text-sky-600 bg-sky-50 border-sky-200";
    }
  };

  return (
    <GlassCard className="p-6 my-6">
      <div className="flex items-center gap-2 mb-4 text-slate-900 font-extrabold text-sm uppercase tracking-wider">
        <CheckSquare className="w-5 h-5 text-violet-600" />
        <span>Executive Action Items & Implementation Plan</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => {
          const ownerAgent = AGENTS[item.owner] || AGENTS.CEO;

          return (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs flex flex-col justify-between gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AgentAvatar agentId={item.owner} size="sm" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{ownerAgent.name}</span>
                    <span className="text-[10px] text-slate-500">{ownerAgent.title}</span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full border text-[10px] font-bold flex items-center gap-1 ${priorityStyle(
                    item.priority
                  )}`}
                >
                  <Flag className="w-3 h-3" />
                  {item.priority}
                </span>
              </div>

              <p className="text-xs md:text-sm font-semibold text-slate-800 leading-snug">{item.task}</p>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Timeline: {item.timeline}</span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
