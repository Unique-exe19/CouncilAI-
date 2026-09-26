"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Bot, Code2 } from "lucide-react";
import { Hero } from "@/components/landing/Hero";
import { ExampleChips } from "@/components/landing/ExampleChips";
import { AgentShowcase } from "@/components/landing/AgentShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#F7F8FC]">
      {/* Animated Floating Gradient Ambient Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-violet-200/40 via-purple-300/30 to-indigo-200/20 blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-[20%] right-[-120px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-sky-200/40 via-blue-200/30 to-teal-200/20 blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-rose-200/30 via-pink-200/20 to-amber-200/30 blur-3xl animate-blob animation-delay-4000 pointer-events-none" />

      {/* Navigation Bar */}
      <header className="w-full max-w-6xl mx-auto px-4 py-6 flex items-center justify-between relative z-10" aria-label="Main Navigation">
        <Link href="/" aria-label="CouncilAI Home Page" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:scale-105 transition-transform">
            <Bot className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">CouncilAI</span>
            <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest mt-0.5">
              Multi-Agent Boardroom
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Unique-exe19/CouncilAI-.git"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source code on GitHub"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-slate-200/80 hover:bg-white text-slate-700 text-xs font-semibold shadow-xs transition-all"
          >
            <Code2 className="w-4 h-4" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </header>

      {/* Landing Page Content */}
      <div className="relative z-10">
        <Hero />
        <ExampleChips />
        <AgentShowcase />
        <HowItWorks />
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/60 py-8 text-center text-xs text-slate-500 relative z-10">
        <p>© 2026 CouncilAI &bull; Powered by Google Gemini 1.5 Flash Multi-Agent Framework</p>
      </footer>
    </main>
  );
}
