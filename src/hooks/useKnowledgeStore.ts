import { useState, useCallback } from "react";

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: "note" | "link" | "insight";
  tags: string[];
  sourceUrl?: string;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SAMPLE_ITEMS: KnowledgeItem[] = [
  {
    id: "1",
    title: "React Server Components Deep Dive",
    content: "Server Components allow rendering on the server without sending JavaScript to the client. This fundamentally changes how we think about component architecture, enabling better performance and simpler data fetching patterns.",
    type: "note",
    tags: ["react", "architecture", "performance"],
    summary: "RSC enables server-side rendering without client JS, improving performance and simplifying data fetching.",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "2",
    title: "The Architecture of Open Source Applications",
    content: "https://aosabook.org/en/ — A comprehensive resource on how real-world open source projects are structured. Essential reading for understanding software architecture patterns.",
    type: "link",
    tags: ["architecture", "open-source", "reading"],
    sourceUrl: "https://aosabook.org/en/",
    summary: "Curated collection of architectural case studies from successful open source projects.",
    createdAt: new Date("2024-03-08"),
    updatedAt: new Date("2024-03-09"),
  },
  {
    id: "3",
    title: "Knowledge graphs outperform vector search for contextual retrieval",
    content: "After testing both approaches extensively, knowledge graphs with proper ontology design consistently provide more contextually relevant results than pure vector similarity search, especially for domain-specific queries.",
    type: "insight",
    tags: ["ai", "knowledge-graphs", "search"],
    summary: "Knowledge graphs beat vector search for domain-specific contextual retrieval tasks.",
    createdAt: new Date("2024-03-12"),
    updatedAt: new Date("2024-03-12"),
  },
  {
    id: "4",
    title: "PostgreSQL indexing strategies for time-series data",
    content: "BRIN indexes are dramatically more efficient than B-tree for time-series data. Combined with table partitioning by time range, query performance improved 40x on our analytics pipeline.",
    type: "note",
    tags: ["postgresql", "databases", "performance"],
    summary: "BRIN indexes + time-range partitioning yield 40x query improvement for time-series data.",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05"),
  },
  {
    id: "5",
    title: "Design Systems at Scale — Lessons from Figma",
    content: "https://www.figma.com/blog/design-systems/ — Key takeaway: successful design systems are products, not projects. They need dedicated teams, versioning, and adoption metrics.",
    type: "link",
    tags: ["design", "systems", "figma"],
    sourceUrl: "https://www.figma.com/blog/design-systems/",
    summary: "Design systems succeed when treated as products with dedicated teams and adoption tracking.",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-02"),
  },
  {
    id: "6",
    title: "LLM context windows are a leaky abstraction",
    content: "While models advertise 128K+ context windows, effective retrieval degrades significantly past ~16K tokens. The 'lost in the middle' problem persists. Better to chunk and retrieve strategically than to stuff context.",
    type: "insight",
    tags: ["ai", "llm", "architecture"],
    summary: "LLM context quality degrades past ~16K tokens; strategic chunking outperforms context stuffing.",
    createdAt: new Date("2024-03-14"),
    updatedAt: new Date("2024-03-14"),
  },
];

export function useKnowledgeStore() {
  const [items, setItems] = useState<KnowledgeItem[]>(SAMPLE_ITEMS);

  const addItem = useCallback((item: Omit<KnowledgeItem, "id" | "createdAt" | "updatedAt">) => {
    const newItem: KnowledgeItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setItems((prev) => [newItem, ...prev]);
    return newItem;
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<KnowledgeItem>) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updates, updatedAt: new Date() } : item
      )
    );
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { items, addItem, updateItem, deleteItem };
}
