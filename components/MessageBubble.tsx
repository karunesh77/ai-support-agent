import { Message } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import styles from "./MessageBubble.module.css";

interface Props {
  message: Message;
}

function formatContent(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /`([^`]+)`/g,
      '<code class="inline-code">$1</code>'
    )
    .replace(
      /^- (.+)/gm,
      '<span class="list-item">– $1</span>'
    )
    .replace(/\n/g, "<br>");
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`${styles.row} ${isUser ? styles.user : styles.bot}`}>
      <div className={`${styles.avatar} ${isUser ? styles.userAvatar : styles.botAvatar}`}>
        {isUser ? "◉" : "✦"}
      </div>
      <div className={styles.col}>
        <div
          className={`${styles.bubble} ${isUser ? styles.userBubble : styles.botBubble}`}
          dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
        />
        <p className={styles.meta}>{formatTime(message.timestamp)}</p>
      </div>
    </div>
  );
}
