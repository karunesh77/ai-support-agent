"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/lib/useChat";
import ChatHeader from "./ChatHeader";
import QuickActions from "./QuickActions";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SentimentBar from "./SentimentBar";
import MessageComposer from "./MessageComposer";
import ConfigModal from "./ConfigModal";
import styles from "./ChatWidget.module.css";

export default function ChatWidget() {
  const {
    messages,
    isLoading,
    config,
    sentimentScore,
    sendMessage,
    clearChat,
    updateConfig,
  } = useChat();

  const [configOpen, setConfigOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className={styles.widget}>
      <ChatHeader
        config={config}
        onClear={clearChat}
        onOpenConfig={() => setConfigOpen(true)}
      />

      <QuickActions onSelect={sendMessage} disabled={isLoading} />

      <div className={styles.messages}>
        {messages.length === 0 && (
          <div className={styles.welcome}>
            <div className={styles.welcomeIcon}>✦</div>
            <p className={styles.welcomeName}>Hi! I&apos;m {config.name}</p>
            <p className={styles.welcomeSub}>How can I help you today?</p>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <SentimentBar score={sentimentScore} />

      <MessageComposer onSend={sendMessage} disabled={isLoading} />

      <ConfigModal
        open={configOpen}
        config={config}
        onSave={(next) => {
          updateConfig(next);
          setConfigOpen(false);
        }}
        onClose={() => setConfigOpen(false)}
      />
    </div>
  );
}
