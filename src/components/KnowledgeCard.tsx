import { Badge } from "@/components/ui/badge";
import type { KnowledgeItem } from "@/hooks/useKnowledgeStore";
import { FileText, Link2, Lightbulb, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const typeConfig = {
  note: { icon: FileText, label: "Note", className: "bg-primary/10 text-primary border-primary/20" },
  link: { icon: Link2, label: "Link", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  insight: { icon: Lightbulb, label: "Insight", className: "bg-ai-accent/10 text-ai-accent border-ai-accent/20" },
};

interface KnowledgeCardProps {
  item: KnowledgeItem;
  onDelete: (id: string) => void;
  onClick: (item: KnowledgeItem) => void;
}

export default function KnowledgeCard({ item, onDelete, onClick }: KnowledgeCardProps) {
  const [hovered, setHovered] = useState(false);
  const config = typeConfig[item.type];
  const TypeIcon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="group relative p-5 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(item)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <Badge variant="outline" className={`${config.className} text-[11px] font-medium px-2 py-0.5 gap-1`}>
            <TypeIcon className="w-3 h-3" />
            {config.label}
          </Badge>
          <span className="text-[11px] text-muted-foreground">
            {item.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>

        {hovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug line-clamp-2">
        {item.title}
      </h3>

      {item.summary && (
        <p className="text-xs text-ai-accent bg-ai-accent/5 rounded-md px-2.5 py-1.5 mb-3 leading-relaxed line-clamp-2">
          <span className="font-medium">AI: </span>{item.summary}
        </p>
      )}

      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
        {item.content}
      </p>

      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
      )}

      {item.sourceUrl && hovered && (
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          <Link2 className="w-3 h-3" />
          Source
        </motion.a>
      )}
    </motion.div>
  );
}
