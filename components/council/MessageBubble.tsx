"use client";

import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { AGENTS } from "@/lib/agents";
import { ChatMessage } from "@/lib/store";
import { AgentAvatar } from "../glass/AgentAvatar";

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const agent = AGENTS[message.agentId] || AGENTS.CEO;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3 md:gap-4 p-4 md:p-5 rounded-3xl glass-panel relative group"
    >
      {/* Avatar Container */}
      <div className="shrink-0 relative">
        <AgentAvatar
          agentId={message.agentId}
          size="md"
          className={message.isStreaming ? `ring-2 ${agent.color.ring} ring-offset-2 animate-pulse` : ""}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm md:text-base text-slate-900">{agent.name}</span>
            <span className={`text-[10px] md:text-xs font-semibold px-2.5 py-0.5 rounded-full border ${agent.color.badge}`}>
              {agent.role}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">{message.timestamp}</span>
        </div>

        {/* Text Body */}
        <div className="text-slate-800 text-sm md:text-base leading-relaxed prose prose-slate max-w-none">
          <ReactMarkdown>{message.text}</ReactMarkdown>
          {message.isStreaming && (
            <span className="inline-block w-2 h-4 bg-violet-600 ml-1 animate-pulse rounded-sm align-middle" />
          )}
        </div>
      </div>
    </motion.div>
  );
};
