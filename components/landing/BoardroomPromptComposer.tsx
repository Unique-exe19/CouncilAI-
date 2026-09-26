"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Plus,
  X,
  FileText,
  ImageIcon,
  ChevronDown,
  Check,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useCouncilStore } from "@/lib/store";
import { GlassCard } from "../glass/GlassCard";
import { GlassButton } from "../glass/GlassButton";

export interface FileWithPreview {
  id: string;
  file: File;
  preview?: string;
  type: string;
}

export interface ModelOption {
  id: string;
  name: string;
  description: string;
  badge?: string;
}

const MODEL_OPTIONS: ModelOption[] = [
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    description: "Fast multi-agent boardroom reasoning",
    badge: "Fast",
  },
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    description: "Next-gen speed & accuracy",
    badge: "Latest",
  },
  {
    id: "gemini-2.0-flash-exp",
    name: "Gemini 2.0 Flash Exp",
    description: "Frontier deep reasoning engine",
  },
];

export const BoardroomPromptComposer: React.FC = () => {
  const router = useRouter();
  const { setDecision, startDebate, isDemoMode, toggleDemoMode } = useCouncilStore();

  const [promptText, setPromptText] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-1.5-flash");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [promptText]);

  // Click outside to close model dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setModelDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles: FileWithPreview[] = Array.from(files).map((file) => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      type: file.type || "application/octet-stream",
    }));
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleConvene = () => {
    const finalDecision =
      promptText.trim() ||
      "Should we transition our B2B SaaS from a freemium model to a 14-day free trial with mandatory credit card upfront?";
    setDecision(finalDecision);
    startDebate();
    router.push("/council");
  };

  const selectedModelData = MODEL_OPTIONS.find((m) => m.id === selectedModel) || MODEL_OPTIONS[0];

  return (
    <div
      className="w-full max-w-3xl relative"
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) handleFileSelect(e.dataTransfer.files);
      }}
    >
      {/* Drag overlay */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-violet-500/10 border-2 border-dashed border-violet-500 rounded-3xl flex flex-col items-center justify-center pointer-events-none backdrop-blur-xs"
          >
            <p className="text-xs font-bold text-violet-700 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Drop files to attach to boardroom session
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <GlassCard className="p-4 md:p-6 shadow-2xl border-white/90 bg-white/80 backdrop-blur-2xl rounded-3xl transition-all focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-500/10">
        <div className="flex flex-col gap-3">
          {/* Main Prompt Textarea */}
          <textarea
            ref={textareaRef}
            rows={2}
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleConvene();
              }
            }}
            placeholder="Enter your strategic dilemma (e.g., Should we transition from freemium to a 14-day paid trial with mandatory credit cards?)"
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm md:text-base leading-relaxed focus:outline-none resize-none"
          />

          {/* Attached Files List */}
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              {attachedFiles.map((fileItem) => (
                <div
                  key={fileItem.id}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-violet-50 border border-violet-200/80 text-xs font-medium text-violet-900"
                >
                  <FileText className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                  <span className="max-w-[140px] truncate">{fileItem.file.name}</span>
                  <button
                    onClick={() => removeFile(fileItem.id)}
                    className="p-0.5 rounded-full hover:bg-violet-200/80 text-violet-700 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Controls Bottom Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/60">
            <div className="flex items-center gap-2">
              {/* File Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200/80 shadow-2xs cursor-pointer"
                title="Attach document/image"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* Gemini Model Selector Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 bg-white/90 hover:bg-white text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-violet-600" />
                  <span>{selectedModelData.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${modelDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {modelDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute bottom-full left-0 mb-2 w-64 rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-xl z-30 text-left"
                    >
                      {MODEL_OPTIONS.map((m) => {
                        const isSelected = m.id === selectedModel;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setSelectedModel(m.id);
                              setModelDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                              isSelected ? "bg-violet-50 text-violet-900 font-bold" : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold">{m.name}</span>
                                {m.badge && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-violet-100 text-violet-700">
                                    {m.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 block font-normal">{m.description}</span>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-violet-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Action: Demo Toggle & Submit Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleDemoMode}
                className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <div
                  className={`w-8 h-4.5 rounded-full transition-colors relative flex items-center px-0.5 ${
                    isDemoMode ? "bg-violet-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${
                      isDemoMode ? "translate-x-3.5" : "translate-x-0"
                    }`}
                  />
                </div>
                <span className="hidden sm:inline">Demo Mode {isDemoMode ? "(On)" : "(Live)"}</span>
              </button>

              <GlassButton
                variant="primary"
                size="md"
                onClick={handleConvene}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Convene Council
              </GlassButton>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFileSelect(e.target.files);
          if (e.target) e.target.value = "";
        }}
      />
    </div>
  );
};
