"use client";

import React from "react";
import { clsx } from "clsx";

interface GlassInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">{label}</label>}
      <textarea
        className={clsx(
          "w-full rounded-2xl glass-input p-4 text-slate-800 placeholder-slate-400 text-sm focus:outline-none transition-all resize-none",
          error && "border-rose-400 focus:ring-rose-200",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-rose-500 font-medium ml-1">{error}</span>}
    </div>
  );
};
