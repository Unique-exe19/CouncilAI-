"use client";

import React from "react";
import { motion } from "framer-motion";
import { AGENTS } from "@/lib/agents";
import { GlassCard } from "../glass/GlassCard";
import { AgentAvatar } from "../glass/AgentAvatar";

export const AgentShowcase: React.FC = () => {
  const agentList = [AGENTS.CEO, AGENTS.CFO, AGENTS.CTO, AGENTS.CMO];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Meet the Executive Council
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-base">
          Four specialized AI agents bring distinct perspectives, metrics, and pushbacks to every debate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentList.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <GlassCard hover className="h-full flex flex-col justify-between p-6">
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <AgentAvatar agentId={agent.id} size="lg" />
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${agent.color.badge}`}>
                    {agent.role}
                  </span>
                </div>

                {/* Name & Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-0.5">{agent.name}</h3>
                <p className="text-xs text-slate-500 font-medium mb-3">{agent.title}</p>

                {/* Personality */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{agent.personality}</p>
              </div>

              {/* Priorities list */}
              <div className="border-t border-slate-200/60 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Key Priorities
                </span>
                <ul className="space-y-1.5">
                  {agent.priorities.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${agent.color.ring}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
