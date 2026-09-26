"use client";

import { useRef, useState } from "react";
import {
  ArrowUp,
  Check,
  ChevronDown,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModelOption {
  id: string;
  name: string;
  description?: string;
  badge?: string;
  disabled?: boolean;
}

export type PromptComposerVariant = "Default" | "Minimal";

export interface PromptComposerProps {
  placeholder?: string;
  models?: ModelOption[];
  defaultModelId?: string;
  onSend?: (text: string, modelId?: string) => void;
  onStop?: () => void;
  isGenerating?: boolean;
  maxLength?: number;
  variant?: PromptComposerVariant;
  className?: string;
}

export function PromptComposer({
  placeholder = "Ask anything…",
  models = [],
  defaultModelId,
  onSend,
  onStop,
  isGenerating = false,
  maxLength = 2000,
  variant = "Default",
  className,
}: PromptComposerProps) {
  const [value, setValue] = useState("");
  const [modelId, setModelId] = useState(defaultModelId ?? models[0]?.id);
  const [pickerOpen, setPickerOpen] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const activeModel = models.find((model) => model.id === modelId);
  const canSend = value.trim().length > 0 && !isGenerating;
  const minimal = variant === "Minimal";

  function submit() {
    if (!canSend) return;
    onSend?.(value.trim(), modelId);
    setValue("");
    if (textarea.current) textarea.current.style.height = "auto";
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className={cn(
        "w-full max-w-[560px] rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md shadow-xs transition-[border-color,box-shadow] duration-150 focus-within:border-violet-500 focus-within:shadow-[0_0_0_3px_rgba(139,92,246,0.12)]",
        className
      )}
    >
      <div className="px-3.5 pt-3">
        <textarea
          ref={textarea}
          value={value}
          rows={minimal ? 1 : 2}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-label="Prompt"
          onChange={(event) => {
            setValue(event.target.value);
            event.target.style.height = "auto";
            event.target.style.height = `${Math.min(event.target.scrollHeight, 132)}px`;
          }}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();
              submit();
            }
          }}
          className="max-h-[132px] w-full resize-none bg-transparent text-[13.5px] leading-[1.6] text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5 pt-1.5 border-t border-slate-100">
        <div className="flex min-w-0 items-center gap-1">
          {!minimal && models.length > 0 && (
            <div className="relative min-w-0">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={pickerOpen}
                onClick={() => setPickerOpen((open) => !open)}
                className="flex min-w-0 items-center gap-1 rounded-lg px-2 py-1 font-mono text-[11px] text-slate-500 transition-[color,background-color,transform] duration-150 hover:bg-slate-100 hover:text-slate-800 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 cursor-pointer"
              >
                <span className="truncate">{activeModel?.name ?? "Model"}</span>
                <ChevronDown
                  className={cn(
                    "size-3 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] text-slate-400",
                    pickerOpen && "rotate-180"
                  )}
                />
              </button>

              {pickerOpen && (
                <ul
                  role="listbox"
                  aria-label="Model"
                  className="absolute bottom-full left-0 z-20 mb-1.5 w-56 rounded-xl border border-slate-200/90 bg-white p-1 shadow-lg"
                >
                  {models.map((model) => {
                    const selected = model.id === modelId;
                    return (
                      <li key={model.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={selected}
                          disabled={model.disabled}
                          onClick={() => {
                            setModelId(model.id);
                            setPickerOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors duration-150 cursor-pointer",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
                            model.disabled
                              ? "cursor-not-allowed opacity-40"
                              : "hover:bg-slate-100"
                          )}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[12.5px] font-medium text-slate-800">
                              {model.name}
                            </span>
                            {model.description && (
                              <span className="block truncate text-[11px] text-slate-400">
                                {model.description}
                              </span>
                            )}
                          </span>
                          {model.badge && !selected && (
                            <span className="shrink-0 rounded bg-violet-100 px-1 py-0.5 font-mono text-[9px] uppercase tracking-wide text-violet-700 font-bold">
                              {model.badge}
                            </span>
                          )}
                          {selected && (
                            <Check className="size-3.5 shrink-0 text-violet-600 font-bold" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {!minimal && (
            <span
              className={cn(
                "font-mono text-[10.5px] tabular-nums transition-colors duration-150",
                value.length > maxLength * 0.9
                  ? "text-amber-600"
                  : "text-slate-400"
              )}
            >
              {value.length}/{maxLength}
            </span>
          )}

          <button
            type={isGenerating ? "button" : "submit"}
            onClick={isGenerating ? onStop : undefined}
            aria-label={isGenerating ? "Stop generating" : "Send prompt"}
            disabled={!isGenerating && !canSend}
            className="grid size-7 place-items-center rounded-full bg-violet-600 text-white transition-[transform,opacity] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-violet-700 active:scale-[0.92] disabled:opacity-30 cursor-pointer shadow-sm shadow-violet-500/20"
          >
            <span className="relative grid size-3.5 place-items-center">
              <ArrowUp
                className={cn(
                  "absolute size-3.5 transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  isGenerating ? "opacity-0 blur-[2px]" : "opacity-100 blur-0"
                )}
              />
              <Square
                className={cn(
                  "absolute size-2.5 fill-current transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  isGenerating ? "opacity-100 blur-0" : "opacity-0 blur-[2px]"
                )}
              />
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default PromptComposer;
