import type { KnowledgeItem } from "@/hooks/useKnowledgeStore";
import { X, FileText, Link2, Lightbulb, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const typeConfig = {
  note: { icon: FileText, label: "Note", className: "bg-primary/10 text-primary border-primary/20" },
  link: { icon: Link2, label: "Link", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  insight: { icon: Lightbulb, label: "Insight", className: "bg-ai-accent/10 text-ai-accent border-ai-accent/20" },
};

interface ItemDetailProps {
  item: KnowledgeItem;
  onClose: () => void;
}

export default function ItemDetail({ item, onClose }: ItemDetailProps) {
  const config = typeConfig[item.type];
  const TypeIcon = config.icon;

  return (
    <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-2xl bg-background rounded-xl border border-border shadow-elevated overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={`${config.className} text-xs font-medium px-2.5 py-1 gap-1.5`}>
              <TypeIcon className="w-3.5 h-3.5" />
              {config.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {item.createdAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <h2 className="text-xl font-semibold text-foreground leading-tight">{item.title}</h2>

          {item.summary && (
            <div className="bg-ai-accent/5 border border-ai-accent/10 rounded-lg p-4">
              <p className="text-xs font-medium text-ai-accent mb-1">AI Summary</p>
              <p className="text-sm text-foreground leading-relaxed">{item.summary}</p>
            </div>
          )}

          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{item.content}</p>

          {item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {item.sourceUrl}
            </a>
          )}

          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {item.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
