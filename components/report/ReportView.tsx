"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Copy, Printer, PlusCircle, Check } from "lucide-react";
import { ExecutiveReport } from "@/lib/schema";
import { generateMarkdownReport, exportToPrintableHTML } from "@/lib/pdf";
import { VerdictBadge } from "./VerdictBadge";
import { ConfidenceMeter } from "./ConfidenceMeter";
import { ProsCons } from "./ProsCons";
import { RiskTable } from "./RiskTable";
import { ActionItems } from "./ActionItems";
import { GlassCard } from "../glass/GlassCard";
import { GlassButton } from "../glass/GlassButton";
import { AgentAvatar } from "../glass/AgentAvatar";
import { AGENTS } from "@/lib/agents";

interface ReportViewProps {
  report: ExecutiveReport;
  decision: string;
  onNewDecision: () => void;
}

const DEFAULT_DECISION = "Should we transition our B2B SaaS from a freemium model to a 14-day free trial with mandatory credit card upfront?";

export const ReportView: React.FC<ReportViewProps> = ({ report, decision, onNewDecision }) => {
  const [copied, setCopied] = useState(false);

  const displayDecision = decision && decision.trim().length > 5 ? decision : DEFAULT_DECISION;

  const handleCopyMarkdown = () => {
    const md = generateMarkdownReport(report, displayDecision);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    exportToPrintableHTML(report, displayDecision);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto my-8"
    >
      {/* Main Glass Report Container */}
      <GlassCard className="p-6 md:p-10 shadow-2xl border-amber-200/60 relative overflow-hidden">
        {/* Subtle glowing ambient header banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-violet-500 to-emerald-400" />

        {/* Report Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3 border border-amber-200">
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              <span>OFFICIAL EXECUTIVE CONSENSUS REPORT</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Executive Consensus Report
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">
              Synthesized by Boardroom Moderator &bull; {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <ConfidenceMeter score={report.confidenceScore} />
            <VerdictBadge verdict={report.verdict} />
          </div>
        </div>

        {/* Decision & Consensus Summary */}
        <div className="my-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Decision Under Review
          </h3>
          <p className="text-base md:text-lg font-bold text-slate-900 mb-6 leading-snug">
            &ldquo;{displayDecision}&rdquo;
          </p>

          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
              Executive Consensus Summary
            </h4>
            <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-medium">
              {report.consensusSummary}
            </p>
          </div>
        </div>

        {/* Pros and Cons */}
        <ProsCons pros={report.pros} cons={report.cons} />

        {/* Risk Table */}
        <RiskTable risks={report.risks} />

        {/* Agent Stances Summary */}
        <GlassCard className="p-6 my-6 bg-slate-50/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Executive Stances & Key Points
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.agentStances.map((s, idx) => {
              const agent = AGENTS[s.agent] || AGENTS.CEO;
              return (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-2xs">
                  <AgentAvatar agentId={s.agent} size="sm" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{agent.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${
                          s.stance === "Support"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : s.stance === "Oppose"
                            ? "bg-rose-100 text-rose-800 border-rose-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }`}
                      >
                        {s.stance}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.keyPoint}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Action Items */}
        <ActionItems items={report.actionItems} />

        {/* Next Immediate Step Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white my-6 shadow-lg shadow-violet-500/20">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-200 block mb-1">
            Immediate Recommended Next Step
          </span>
          <p className="text-sm md:text-base font-bold">{report.nextStep}</p>
        </div>

        {/* Report Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-200/80">
          <GlassButton
            variant="secondary"
            size="md"
            onClick={onNewDecision}
            icon={<PlusCircle className="w-4 h-4" />}
          >
            New Decision
          </GlassButton>

          <div className="flex items-center gap-2">
            <GlassButton
              variant="outline"
              size="md"
              onClick={handleCopyMarkdown}
              icon={copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            >
              {copied ? "Copied Markdown!" : "Copy Markdown"}
            </GlassButton>

            <GlassButton
              variant="amber"
              size="md"
              onClick={handlePrint}
              icon={<Printer className="w-4 h-4" />}
            >
              Export PDF / Print
            </GlassButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
