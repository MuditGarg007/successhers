"use client";

import { ChatInput } from "@/components/ui/chat-input";
import { ChatHero } from "./chat-hero";
import { IconChevronCompactDown } from "@tabler/icons-react";

export function ChatSection() {
  const handleScroll = () => {
    const element = document.getElementById("achievement-cards");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="chat-hero h-[70vh]">
        <ChatHero />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <ChatInput placeholder="Ask Kirti" className="h-10 w-150" />
        <IconChevronCompactDown
          onClick={handleScroll}
          className="mt-[4rem] opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        />
      </div>
    </div>
  );
}
