export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface AgentConfig {
  name: string;
  tone: string;
  systemPrompt: string;
}

export type SentimentLevel = "positive" | "neutral" | "frustrated";
