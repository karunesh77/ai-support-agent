"use client";

import { AgentConfig } from "@/lib/types";
import styles from "./ChatHeader.module.css";

interface Props {
  config: AgentConfig;
  onClear: () => void;
  onOpenConfig: () => void;
}

export default function ChatHeader({ config, onClear, onOpenConfig }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.avatar}>✦</div>
      <div className={styles.info}>
        <p className={styles.name}>{config.name}</p>
        <p className={styles.status}>
          <span className={styles.dot} />
          Online · AI-powered
        </p>
      </div>
      <div className={styles.actions}>
        <button className={styles.iconBtn} onClick={onClear} title="Clear chat">
          ↺
        </button>
        <button
          className={styles.iconBtn}
          onClick={onOpenConfig}
          title="Configure agent"
        >
          ⚙
        </button>
      </div>
    </header>
  );
}
