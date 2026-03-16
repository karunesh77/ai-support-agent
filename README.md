# AI Support Agent

A production-ready AI customer support chat agent built with Next.js 15 and Claude (Anthropic).

## Features

- 🤖 AI responses powered by Claude Sonnet via Anthropic API
- 💬 Multi-turn conversation memory
- 📊 Real-time sentiment tracking
- ⚡ Quick-action chips for common queries
- ⚙️ Configurable agent name, tone, and system prompt
- 🔒 API key kept server-side (never exposed to client)
- 🎨 Dark-mode UI with smooth animations

## Project Structure

```
ai-support-agent/
├── app/
│   ├── api/chat/route.ts     # Server-side Anthropic API proxy
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ChatWidget.tsx         # Main orchestrator component
│   ├── ChatHeader.tsx
│   ├── QuickActions.tsx
│   ├── MessageBubble.tsx
│   ├── TypingIndicator.tsx
│   ├── SentimentBar.tsx
│   ├── MessageComposer.tsx
│   └── ConfigModal.tsx
├── lib/
│   ├── types.ts
│   ├── utils.ts
│   └── useChat.ts             # Core chat state hook
└── .env.local.example
```

## Local Setup

1. **Clone / copy the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   ```bash
   cp .env.local.example .env.local
   # Then edit .env.local and add your key:
   # ANTHROPIC_API_KEY=sk-ant-...
   ```
   Get your key at https://console.anthropic.com

4. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm i -g vercel
vercel
# Follow prompts, then add env var:
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

### Option B — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to https://vercel.com/new and import the repo
3. In **Environment Variables**, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your key from https://console.anthropic.com
4. Click **Deploy**

## Customising the Agent

Edit the defaults in `lib/useChat.ts`:

```ts
const DEFAULT_CONFIG: AgentConfig = {
  name: "Support Agent",          // Agent display name
  tone: "friendly and professional",
  systemPrompt: "You are a helpful customer support agent...",
};
```

Or use the in-app ⚙ config panel at runtime — no code changes needed.

## Extending

- **Add streaming**: Replace the `fetch` in `lib/useChat.ts` with `stream: true` and consume the SSE stream
- **Add a database**: Store conversations in Postgres/Supabase by persisting `messages` in `useChat.ts`
- **Widget embed**: Wrap `<ChatWidget />` in a fixed-position overlay for use on any page
- **Auth**: Add Next.js middleware to gate the `/api/chat` route behind a session check
