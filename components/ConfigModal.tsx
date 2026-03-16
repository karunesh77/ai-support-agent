"use client";

import { useState, useEffect } from "react";
import { AgentConfig } from "@/lib/types";
import styles from "./ConfigModal.module.css";

interface Props {
  open: boolean;
  config: AgentConfig;
  onSave: (next: AgentConfig) => void;
  onClose: () => void;
}

export default function ConfigModal({ open, config, onSave, onClose }: Props) {
  const [name, setName] = useState(config.name);
  const [tone, setTone] = useState(config.tone);
  const [prompt, setPrompt] = useState(config.systemPrompt);

  useEffect(() => {
    setName(config.name);
    setTone(config.tone);
    setPrompt(config.systemPrompt);
  }, [config, open]);

  function handleSave() {
    onSave({ name: name || "Support Agent", tone, systemPrompt: prompt });
  }

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>⚙ Agent configuration</h3>

        <div className={styles.field}>
          <label className={styles.label}>Agent name</label>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aria from TechCorp"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Tone</label>
          <select
            className={styles.input}
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="friendly and professional">Friendly &amp; professional</option>
            <option value="formal and concise">Formal &amp; concise</option>
            <option value="casual and empathetic">Casual &amp; empathetic</option>
            <option value="technical and precise">Technical &amp; precise</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>System prompt</label>
          <textarea
            className={styles.textarea}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.btnGhost} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.btnPrimary} onClick={handleSave}>
            Save &amp; restart
          </button>
        </div>
      </div>
    </div>
  );
}
