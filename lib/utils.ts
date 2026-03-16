import { AgentConfig, SentimentLevel } from "./types";

export function buildSystemPrompt(config: AgentConfig): string {
  return `${config.systemPrompt}

Your name is ${config.name}. Your tone should be ${config.tone}.
Keep responses under 3 short paragraphs unless the user asks for detail.
Format lists with dashes. Do not use markdown headers.`;
}

export function computeSentiment(
  text: string,
  current: number
): { score: number; level: SentimentLevel } {
  const positive = (
    text.match(
      /thank|great|perfect|happy|help|resolv|glad|appreciate|welcome|sure|absolutely|certainly|pleasure/gi
    ) || []
  ).length;
  const negative = (
    text.match(
      /sorry|issue|problem|error|bug|frustrat|unable|cannot|unfortunately|fail|wrong|broken/gi
    ) || []
  ).length;
  const delta = (positive - negative) * 8;
  const score = Math.min(98, Math.max(15, current + delta));
  const level: SentimentLevel =
    score > 65 ? "positive" : score > 40 ? "neutral" : "frustrated";
  return { score, level };
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
