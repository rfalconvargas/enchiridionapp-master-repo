"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Play,
  ChevronRight,
  Clock,
  BarChart3,
  Layers,
  Sparkles,
  Compass,
} from "lucide-react";
import {
  TOPICS,
  BROWSE_CATEGORIES,
  categoryLabel,
  type Topic,
  type CategoryId,
} from "@/data/topics";
import { useAppState } from "@/state/AppState";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

/** Shared metadata strip: category · difficulty · time. */
function MetaRow({ topic, muted }: { topic: Topic; muted?: boolean }) {
  const tone = muted ? "text-ds-faint" : "text-ds-muted";
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]", tone)}>
      <span className="inline-flex items-center gap-1">
        <Layers size={12} className="text-ds-secondary" />
        {categoryLabel(topic.category)}
      </span>
      <span className="inline-flex items-center gap-1">
        <BarChart3 size={12} className="text-ds-secondary" />
        {topic.difficulty}
      </span>
      <span className="inline-flex items-center gap-1">
        <Clock size={12} className="text-ds-secondary" />
        {topic.estimatedMinutes} min
      </span>
    </div>
  );
}

/** The hero card — the active lesson, given clear visual weight. */
function FeaturedCard({ topic }: { topic: Topic }) {
  const { openLesson } = useAppState();
  return (
    <article className="overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-primary/30 bg-ds-surface ds-glow">
      {/* Hero band */}
      <div className="relative h-36 overflow-hidden">
        <div className={cn("absolute inset-0 bg-gradient-to-br", topic.gradient)} />
        <div className="absolute inset-0 ds-grid-bg opacity-50" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Badge variant="primary">
            <Sparkles size={11} />
            Lesson ready
          </Badge>
        </div>
        <span className="absolute bottom-3 right-4 font-mono text-[11px] text-ds-muted">
          {topic.clade}
        </span>
        <h2 className="absolute bottom-3 left-4 text-3xl font-bold leading-none text-ds-text">
          {topic.commonName}
        </h2>
      </div>

      {/* Body */}
      <div className="space-y-3 p-4">
        <div>
          <p className="font-mono text-xs italic text-ds-muted">
            {topic.scientificName}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ds-text">
            {topic.hook}
          </p>
        </div>

        <MetaRow topic={topic} />

        <button
          onClick={() => openLesson(topic.id)}
          className="ds-focus flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-ds)] bg-ds-primary py-3 text-sm font-semibold text-ds-on-primary shadow-ds-glow transition duration-150 hover:bg-ds-accent active:scale-[0.98]"
        >
          <Play size={16} />
          Start Lesson
          <ChevronRight size={16} />
        </button>
      </div>
    </article>
  );
}

/** Coming-soon card — intentionally quieter than the featured card. */
function CompactCard({ topic }: { topic: Topic }) {
  return (
    <article className="rounded-[var(--radius-ds)] border border-ds-border bg-ds-surface-2/60 p-3.5 opacity-80">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-ds-muted">
            {topic.commonName}
          </h3>
          <p className="mt-0.5 truncate text-xs text-ds-faint">{topic.hook}</p>
        </div>
        <Badge variant="neutral" className="shrink-0">
          Coming soon
        </Badge>
      </div>

      <div className="mt-2.5">
        <MetaRow topic={topic} muted />
      </div>

      <button
        disabled
        className="mt-3 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-[var(--radius-ds-sm)] border border-ds-border bg-ds-surface py-2 text-xs font-medium text-ds-faint"
      >
        Start Lesson
      </button>
    </article>
  );
}

function EmptyState({ label, query }: { label: string; query: string }) {
  const searching = query.trim().length > 0;
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-[var(--radius-ds-lg)] border border-dashed border-ds-border bg-ds-surface/50 px-6 py-14 text-center">
      <Compass size={26} className="text-ds-faint" />
      <p className="text-sm font-medium text-ds-muted">
        {searching ? "No topics match your search" : "No lessons here yet"}
      </p>
      <p className="max-w-[30ch] text-xs text-ds-faint">
        {searching
          ? `Nothing matches “${query.trim()}”. Try a different term.`
          : `${label} topics are on the way. For now, explore Prehistoric Life.`}
      </p>
    </div>
  );
}

export function HomeTab() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId>("prehistoric-life");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOPICS.filter((t) => t.category === category).filter((t) => {
      if (!q) return true;
      return [t.commonName, t.scientificName, t.hook, t.clade].some((s) =>
        s.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const featured = filtered.filter((t) => t.status === "active");
  const comingSoon = filtered.filter((t) => t.status === "coming-soon");

  return (
    <div className="flex h-full flex-col">
      {/* Fixed header: search + filter chips */}
      <div className="shrink-0 space-y-2.5 border-b border-ds-border px-3 pb-3 pt-3">
        <div className="flex items-center gap-2 rounded-[var(--radius-ds)] border border-ds-border bg-ds-surface-3 px-3 py-2.5">
          <Search size={16} className="text-ds-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics…"
            aria-label="Search topics"
            className="w-full bg-transparent text-sm text-ds-text placeholder:text-ds-faint focus:outline-none"
          />
        </div>

        <div className="no-scrollbar -mx-3 flex gap-2 overflow-x-auto px-3">
          {BROWSE_CATEGORIES.map((c) => {
            const isActive = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                aria-pressed={isActive}
                className={cn(
                  "ds-focus shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition duration-150 active:scale-95",
                  isActive
                    ? "border-ds-primary/50 bg-ds-primary/15 text-ds-accent"
                    : "border-ds-border bg-ds-surface-2 text-ds-muted hover:border-ds-border-strong hover:text-ds-text"
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Calm vertical feed */}
      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto p-3">
        {filtered.length === 0 ? (
          <EmptyState label={categoryLabel(category)} query={query} />
        ) : (
          <>
            {featured.map((t) => (
              <FeaturedCard key={t.id} topic={t} />
            ))}

            {comingSoon.length > 0 && (
              <>
                <p className="px-1 pt-1 text-[11px] font-medium uppercase tracking-wider text-ds-faint">
                  More topics
                </p>
                {comingSoon.map((t) => (
                  <CompactCard key={t.id} topic={t} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
