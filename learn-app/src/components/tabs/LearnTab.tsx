"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FlaskConical,
  Quote,
  Check,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  getLessonById,
  SPINOSAURUS_LESSON,
  EVIDENCE_GROUPS,
  type EvidenceConfidence,
} from "@/data/lessons";
import { useAppState } from "@/state/AppState";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import {
  ControlRail,
  CONTROL_ICONS,
  type RailControl,
} from "@/components/three/ControlRail";
import { ModePanel } from "@/components/three/ModePanel";

// Floating anatomical labels overlaid on the viewport when Labels mode is on.
const FLOATING_LABELS: {
  label: string;
  style: React.CSSProperties;
}[] = [
  { label: "Sail", style: { top: "14%", left: "15%" } },
  { label: "Skull", style: { top: "27%", right: "11%" } },
  { label: "Forelimbs", style: { bottom: "19%", left: "33%" } },
];

// three.js must never SSR — load the Canvas only on the client.
const ModelViewer = dynamic(() => import("@/components/three/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-xs uppercase tracking-wider text-ds-faint">
      Initializing viewport…
    </div>
  ),
});

// Evidence colour coding — Known = Leaf Green, Inferred = Dino Cyan,
// Debated = Amber Fossil.
const evidenceTabActive: Record<EvidenceConfidence, string> = {
  known: "bg-ds-success/15 text-ds-success",
  inferred: "bg-ds-info/15 text-ds-info",
  debated: "bg-ds-warning/15 text-ds-warning",
};
const evidenceDot: Record<EvidenceConfidence, string> = {
  known: "bg-ds-success",
  inferred: "bg-ds-info",
  debated: "bg-ds-warning",
};

export function LearnTab() {
  const { activeTopicId, saveToTree, isSaved } = useAppState();
  const lesson = getLessonById(activeTopicId) ?? SPINOSAURUS_LESSON;

  const [stepIndex, setStepIndex] = useState(0);
  const [active, setActive] = useState<Set<RailControl>>(
    () =>
      new Set<RailControl>(
        lesson.controls.filter((c) => c.defaultOn).map((c) => c.id)
      )
  );
  // The control whose explanation is shown in the contextual panel.
  const [focusedControl, setFocusedControl] = useState<RailControl>("animate");
  const [evidenceTab, setEvidenceTab] = useState<EvidenceConfidence>("known");
  const [resetSignal, setResetSignal] = useState(0);

  const step = lesson.lessonSteps[stepIndex];
  const saved = isSaved(lesson.id);

  const controlsById = useMemo(
    () => new Map(lesson.controls.map((c) => [c.id, c])),
    [lesson]
  );
  const citationIndex = useMemo(
    () => new Map(lesson.citations.map((c, i) => [c.id, i + 1])),
    [lesson]
  );

  // Tapping any control toggles its state AND focuses the contextual panel.
  const handleControl = (c: RailControl) => {
    setFocusedControl(c);
    setActive((prev) => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });
  };

  const focused = controlsById.get(focusedControl);
  const FocusedIcon = CONTROL_ICONS[focusedControl];
  const focusedOn = active.has(focusedControl);

  const groupMeta = EVIDENCE_GROUPS.find((g) => g.id === evidenceTab)!;
  const tabClaims = lesson.evidenceClaims.filter(
    (c) => c.confidence === evidenceTab
  );

  const highlighted = step.highlightControl;
  const showHighlightChip =
    highlighted && !active.has(highlighted) && highlighted !== "animate";

  return (
    <div className="flex h-full flex-col">
      {/* Viewport — bright "display case" stage framed by light UI */}
      <div className="ench-stage relative h-[42%] min-h-[260px] shrink-0 overflow-hidden border-b border-ds-border">
        <ModelViewer
          modelUrl={lesson.modelUrl}
          autoRotate={active.has("animate")}
          showLabels={false}
          hotspots={[]}
          scale={1}
          resetSignal={resetSignal}
        />

        <div className="pointer-events-none absolute left-3 top-3">
          <Badge variant="primary">{lesson.category}</Badge>
        </div>

        <Button
          size="sm"
          variant="subtle"
          onClick={() => setResetSignal((n) => n + 1)}
          className="absolute right-3 top-3 backdrop-blur"
        >
          <RotateCcw size={14} />
          Reset
        </Button>

        {/* Labels mode — floating anatomical markers over the viewer */}
        <AnimatePresence>
          {active.has("labels") &&
            FLOATING_LABELS.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                style={l.style}
                className="pointer-events-none absolute z-10 flex items-center gap-1.5 rounded-full border border-ds-primary/40 bg-ds-bg/80 px-2.5 py-1 text-[11px] font-medium text-ds-accent backdrop-blur"
              >
                <span className="h-2 w-2 rounded-full bg-ds-primary shadow-[0_0_0_3px_rgba(6,182,212,0.25)]" />
                {l.label}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Scrollable lesson stack */}
      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto p-3">
        {/* 1 — Lesson title + scientific name */}
        <header className="px-1">
          <h2 className="text-xl font-bold leading-tight text-ds-text">
            {lesson.title}
          </h2>
          <p className="font-mono text-xs italic text-ds-muted">
            {lesson.scientificName}
          </p>
          <p className="mt-1 text-sm text-ds-muted">{lesson.subtitle}</p>
        </header>

        {/* 5 — Control rail */}
        <ControlRail active={active} onToggle={handleControl} />

        {/* 6 — Contextual panel explaining the focused control */}
        <Panel
          eyebrow="Viewer mode"
          title={focused?.label ?? "Controls"}
          icon={<FocusedIcon size={16} />}
          actions={
            <Badge variant={focusedOn ? "primary" : "neutral"}>
              {focusedOn ? "On" : "Off"}
            </Badge>
          }
        >
          <p className="text-sm leading-relaxed text-ds-muted">
            {focused?.description}
          </p>

          {focusedOn ? (
            <div className="mt-3 border-t border-ds-border pt-3">
              <motion.div
                key={focusedControl}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <ModePanel control={focusedControl} />
              </motion.div>
            </div>
          ) : (
            <p className="mt-3 text-xs text-ds-faint">
              Tap {focused?.label} in the rail to enable this mode.
            </p>
          )}
        </Panel>

        {/* 3 + 4 — Step panel with progress + Next/Back */}
        <Panel
          eyebrow={`Step ${stepIndex + 1} of ${lesson.lessonSteps.length}`}
          title={step.title}
          icon={<BookOpen size={16} />}
        >
          <p className="text-sm leading-relaxed text-ds-muted">{step.body}</p>

          {showHighlightChip && (
            <button
              onClick={() => handleControl(highlighted!)}
              className="ds-focus mt-3 inline-flex items-center gap-1.5 rounded-full border border-ds-primary/30 bg-ds-primary/10 px-3 py-1 text-[11px] font-medium text-ds-accent transition-colors hover:bg-ds-primary/20"
            >
              <Sparkles size={12} />
              Try: {controlsById.get(highlighted!)?.label}
            </button>
          )}

          <div className="mt-4 flex items-center gap-1.5">
            {lesson.lessonSteps.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Go to step ${i + 1}: ${s.title}`}
                aria-current={i === stepIndex ? "step" : undefined}
                onClick={() => setStepIndex(i)}
                className="ds-focus group flex h-6 items-center rounded-full px-0.5"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    i === stepIndex
                      ? "w-6 bg-ds-primary"
                      : "w-1.5 bg-ds-border-strong group-hover:bg-ds-faint"
                  )}
                />
              </button>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <Button
              variant="subtle"
              size="sm"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              className="flex-1"
            >
              <ChevronLeft size={16} />
              Back
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={stepIndex === lesson.lessonSteps.length - 1}
              onClick={() =>
                setStepIndex((i) =>
                  Math.min(lesson.lessonSteps.length - 1, i + 1)
                )
              }
              className="flex-1"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        </Panel>

        {/* 7 — Evidence panel with Known / Inferred / Debated tabs */}
        <Panel
          eyebrow="Evidence"
          title="What we know vs. what's debated"
          icon={<FlaskConical size={16} />}
        >
          {/* Tab bar */}
          <div
            role="tablist"
            aria-label="Evidence confidence"
            className="flex gap-1 rounded-[var(--radius-ds-sm)] border border-ds-border bg-ds-surface-2 p-1"
          >
            {EVIDENCE_GROUPS.map((g) => {
              const isActive = evidenceTab === g.id;
              const count = lesson.evidenceClaims.filter(
                (c) => c.confidence === g.id
              ).length;
              return (
                <button
                  key={g.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setEvidenceTab(g.id)}
                  className={cn(
                    "ds-focus flex-1 rounded-[var(--radius-ds-sm)] px-2 py-1.5 text-xs font-medium transition-colors duration-150",
                    isActive
                      ? evidenceTabActive[g.id]
                      : "text-ds-muted hover:text-ds-text"
                  )}
                >
                  {g.label}{" "}
                  <span className="opacity-60">{count}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-2.5 text-[11px] text-ds-faint">{groupMeta.blurb}</p>

          <ul className="mt-1.5 space-y-1.5">
            {tabClaims.map((c) => (
              <li
                key={c.id}
                className="flex items-start gap-2.5 rounded-[var(--radius-ds)] border border-ds-border bg-ds-surface px-3 py-2.5 shadow-ds"
              >
                <span
                  className={cn(
                    "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                    evidenceDot[c.confidence]
                  )}
                />
                <p className="flex-1 text-sm text-ds-text">{c.claim}</p>
                <div className="mt-0.5 flex shrink-0 gap-1">
                  {c.citationIds.map((id) => (
                    <span
                      key={id}
                      title={`See citation ${citationIndex.get(id)}`}
                      className="flex h-4 min-w-4 items-center justify-center rounded bg-ds-surface-3 px-1 font-mono text-[10px] text-ds-muted"
                    >
                      {citationIndex.get(id)}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Citations — the references the evidence chips point to */}
        <Panel eyebrow="References" title="Citations" icon={<Quote size={16} />}>
          <ol className="space-y-2.5">
            {lesson.citations.map((c, i) => (
              <li key={c.id} className="flex gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-ds-surface-3 font-mono text-[11px] text-ds-muted">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-ds-text">
                    {c.authors} ({c.year}). {c.title}.
                  </p>
                  <p className="font-mono text-[11px] text-ds-faint">
                    {c.source}
                  </p>
                </div>
                {c.placeholder && (
                  <Badge
                    variant="neutral"
                    className="ml-auto shrink-0 self-start"
                  >
                    placeholder
                  </Badge>
                )}
              </li>
            ))}
          </ol>
        </Panel>

        {/* 8 — Save to Knowledge Tree */}
        <Button
          variant={saved ? "secondary" : "primary"}
          size="lg"
          disabled={saved}
          onClick={() => saveToTree(lesson.id)}
          className="w-full"
        >
          {saved ? (
            <>
              <Check size={18} />
              Saved to Knowledge Tree
            </>
          ) : (
            <>
              <Plus size={18} />
              Save to Knowledge Tree
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
