"use client";

import React from "react";
import { Crown, Coins, Zap, Megaphone, Landmark, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  CEO: Crown,
  CFO: Coins,
  CTO: Zap,
  CMO: Megaphone,
  MODERATOR: Landmark,
};

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  CEO: { bg: "bg-violet-100", text: "text-violet-700", border: "border-violet-200" },
  CFO: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
  CTO: { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-200" },
  CMO: { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200" },
  MODERATOR: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
};

interface AgentAvatarProps {
  agentId: "CEO" | "CFO" | "CTO" | "CMO" | "MODERATOR" | string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const AgentAvatar: React.FC<AgentAvatarProps> = ({ agentId, size = "md", className = "" }) => {
  const normalizedId = (agentId || "CEO").toUpperCase();
  const IconComponent = ICON_MAP[normalizedId] || Crown;
  const colors = COLOR_MAP[normalizedId] || COLOR_MAP.CEO;

  const sizeClasses = {
    sm: "w-8 h-8 rounded-xl",
    md: "w-11 h-11 rounded-2xl",
    lg: "w-14 h-14 rounded-2xl",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colors.bg} ${colors.text} ${colors.border} border shadow-xs flex items-center justify-center shrink-0 ${className}`}
    >
      <IconComponent className={iconSizes[size]} strokeWidth={2.2} />
    </div>
  );
};
