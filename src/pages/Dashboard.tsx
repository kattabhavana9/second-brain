import { useState } from "react";
import { useKnowledgeStore, type KnowledgeItem } from "@/hooks/useKnowledgeStore";
import KnowledgeCard from "@/components/KnowledgeCard";
import CaptureForm from "@/components/CaptureForm";
import AIPanel from "@/components/AIPanel";
import ItemDetail from "@/components/ItemDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Plus, Search, Sparkles, FileText, Link2, Lightbulb, LayoutGrid, List, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

type FilterType = "all" | "note" | "link" | "insight";
type SortBy = "newest" | "oldest";
type ViewMode = "grid" | "list";

export default function Dashboard() {
  const { items, addItem, deleteItem } = useKnowledgeStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showCapture, setShowCapture] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);

  const filtered = items
    .filter((item) => {
      if (filter !== "all" && item.type !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) =>
      sortBy === "newest"
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime()
    );

  const filterButtons: { value: FilterType; label: string; icon: typeof FileText }[] = [
    { value: "all", label: "All", icon: LayoutGrid },
    { value: "note", label: "Notes", icon: FileText },
    { value: "link", label: "Links", icon: Link2 },
    { value: "insight", label: "Insights", icon: Lightbulb },
  ];

  const allTags = [...new Set(items.flatMap((i) => i.tags))];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border flex flex-col z-40 hidden lg:flex">
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">SecondBrain</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link to="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground bg-secondary font-medium">
            <LayoutGrid className="w-4 h-4" />
            Dashboard
          </div>
          <Link to="/docs" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <FileText className="w-4 h-4" />
            Docs
          </Link>
        </nav>

        <div className="p-4 border-t border-border">
          <p className="text-[11px] font-medium text-muted-foreground mb-2 px-1">Tags</p>
          <div className="flex flex-wrap gap-1.5">
            {allTags.slice(0, 12).map((tag) => (
              <button
                key={tag}
                onClick={() => setSearch(tag)}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground hover:bg-surface-hover transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                    <Brain className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                </Link>
              </div>
              <h1 className="text-lg font-semibold text-foreground">Knowledge Base</h1>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-md font-medium">
                {items.length} items
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAI(true)}
                className="gap-1.5 text-ai-accent border-ai-accent/20 hover:bg-ai-accent/5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ask AI</span>
              </Button>
              <Button size="sm" onClick={() => setShowCapture(true)} className="gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Capture</span>
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 px-6 pb-4 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search knowledge..."
                className="h-9 pl-9 text-sm"
              />
            </div>

            <div className="flex items-center gap-1 bg-secondary rounded-lg p-0.5">
              {filterButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setFilter(btn.value)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors ${
                    filter === btn.value
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <btn.icon className="w-3 h-3" />
                  {btn.label}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="h-9 text-xs border border-border rounded-lg px-2.5 bg-background text-foreground"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>

            <div className="flex items-center gap-0.5 bg-secondary rounded-lg p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-foreground font-medium mb-1">No items found</p>
              <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-3"}>
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <KnowledgeCard
                    key={item.id}
                    item={item}
                    onDelete={deleteItem}
                    onClick={setSelectedItem}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showCapture && <CaptureForm onSubmit={addItem} onClose={() => setShowCapture(false)} />}
      <AIPanel items={items} isOpen={showAI} onClose={() => setShowAI(false)} />
      <AnimatePresence>
        {selectedItem && <ItemDetail item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </div>
  );
}
