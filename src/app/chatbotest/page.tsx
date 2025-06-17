"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Set sessionId only on client
  useEffect(() => {
    let id = localStorage.getItem("sessionId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("sessionId", id);
    }
    setSessionId(id);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionId) return; // Don't submit until sessionId is set
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          model: "meta-llama/llama-3.3-8b-instruct:free",
          messages: [
            {
              role: "system",
              content: "You're an AI assistant under this project that's made to help women addressing questions related to learning, advancing their career, or receiving guidance. Make sure you use context from previous messages to better address their equations and often relate back to previous messages. Any messages other than addressing their career, such as 'what do you like' should be ignored.",
            },
            {
              role: "user",
              content: input,
            },
          ],
        }),
      });
      const data = await res.json();
      setResponse(data.choices?.[0]?.message?.content || JSON.stringify(data));
    } catch (err) {
      setResponse("Error fetching response.");
    }
    setLoading(false);
  }

  async function handleReset() {
    if (!sessionId) return;
    setLoading(true);
    setResponse(null);
    try {
      await fetch("/api/chatbot/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      setResponse("Conversation reset.");
    } catch {
      setResponse("Failed to reset conversation.");
    }
    setLoading(false);
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 20)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
              <input
                type="text"
                className="flex-1 border rounded px-2 py-1"
                placeholder="Type your prompt..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
                disabled={!sessionId}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-1 rounded"
                disabled={loading || !sessionId}
              >
                {loading ? "Sending..." : "Send"}
              </button>
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-1 rounded"
                onClick={handleReset}
                disabled={loading || !sessionId}
              >
                Reset Conversation
              </button>
            </form>
            {response && (
              <div className="p-2 border rounded bg-black text-white whitespace-pre-wrap">
                {response}
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
