"use client";

import PromptComposer from "@/components/ui/prompt-composer";

export default function PromptComposerDemo() {
  const models = [
    {
      id: "gemini-1.5-flash",
      name: "Gemini 1.5 Flash",
      description: "Fast multi-agent reasoning",
      badge: "Fast",
    },
    {
      id: "gemini-2.0-flash",
      name: "Gemini 2.0 Flash",
      description: "Next-gen speed & accuracy",
      badge: "New",
    },
    { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", description: "Complex strategic reasoning" },
  ];

  return (
    <div className="flex w-full items-center justify-center p-8">
      <PromptComposer
        placeholder="Enter your strategic dilemma..."
        models={models}
        defaultModelId="gemini-1.5-flash"
        onSend={(text, modelId) => console.log("Sending prompt:", text, modelId)}
      />
    </div>
  );
}
