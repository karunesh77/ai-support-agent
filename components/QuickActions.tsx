"use client";

import styles from "./QuickActions.module.css";

const QUICK_ACTIONS = [
  { label: "🔑 Reset password", text: "How do I reset my password?" },
  { label: "💳 Refund request", text: "I need a refund for my order" },
  { label: "📦 Track order", text: "Track my delivery" },
  { label: "🐛 Report bug", text: "I found a bug in the app" },
  { label: "👤 Human agent", text: "Talk to a human agent" },
];

interface Props {
  onSelect: (text: string) => void;
  disabled: boolean;
}

export default function QuickActions({ onSelect, disabled }: Props) {
  return (
    <div className={styles.bar}>
      {QUICK_ACTIONS.map((a) => (
        <button
          key={a.text}
          className={styles.chip}
          onClick={() => onSelect(a.text)}
          disabled={disabled}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}
