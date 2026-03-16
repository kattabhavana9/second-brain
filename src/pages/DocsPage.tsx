import { Brain, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">SecondBrain</span>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Architecture Documentation</h1>
        <p className="text-lg text-muted-foreground mb-12">Design principles, architecture decisions, and infrastructure overview.</p>

        <div className="space-y-12">
          {/* Portable Architecture */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 pb-2 border-b border-border">1. Portable Architecture</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>The system follows a <strong className="text-foreground">layered, swappable architecture</strong> where each concern is isolated:</p>
              <div className="bg-card rounded-xl border border-border p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <code className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium shrink-0">Presentation</code>
                  <p>React components with Tailwind CSS. Fully decoupled from data layer. Can be swapped for any UI framework.</p>
                </div>
                <div className="flex items-start gap-3">
                  <code className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium shrink-0">State</code>
                  <p>Custom hooks (<code className="text-xs bg-secondary px-1 rounded">useKnowledgeStore</code>) abstract data access. Swap from in-memory to Supabase/PostgreSQL without touching UI.</p>
                </div>
                <div className="flex items-start gap-3">
                  <code className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium shrink-0">AI Layer</code>
                  <p>AI processing is isolated in dedicated components. Can switch between OpenAI, Claude, Gemini, or local models by changing the API adapter.</p>
                </div>
                <div className="flex items-start gap-3">
                  <code className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium shrink-0">Storage</code>
                  <p>Data persistence abstracted through the store hook. Currently in-memory, ready for PostgreSQL/Supabase via edge functions.</p>
                </div>
              </div>
            </div>
          </section>

          {/* UX Principles */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 pb-2 border-b border-border">2. Principles-Based UX</h2>
            <div className="space-y-4">
              {[
                { title: "Progressive Disclosure", desc: "Secondary actions (delete, source links) are revealed on hover. AI summaries are visually distinct but non-intrusive. Detail views expand on click." },
                { title: "AI as Assistant, Not Obstacle", desc: "The AI panel slides in from the right as a conversational assistant. It never blocks workflow. Users can query, summarize, or search without leaving their context." },
                { title: "Capture Friction = Zero", desc: "One-click capture form with smart defaults. Tags are added inline. Type selection is immediate. The form closes and items appear instantly." },
                { title: "Visual Type System", desc: "Notes, Links, and Insights each have distinct color-coded badges and icons, creating an instant visual grammar that aids scanning." },
                { title: "Intelligence Everywhere", desc: "AI summaries appear on cards, in detail views, and via the chat panel. Knowledge is surfaced contextually, not hidden behind menus." },
              ].map((p) => (
                <div key={p.title} className="bg-card rounded-xl border border-border p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Agent Thinking */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 pb-2 border-b border-border">3. Agent Thinking</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>The system implements <strong className="text-foreground">autonomous intelligence</strong> that improves the knowledge base over time:</p>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">→</span>
                  <strong className="text-foreground">Auto-Summarization:</strong> New entries can be automatically summarized by AI, creating a compressed knowledge layer.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">→</span>
                  <strong className="text-foreground">Smart Tagging:</strong> AI analyzes content and suggests relevant tags, reducing manual categorization burden.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">→</span>
                  <strong className="text-foreground">Conversational Query:</strong> The AI panel processes natural language queries against the knowledge base, synthesizing answers from multiple entries.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">→</span>
                  <strong className="text-foreground">Relevance Scoring:</strong> Search results are scored by keyword relevance across title, content, and tags.
                </li>
              </ul>
            </div>
          </section>

          {/* Infrastructure */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4 pb-2 border-b border-border">4. Infrastructure Mindset</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>The system is designed as <strong className="text-foreground">infrastructure for thought</strong>, exposing functionality for external consumption:</p>
              <div className="bg-card rounded-xl border border-border p-5 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Public API Endpoint</h4>
                  <code className="block text-xs bg-secondary px-3 py-2 rounded-lg font-mono">GET /api/public/brain/query?q=your+question</code>
                  <p className="text-xs text-muted-foreground mt-2">Returns JSON with answers and source references from the knowledge base.</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Embeddable Widget</h4>
                  <code className="block text-xs bg-secondary px-3 py-2 rounded-lg font-mono">{`<iframe src="/embed/search" width="400" height="500" />`}</code>
                  <p className="text-xs text-muted-foreground mt-2">Iframe-embeddable search widget for integrating the brain into external applications.</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Technology Stack</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Frontend", value: "React + Vite + Tailwind" },
                      { label: "State", value: "Custom hooks (swappable)" },
                      { label: "AI", value: "Pluggable via edge functions" },
                      { label: "Database", value: "Ready for PostgreSQL" },
                      { label: "Deployment", value: "Lovable (Vercel-compatible)" },
                      { label: "Motion", value: "Framer Motion + Lenis" },
                    ].map((s) => (
                      <div key={s.label} className="bg-background rounded-lg px-3 py-2 border border-border">
                        <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
                        <p className="text-xs text-foreground font-medium">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
