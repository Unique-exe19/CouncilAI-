"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, ArrowLeft, AlertCircle } from "lucide-react";
import { useCouncilStore } from "@/lib/store";
import { AgentSidebar } from "@/components/council/AgentSidebar";
import { RoundStepper } from "@/components/council/RoundStepper";
import { ChatFeed } from "@/components/council/ChatFeed";
import { ReportView } from "@/components/report/ReportView";
import { GlassButton } from "@/components/glass/GlassButton";

const DEFAULT_DECISION = "Should we transition our B2B SaaS from a freemium model to a 14-day free trial with mandatory credit card upfront?";

export default function CouncilPage() {
  const router = useRouter();
  const {
    decision,
    isDebating,
    isDemoMode,
    currentRound,
    messages,
    report,
    error,
    startDebate,
    stopDebate,
    addMessage,
    appendTokenToMessage,
    completeMessage,
    setSpeakingAgent,
    setRound,
    setReport,
    setError,
    reset,
  } = useCouncilStore();

  const currentMsgIdRef = useRef<string | null>(null);
  const isFetchingRef = useRef<boolean>(false);

  // Default fallback decision if none selected
  const activeDecision =
    decision && decision.trim().length > 5
      ? decision
      : DEFAULT_DECISION;

  // Handle SSE streaming setup
  const runDebateStream = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    startDebate();

    try {
      const response = await fetch("/api/council", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision: activeDecision, demoMode: isDemoMode }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body stream received.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const block of lines) {
          if (!block.trim()) continue;

          let eventName = "message";
          let dataStr = "";

          const blockLines = block.split("\n");
          for (const line of blockLines) {
            if (line.startsWith("event: ")) {
              eventName = line.replace("event: ", "").trim();
            } else if (line.startsWith("data: ")) {
              dataStr = line.replace("data: ", "").trim();
            }
          }

          if (!dataStr) continue;

          try {
            const data = JSON.parse(dataStr);

            switch (eventName) {
              case "round_change":
                setRound(data.round);
                break;

              case "agent_start":
                setSpeakingAgent(data.agentId);
                currentMsgIdRef.current = addMessage({
                  agentId: data.agentId,
                  round: data.round,
                  text: "",
                });
                break;

              case "token":
                if (currentMsgIdRef.current) {
                  appendTokenToMessage(currentMsgIdRef.current, data.token);
                }
                break;

              case "agent_end":
                if (currentMsgIdRef.current) {
                  completeMessage(currentMsgIdRef.current);
                  currentMsgIdRef.current = null;
                }
                break;

              case "report_start":
                setSpeakingAgent("MODERATOR");
                setRound(4);
                break;

              case "report_ready":
                setReport(data.report);
                break;

              case "error":
                setError(data.message);
                break;
            }
          } catch (e) {
            console.error("Error parsing SSE data line:", e);
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Stream error:", msg);
      setError(msg);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    // Initiate stream on initial load if not completed
    if (!report && messages.length === 0) {
      runDebateStream();
    }
    // eslint-disable-next-deps
  }, []);

  const handleRestart = () => {
    stopDebate();
    runDebateStream();
  };

  const handleNewDecision = () => {
    reset();
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#F7F8FC] relative overflow-x-hidden flex flex-col">
      {/* Animated Floating Gradient Ambient Blobs */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-200/40 via-purple-200/30 to-indigo-200/20 blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-sky-200/40 via-blue-200/30 to-emerald-200/20 blur-3xl animate-blob animation-delay-2000 pointer-events-none" />

      {/* Sticky Top Header Bar */}
      <header className="w-full sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base text-slate-900 leading-none">CouncilAI Boardroom</span>
                <span className="text-[10px] font-semibold text-violet-600 uppercase tracking-wider mt-0.5">
                  Multi-Agent Executive Simulator
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <GlassButton variant="outline" size="sm" onClick={handleNewDecision}>
              New Decision
            </GlassButton>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6 flex-1 flex flex-col lg:flex-row gap-6 relative z-10">
        {/* Left Sidebar */}
        <AgentSidebar onRestart={handleRestart} />

        {/* Main Panel */}
        <section className="flex-1 flex flex-col min-w-0">
          <RoundStepper currentRound={currentRound} />

          {error && (
            <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <ChatFeed onStart={handleRestart} />

          {/* Render Executive Consensus Report when complete */}
          {report && (
            <ReportView report={report} decision={activeDecision} onNewDecision={handleNewDecision} />
          )}
        </section>
      </div>
    </main>
  );
}
