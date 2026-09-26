"use client";

import ClaudeChatInput from "@/components/ui/claude-style-ai-input";

export function ClaudeDemo() {
  const handleSendMessage = (message: string) => {
    alert(`Dilemma Prompt Sent:\n\n${message}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <ClaudeChatInput
        onSendMessage={handleSendMessage}
        placeholder="Enter your strategic dilemma for the AI Boardroom..."
      />
    </div>
  );
}

export default ClaudeDemo;
