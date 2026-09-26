import { create } from "zustand";
import { ExecutiveReport } from "./schema";

export interface ChatMessage {
  id: string;
  agentId: "CEO" | "CFO" | "CTO" | "CMO" | "MODERATOR";
  round: 1 | 2 | 3;
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

interface CouncilState {
  decision: string;
  isDebating: boolean;
  isDemoMode: boolean;
  currentRound: 1 | 2 | 3 | 4; // 4 = Report phase
  speakingAgent: "CEO" | "CFO" | "CTO" | "CMO" | "MODERATOR" | null;
  messages: ChatMessage[];
  report: ExecutiveReport | null;
  error: string | null;

  // Actions
  setDecision: (decision: string) => void;
  toggleDemoMode: () => void;
  setDemoMode: (val: boolean) => void;
  startDebate: () => void;
  stopDebate: () => void;
  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => string;
  appendTokenToMessage: (id: string, token: string) => void;
  completeMessage: (id: string) => void;
  setSpeakingAgent: (agent: "CEO" | "CFO" | "CTO" | "CMO" | "MODERATOR" | null) => void;
  setRound: (round: 1 | 2 | 3 | 4) => void;
  setReport: (report: ExecutiveReport) => void;
  setError: (err: string | null) => void;
  reset: () => void;
}

export const useCouncilStore = create<CouncilState>((set, get) => ({
  decision: "",
  isDebating: false,
  isDemoMode: false,
  currentRound: 1,
  speakingAgent: null,
  messages: [],
  report: null,
  error: null,

  setDecision: (decision) => set({ decision }),
  toggleDemoMode: () => set((state) => ({ isDemoMode: !state.isDemoMode })),
  setDemoMode: (isDemoMode) => set({ isDemoMode }),

  startDebate: () =>
    set({
      isDebating: true,
      currentRound: 1,
      speakingAgent: "CEO",
      messages: [],
      report: null,
      error: null,
    }),

  stopDebate: () =>
    set({
      isDebating: false,
      speakingAgent: null,
    }),

  addMessage: (msg) => {
    const id = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newMsg: ChatMessage = {
      ...msg,
      id,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isStreaming: true,
    };
    set((state) => ({ messages: [...state.messages, newMsg] }));
    return id;
  },

  appendTokenToMessage: (id, token) => {
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, text: m.text + token } : m
      ),
    }));
  },

  completeMessage: (id) => {
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, isStreaming: false } : m
      ),
    }));
  },

  setSpeakingAgent: (agent) => set({ speakingAgent: agent }),
  setRound: (currentRound) => set({ currentRound }),
  setReport: (report) => set({ report, isDebating: false, currentRound: 4, speakingAgent: null }),
  setError: (error) => set({ error, isDebating: false, speakingAgent: null }),

  reset: () =>
    set({
      decision: "",
      isDebating: false,
      currentRound: 1,
      speakingAgent: null,
      messages: [],
      report: null,
      error: null,
    }),
}));
