"use client";

import React from "react";
import { clsx } from "clsx";
import { motion, HTMLMotionProps } from "framer-motion";

export interface GlassButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "amber";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  icon,
  className,
  disabled,
  onClick,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none shadow-sm";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white shadow-violet-500/25 shadow-lg hover:shadow-violet-500/40 hover:from-violet-500 hover:to-blue-500 border border-white/20",
    secondary:
      "bg-white/70 text-slate-800 hover:bg-white border border-slate-200/80 shadow-slate-200/50 hover:shadow-md",
    outline:
      "bg-transparent text-slate-700 hover:bg-white/60 border border-slate-300/70",
    danger:
      "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20 border border-white/20",
    amber:
      "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/20 border border-white/20",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
};
