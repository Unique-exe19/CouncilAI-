"use client";

import React from "react";
import { AGENTS } from "@/lib/agents";
import { useCouncilStore } from "@/lib/store";
import { GlassCard } from "../glass/GlassCard";
import { Sparkles, StopCircle, RefreshCw, CheckCircle } from "lucide-react";
import { GlassButton } from "../glass/GlassButton";
import { AgentAvatar } from "../glass/AgentAvatar";

interface AgentSidebarProps {
  onRestart: () => void;
}

const DEFAULT_DECISION = "Should we transition our B2B SaaS from a freemium model to a 14-day free trial with mandatory credit card upfront?";

export const AgentSidebar: React.FC<AgentSidebarProps> = ({ onRestart }) => {
  const { decision, speakingAgent, currentRound, isDebating, isDemoMode, toggleDemoMode, stopDebate } =
    useCouncilStore();

  const activeDecision = decision && decision.trim().length > 5 ? decision : DEFAULT_DECISION;
  const agents = [AGENTS.CEO, AGENTS.CFO, AGENTS.CTO, AGENTS.CMO];

  return (
    <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
      {/* Decision Summary Card */}
      <GlassCard className="p-5">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-700 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Dilemma Under Debate
        </div>
        <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-4">
          &ldquo;{activeDecision}&rdquo;
        </p>
      </GlassCard>

      {/* Agents Live Status */}
      <GlassCard className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Boardroom Status</span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {currentRound === 4 ? "Finished" : isDebating ? `Round ${currentRound} of 3` : "Ready"}
            </span>
          </div>

          <div className="space-y-3">
            {agents.map((agent) => {
              const isSpeaking = speakingAgent === agent.id;
              const isFinished = currentRound === 4;

              return (
                <div
                  key={agent.id}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    isSpeaking
                      ? `${agent.color.lightBg} ${agent.color.border} shadow-sm ring-2 ${agent.color.ring}`
                      : "bg-white/50 border-slate-200/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <AgentAvatar
                      agentId={agent.id}
                      size="sm"
                      className={isSpeaking ? "ring-2 ring-violet-500 animate-pulse" : ""}
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-slate-900 truncate">{agent.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{agent.role}</div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="shrink-0">
                    {isSpeaking ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full animate-pulse">
                        Speaking...
                      </span>
                    ) : isFinished ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400">Idle</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="pt-4 mt-4 border-t border-slate-200/60 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span>Demo Mode:</span>
            <button
              onClick={toggleDemoMode}
              disabled={isDebating}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                isDemoMode ? "bg-violet-600 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              {isDemoMode ? "ON (Scripted)" : "OFF (Live API)"}
            </button>
          </div>

          <div className="flex gap-2">
            {isDebating ? (
              <GlassButton
                variant="danger"
                size="sm"
                className="w-full"
                onClick={stopDebate}
                icon={<StopCircle className="w-3.5 h-3.5" />}
              >
                Stop Debate
              </GlassButton>
            ) : (
              <GlassButton
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={onRestart}
                icon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Restart Debate
              </GlassButton>
            )}
          </div>
        </div>
      </GlassCard>
    </aside>
  );
};
