"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistralai/mistral-nemo:free",
          messages: [
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
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-1 rounded"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
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
