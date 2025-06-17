"use client";

import { ChatInput } from "@/components/ui/chat-input";
import { ChatHero } from "./chat-hero";

export function ChatSection() {
  return (
    <div className="flex flex-col">
      <div className="chat-hero h-[25vh]">
        <ChatHero />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <ChatInput placeholder="Ask Kirti" className="h-10 w-150" />
      </div>
    </div>
  );
}
