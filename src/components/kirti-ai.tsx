"use client";

import React, { useState, useRef, useEffect } from "react";
import { IconSend } from "@tabler/icons-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const KirtiAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi! I am Kirti AI. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input } as const;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Mock AI response (replace with real API call)
    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: `You said: "${userMessage.text}" (This is a mock response.)`,
      } as const;
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1200);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
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
          disabled={loading}
        />
        <button
          onClick={handleSend}
          style={styles.sendButton}
          disabled={loading || !input.trim()}
        >
          <IconSend />
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
};

export default KirtiAI;
