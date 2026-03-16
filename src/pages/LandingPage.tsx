import { motion } from "framer-motion";
import { Brain, Sparkles, Search, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Brain,
    title: "Capture Everything",
    description: "Notes, links, insights — all in one structured, searchable system.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Intelligence",
    description: "Auto-summarize, smart tagging, and conversational querying of your knowledge.",
  },
  {
    icon: Search,
    title: "Instant Retrieval",
    description: "Find anything in milliseconds with full-text search, filters, and smart sorting.",
  },
  {
    icon: Zap,
    title: "Public API Access",
    description: "Expose your brain via API endpoints or embeddable widgets for external integration.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">SecondBrain</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/docs">
              <Button variant="ghost" size="sm">Docs</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm">
                Open Dashboard
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

        <motion.div
          className="relative max-w-4xl mx-auto px-6 text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Knowledge System
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.08] mb-6">
            Your mind,
            <br />
            <span className="text-gradient">amplified.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Capture insights, articles, and ideas in one place. Let AI summarize, tag, and surface knowledge when you need it most.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="h-12 px-8 text-base shadow-elevated">
                Start Building
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Read the Docs
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative pb-24">
        <motion.div
          className="max-w-5xl mx-auto px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="rounded-xl border border-border shadow-elevated overflow-hidden bg-card">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
              <span className="ml-3 text-xs text-muted-foreground font-medium">SecondBrain — Dashboard</span>
            </div>
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 rounded bg-muted" style={{ width: `${70 - i * 12}%` }} />
                    <div className="h-2 rounded bg-muted/60" style={{ width: `${90 - i * 8}%` }} />
                  </div>
                  <div className="flex gap-1.5">
                    <div className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-medium">tag</div>
                    <div className="px-2 py-0.5 rounded text-[10px] bg-ai-accent/10 text-ai-accent font-medium">AI</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Infrastructure for thought
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Everything you need to capture, organize, and amplify your knowledge.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="group p-6 rounded-xl bg-background border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <motion.div
          className="max-w-3xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Ready to build your second brain?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Start capturing knowledge and let AI do the heavy lifting.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="h-12 px-8 text-base shadow-elevated">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            <span>SecondBrain</span>
          </div>
          <div className="flex gap-6">
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
