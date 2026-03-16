import { useState } from "react";
import { Sparkles, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import type { KnowledgeItem } from "@/hooks/useKnowledgeStore";

interface AIPanelProps {
  items: KnowledgeItem[];
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AIPanel({ items, isOpen, onClose }: AIPanelProps) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const processQuery = (userQuery: string) => {
    const lower = userQuery.toLowerCase();

    // Summarize
    if (lower.includes("summarize") || lower.includes("summary")) {
      const summaries = items
        .filter((i) => i.summary)
        .map((i) => `**${i.title}**: ${i.summary}`)
        .join("\n\n");
      return summaries || "No summaries available yet. Add more knowledge items!";
    }

    // Search by tag
    const tagMatch = lower.match(/(?:about|tagged?|related to)\s+(\w+)/);
    if (tagMatch) {
      const tag = tagMatch[1];
      const matched = items.filter((i) =>
        i.tags.some((t) => t.toLowerCase().includes(tag)) ||
        i.title.toLowerCase().includes(tag) ||
        i.content.toLowerCase().includes(tag)
      );
      if (matched.length > 0) {
        return `Found **${matched.length}** items related to "${tag}":\n\n` +
          matched.map((i) => `• **${i.title}** (${i.type}) — ${i.summary || i.content.slice(0, 80)}...`).join("\n");
      }
      return `No items found related to "${tag}". Try a different query.`;
    }

    // Count
    if (lower.includes("how many") || lower.includes("count")) {
      const notes = items.filter((i) => i.type === "note").length;
      const links = items.filter((i) => i.type === "link").length;
      const insights = items.filter((i) => i.type === "insight").length;
      return `Your knowledge base contains **${items.length}** items:\n\n• 📝 ${notes} notes\n• 🔗 ${links} links\n• 💡 ${insights} insights`;
    }

    // Default: search all content
    const words = lower.split(/\s+/).filter((w) => w.length > 2);
    const scored = items
      .map((item) => {
        const text = `${item.title} ${item.content} ${item.tags.join(" ")}`.toLowerCase();
        const score = words.filter((w) => text.includes(w)).length;
        return { item, score };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    if (scored.length > 0) {
      return `Here's what I found:\n\n` +
        scored.map((s) => `• **${s.item.title}** — ${s.item.summary || s.item.content.slice(0, 100)}...`).join("\n\n");
    }

    return "I couldn't find relevant knowledge for that query. Try asking about specific topics or use commands like \"summarize all\" or \"how many items\".";
  };

  const handleSend = () => {
    if (!query.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: query.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsThinking(true);

    setTimeout(() => {
      const response = processQuery(userMsg.content);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsThinking(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 250 }}
          className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-background border-l border-border shadow-elevated flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-ai-accent/10 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-ai-accent" />
              </div>
              <span className="text-sm font-semibold text-foreground">AI Assistant</span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-ai-accent/10 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-ai-accent" />
                </div>
                <p className="text-sm text-foreground font-medium">Query your knowledge</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Ask questions, request summaries, or search your knowledge base conversationally.
                </p>
                <div className="space-y-1.5 pt-2">
                  {["Summarize all my knowledge", "What do I know about AI?", "How many items do I have?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => { setQuery(q); }}
                      className="block w-full text-left text-xs text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      → {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-ai-accent/5 text-foreground border border-ai-accent/10"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div className="ai-shimmer rounded-xl px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-ai-accent/60"
                        style={{ animation: `pulse 1s ease-in-out ${i * 0.15}s infinite` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-ai-accent">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask your knowledge base..."
                className="h-10 text-sm"
              />
              <Button size="sm" onClick={handleSend} disabled={!query.trim() || isThinking} className="h-10 px-3">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
