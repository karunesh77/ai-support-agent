import { computeSentiment } from "@/lib/utils";
import styles from "./SentimentBar.module.css";

interface Props {
  score: number;
}

const EMOJI: Record<string, string> = {
  positive: "😊",
  neutral: "😐",
  frustrated: "😟",
};

export default function SentimentBar({ score }: Props) {
  const { level } = computeSentiment("", score);
  const color =
    score > 65 ? "var(--green)" : score > 40 ? "#f59e0b" : "#f87171";

  return (
    <div className={styles.bar}>
      <span className={styles.label}>
        {EMOJI[level]} {level.charAt(0).toUpperCase() + level.slice(1)}
      </span>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span className={styles.value}>{Math.round(score)}%</span>
    </div>
  );
}
