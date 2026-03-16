"use client";

import { useState, useCallback } from "react";
import { Message, AgentConfig } from "@/lib/types";
import { buildSystemPrompt, computeSentiment, uid } from "@/lib/utils";

const DEFAULT_CONFIG: AgentConfig = {
  name: "Support Agent",
  tone: "friendly and professional",
  systemPrompt:
    "You are a helpful customer support agent. Be concise, empathetic, and always try to resolve the user's issue. If you cannot resolve an issue, escalate politely to a human agent. Always end complex answers with a follow-up question to confirm the issue is resolved.",
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<AgentConfig>(DEFAULT_CONFIG);
  const [sentimentScore, setSentimentScore] = useState(70);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      const apiHistory = [...messages, userMsg].map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: apiHistory,
            system: buildSystemPrompt(config),
          }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Request failed");

        const reply: string =
          data.content?.map((b: { type: string; text?: string }) => b.text || "").join("") ||
          "Sorry, I could not process that request.";

        const botMsg: Message = {
          id: uid(),
          role: "assistant",
          content: reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMsg]);
        setSentimentScore((prev) => computeSentiment(reply, prev).score);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content:
              "Connection issue — please try again in a moment.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, config]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setSentimentScore(70);
  }, []);

  const updateConfig = useCallback((next: AgentConfig) => {
    setConfig(next);
    setMessages([]);
    setSentimentScore(70);
  }, []);

  return {
    messages,
    isLoading,
    config,
    sentimentScore,
    sendMessage,
    clearChat,
    updateConfig,
  };
}
