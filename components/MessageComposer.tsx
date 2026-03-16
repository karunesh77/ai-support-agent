"use client";

import { useRef, useEffect, KeyboardEvent } from "react";
import styles from "./MessageComposer.module.css";

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function MessageComposer({ onSend, disabled }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled) ref.current?.focus();
  }, [disabled]);

  function handleSend() {
    const val = ref.current?.value.trim();
    if (!val || disabled) return;
    onSend(val);
    if (ref.current) {
      ref.current.value = "";
      ref.current.style.height = "auto";
    }
  }

  function handleKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleInput() {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  }

  return (
    <div className={styles.composer}>
      <div className={styles.inner}>
        <textarea
          ref={ref}
          className={styles.input}
          placeholder="Type your message…"
          rows={1}
          onKeyDown={handleKey}
          onInput={handleInput}
          disabled={disabled}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={disabled}
          aria-label="Send message"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="2" y1="8" x2="14" y2="8" />
            <polyline points="9,3 14,8 9,13" />
          </svg>
        </button>
      </div>
    </div>
  );
}
