import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import type { KnowledgeItem } from "@/hooks/useKnowledgeStore";

interface CaptureFormProps {
  onSubmit: (item: Omit<KnowledgeItem, "id" | "createdAt" | "updatedAt">) => void;
  onClose: () => void;
}

export default function CaptureForm({ onSubmit, onClose }: CaptureFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<"note" | "link" | "insight">("note");
  const [sourceUrl, setSourceUrl] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      type,
      tags,
      sourceUrl: sourceUrl.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-background rounded-xl border border-border shadow-elevated animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Capture Knowledge</h2>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <Label htmlFor="title" className="text-xs font-medium text-muted-foreground mb-1.5 block">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What did you learn?"
              className="h-10"
              required
            />
          </div>

          <div>
            <Label htmlFor="type" className="text-xs font-medium text-muted-foreground mb-1.5 block">Type *</Label>
            <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="note">📝 Note</SelectItem>
                <SelectItem value="link">🔗 Link</SelectItem>
                <SelectItem value="insight">💡 Insight</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="content" className="text-xs font-medium text-muted-foreground mb-1.5 block">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your knowledge here..."
              rows={4}
              required
            />
          </div>

          {type === "link" && (
            <div>
              <Label htmlFor="sourceUrl" className="text-xs font-medium text-muted-foreground mb-1.5 block">Source URL</Label>
              <Input
                id="sourceUrl"
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://..."
                className="h-10"
              />
            </div>
          )}

          <div>
            <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add a tag..."
                className="h-10"
              />
              <Button type="button" variant="outline" size="sm" onClick={addTag} className="h-10 px-3">
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Capture</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
