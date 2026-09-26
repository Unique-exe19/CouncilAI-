"use client";

import React, { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingDots } from "./TypingDots";
import { useCouncilStore } from "@/lib/store";
import { AGENTS } from "@/lib/agents";
import { GlassCard } from "../glass/GlassCard";
import { GlassButton } from "../glass/GlassButton";
import { Play } from "lucide-react";

interface ChatFeedProps {
  onStart?: () => void;
}

export const ChatFeed: React.FC<ChatFeedProps> = ({ onStart }) => {
  const { messages, speakingAgent, isDebating } = useCouncilStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message or streaming token
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, speakingAgent]);

  // Group messages by round dividers
  const renderMessagesWithDividers = () => {
    const elements: React.ReactNode[] = [];
    let lastRound = 0;

    messages.forEach((msg, idx) => {
      if (msg.round !== lastRound) {
        lastRound = msg.round;
        elements.push(
          <div key={`divider-${msg.round}`} className="flex items-center my-6">
            <div className="flex-1 h-px bg-slate-200/80" />
            <span className="px-4 py-1 rounded-full bg-white/80 border border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 shadow-2xs">
              Round {msg.round}: {msg.round === 1 ? "Opening Pitches" : msg.round === 2 ? "Rebuttals & Pushback" : "Final Stances"}
            </span>
            <div className="flex-1 h-px bg-slate-200/80" />
          </div>
        );
      }

      elements.push(<MessageBubble key={msg.id || idx} message={msg} />);
    });

    return elements;
  };

  return (
    <div className="flex-1 min-h-[450px] flex flex-col justify-between">
      <div className="space-y-4">
        {messages.length === 0 && isDebating && (
          <GlassCard className="p-8 text-center my-6 border-violet-200/60">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mx-auto mb-3 animate-pulse">
              <span className="font-bold text-lg">🏛️</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Convening Executive Boardroom</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Victoria Vance (CEO) is analyzing the dilemma and preparing the opening pitch...
            </p>
            <TypingDots />
          </GlassCard>
        )}

        {messages.length === 0 && !isDebating && (
          <GlassCard className="p-10 text-center my-6 border-slate-200/80">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/20">
              <Play className="w-6 h-6 ml-0.5" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">Ready to Convene the Boardroom</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              Click below to initiate the 3-round live debate between Victoria Vance (CEO), Arthur Sterling (CFO), Dr. Elena Rostova (CTO), and Marcus Thorne (CMO).
            </p>
            {onStart && (
              <GlassButton variant="primary" size="lg" onClick={onStart} icon={<Play className="w-4 h-4" />}>
                Start Boardroom Debate
              </GlassButton>
            )}
          </GlassCard>
        )}

        {renderMessagesWithDividers()}

        {/* Typing indicator */}
        {speakingAgent && isDebating && (
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pl-2 pt-2">
            <span>{AGENTS[speakingAgent]?.name} is speaking</span>
            <TypingDots />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};
