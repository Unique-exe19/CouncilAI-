"use client";

import React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hover = false,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={clsx(
        "rounded-3xl glass-panel p-6 relative overflow-hidden",
        hover && "cursor-pointer glass-panel-hover",
        className
      )}
    >
      {/* Subtle inner top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};
