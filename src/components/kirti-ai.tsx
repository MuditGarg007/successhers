"use client";

import React, { useState, useRef, useEffect } from "react";
import { IconSend } from "@tabler/icons-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const SYSTEM_PROMPT =
  "You're an AI assistant named Kirti under this project that's made to help women addressing questions related to learning, advancing their career, or receiving guidance. Make sure you use context from previous messages to better address their equations and often relate back to previous messages. Any messages other than addressing their career, such as 'what do you like' should be ignored.";

const KirtiAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi! I am Kirti AI. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Set sessionId only on client
  useEffect(() => {
    let id = localStorage.getItem("sessionId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("sessionId", id);
    }
    setSessionId(id);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;
    const userMessage = { sender: "user", text: input } as const;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Gather previous messages for context (excluding the initial greeting)
      const prevUserAndBot = messages
        .slice(1)
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        }));

      const payload = {
        sessionId,
        model: "meta-llama/llama-3.3-8b-instruct:free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...prevUserAndBot,
          { role: "user", content: userMessage.text },
        ],
      };

      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      const botText =
        data.choices?.[0]?.message?.content ||
        data.error ||
        "Sorry, I couldn't get a response.";
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botText },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error fetching response." },
      ]);
    }
    setLoading(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleReset = async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      await fetch("/api/chatbot/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      setMessages([
        { sender: "bot", text: "Hi! I am Kirti AI. How can I help you today?" },
        { sender: "bot", text: "Conversation reset." },
      ]);
    } catch {
      setMessages([
        { sender: "bot", text: "Hi! I am Kirti AI. How can I help you today?" },
        { sender: "bot", text: "Failed to reset conversation." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow} className="kirti-chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              ...(msg.sender === "user"
                ? styles.userMessage
                : styles.botMessage),
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.message, ...styles.botMessage }}>
            <span>...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          style={styles.input}
          placeholder="Type your message..."
          disabled={loading || !sessionId}
        />
        <button
          onClick={handleSend}
          style={styles.sendButton}
          disabled={loading || !input.trim() || !sessionId}
        >
          <IconSend />
        </button>
        <button
          onClick={handleReset}
          style={styles.resetButton}
          disabled={loading || !sessionId}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "80%",
    margin: "0 auto",
    marginTop: "2rem",
    border: "none",
    display: "flex",
    flexDirection: "column",
    height: "85vh",
  },
  chatWindow: {
    flex: 1,
    padding: 16,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  message: {
    maxWidth: "75%",
    padding: "10px 16px",
    borderRadius: 18,
    fontSize: 15,
    lineHeight: 1.5,
    marginBottom: 2,
    wordBreak: "break-word",
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
  },
  userMessage: {
    alignSelf: "flex-end",
    background: "#ee1e7e",
    color: "#fff",
    borderBottomRightRadius: 4,
  },
  botMessage: {
    alignSelf: "flex-start",
    background: "#f1f0f0",
    color: "#222",
    borderBottomLeftRadius: 4,
  },
  inputArea: {
    display: "flex",
    alignItems: "center",
    padding: 8,
    borderRadius: 9999,
    margin: 12,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    gap: 8,
    backgroundColor: "#171717",
  },
  input: {
    flex: 1,
    padding: "10px 16px",
    borderRadius: 9999,
    border: "none",
    fontSize: 15,
    outline: "none",
    marginRight: 0,
  },
  sendButton: {
    padding: "8px 22px",
    borderRadius: 9999,
    border: "none",
    background: "#ee1e7e",
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    transition: "background 0.2s",
    height: 40,
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
  },
  resetButton: {
    padding: "8px 16px",
    borderRadius: 9999,
    border: "none",
    background: "#e11d48",
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    transition: "background 0.2s",
    height: 40,
    marginLeft: 8,
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
  },
};

export default KirtiAI;
