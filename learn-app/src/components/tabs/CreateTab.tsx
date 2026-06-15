"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Image as ImageIcon,
  FileText,
  StickyNote,
  Mic,
  ScanLine,
  Sparkles,
  Check,
  Box,
  Network,
  Play,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { useAppState } from "@/state/AppState";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

type Stage = "idle" | "menu" | "scanning" | "draft";

const HOLD_MS = 800;

interface Source {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Source-type label shown on the generated draft. */
  sourceType: string;
}

const SOURCES: Source[] = [
  { id: "camera", label: "Camera", icon: Camera, sourceType: "Camera capture" },
  { id: "pdf", label: "Upload PDF", icon: FileText, sourceType: "PDF excerpt" },
  { id: "image", label: "Upload Image", icon: ImageIcon, sourceType: "Image" },
  { id: "notes", label: "Notes", icon: StickyNote, sourceType: "Notes" },
  { id: "audio", label: "Audio", icon: Mic, sourceType: "Audio clip" },
];

// The staged result — always the same draft, to sell the future workflow.
const DRAFT = {
  title: "Spinosaurus Skull Adaptations",
  keyIdeas: [
    "Long narrow skull",
    "Fish-catching adaptations",
    "Reconstruction uncertainty",
    "Evidence vs inference",
  ],
  suggestedObjectId: "spinosaurus",
  suggestedObjectLabel: "Spinosaurus",
};

export function CreateTab() {
  const { openLesson, saveToTree, isSaved } = useAppState();
  const [stage, setStage] = useState<Stage>("idle");
  const [holdProgress, setHoldProgress] = useState(0);
  const [selected, setSelected] = useState<Source | null>(null);

  const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearHold = useCallback(() => {
    if (holdTimer.current) {
      clearInterval(holdTimer.current);
      holdTimer.current = null;
    }
  }, []);

  // Press-and-hold ~800ms, filling the ring, then open the source sheet.
  const startHold = useCallback(() => {
    if (stage !== "idle") return;
    setHoldProgress(0);
    const start = Date.now();
    holdTimer.current = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / HOLD_MS) * 100);
      setHoldProgress(pct);
      if (pct >= 100) {
        clearHold();
        setHoldProgress(0);
        setStage("menu");
      }
    }, 16);
  }, [stage, clearHold]);

  const cancelHold = useCallback(() => {
    clearHold();
    setHoldProgress(0);
  }, [clearHold]);

  const pickSource = useCallback((source: Source) => {
    setSelected(source);
    setStage("scanning");
    setTimeout(() => setStage("draft"), 2200);
  }, []);

  const reset = () => {
    setStage("idle");
    setSelected(null);
    setHoldProgress(0);
  };

  const added = isSaved(DRAFT.suggestedObjectId);
  // idle and menu share the same backdrop view (the orb).
  const view = stage === "menu" ? "idle" : stage;

  // Friendly per-source icon tints for the upload cards.
  const sourceTints = [
    "bg-ds-primary/15 text-ds-primary",
    "bg-ds-secondary/15 text-ds-secondary",
    "bg-ds-info/15 text-ds-info",
    "bg-[#ffc857]/25 text-[#b5780c]",
    "bg-[#ff7a59]/15 text-[#d8492b]",
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-4 pt-4">
        <p className="text-xs uppercase tracking-wider text-ds-faint">Create</p>
        <h2 className="text-lg font-bold text-ds-text">
          Turn anything into a lesson
        </h2>
        <p className="mt-1 text-sm text-ds-muted">
          Hold to create. Staged demo — nothing is uploaded.
        </p>
      </div>

      {/* Content */}
      <div
        className={cn(
          "no-scrollbar flex flex-1 flex-col overflow-y-auto px-4 pb-4",
          view !== "draft" && "items-center justify-center"
        )}
      >
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="flex w-full flex-col items-center"
        >
          {/* IDLE — hold-to-create orb */}
          {view === "idle" && (
            <div className="flex flex-col items-center gap-5">
              <button
                onPointerDown={startHold}
                onPointerUp={cancelHold}
                onPointerLeave={cancelHold}
                className="ds-focus relative flex h-40 w-40 select-none items-center justify-center rounded-full"
                aria-label="Hold to create"
              >
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-ds-border)" strokeWidth="3" />
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="var(--color-ds-primary)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={289}
                    strokeDashoffset={289 - (289 * holdProgress) / 100}
                    style={{ transition: "stroke-dashoffset 16ms linear" }}
                  />
                </svg>
                <span
                  className={cn(
                    "flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-ds-primary to-[#8fdc7e] text-white shadow-ds-glow transition-transform duration-150",
                    holdProgress > 0 && "scale-95"
                  )}
                >
                  <Sparkles size={36} />
                </span>
              </button>
              <p className="text-sm font-medium text-ds-muted">
                {holdProgress > 0 ? "Keep holding…" : "Hold to create"}
              </p>
            </div>
          )}

          {/* SCANNING — analyzing animation */}
          {view === "scanning" && selected && (
            <div className="flex w-full flex-col items-center gap-4">
              <div className="relative h-44 w-full overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-primary/30 bg-ds-surface ds-grid-bg">
                <motion.div
                  initial={{ top: "0%" }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-12 bg-gradient-to-b from-transparent via-ds-primary/30 to-transparent"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <ScanLine size={30} className="text-ds-accent" />
                  <selected.icon size={18} className="text-ds-muted" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-ds-text">
                  Analyzing {selected.sourceType.toLowerCase()}…
                </p>
                <p className="text-xs text-ds-muted">
                  Extracting concepts · building lesson draft
                </p>
              </div>
            </div>
          )}

          {/* DRAFT — generated lesson draft */}
          {view === "draft" && selected && (
            <div className="w-full">
              <div className="rounded-[var(--radius-ds-lg)] border border-ds-primary/30 bg-ds-surface ds-glow">
                {/* Header */}
                <div className="flex items-center gap-2 border-b border-ds-border px-4 py-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ds-success/15 text-ds-success">
                    <Check size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-ds-faint">
                      Draft generated
                    </p>
                    <h3 className="truncate text-sm font-semibold text-ds-text">
                      {DRAFT.title}
                    </h3>
                  </div>
                  <Badge variant="secondary" className="ml-auto shrink-0">
                    {selected.sourceType}
                  </Badge>
                </div>

                <div className="space-y-4 px-4 py-4">
                  {/* Key ideas */}
                  <div>
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-ds-faint">
                      Key ideas
                    </p>
                    <ul className="space-y-1.5">
                      {DRAFT.keyIdeas.map((idea, i) => (
                        <li
                          key={idea}
                          className="flex items-center gap-2.5 rounded-[var(--radius-ds-sm)] border border-ds-border bg-ds-surface-2 px-3 py-2 text-sm text-ds-text"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ds-primary/15 text-[11px] font-semibold text-ds-accent">
                            {i + 1}
                          </span>
                          {idea}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggested 3D object */}
                  <div>
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-ds-faint">
                      Suggested 3D object
                    </p>
                    <div className="flex items-center gap-3 rounded-[var(--radius-ds-sm)] border border-ds-secondary/30 bg-ds-secondary/10 px-3 py-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-surface text-ds-secondary">
                        <Box size={18} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ds-text">
                          {DRAFT.suggestedObjectLabel}
                        </p>
                        <p className="text-[11px] text-ds-muted">
                          Interactive 3D model available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3 space-y-2">
                <Button
                  variant={added ? "secondary" : "primary"}
                  size="md"
                  disabled={added}
                  onClick={() => saveToTree(DRAFT.suggestedObjectId)}
                  className="w-full"
                >
                  {added ? <Check size={16} /> : <Network size={16} />}
                  {added ? "Added to Knowledge Tree" : "Add to Knowledge Tree"}
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="subtle"
                    size="md"
                    onClick={() => openLesson(DRAFT.suggestedObjectId)}
                    className="flex-1"
                  >
                    <Play size={16} />
                    Open in Learn
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={reset}
                    className="flex-1"
                  >
                    <Trash2 size={16} />
                    Discard
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom-sheet source menu */}
      <AnimatePresence>
        {stage === "menu" && (
          <>
            <motion.button
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={reset}
              aria-label="Close menu"
              className="absolute inset-0 z-20 bg-ds-text/40 backdrop-blur-sm"
            />
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="absolute inset-x-0 bottom-0 z-30 rounded-t-[var(--radius-ds-xl)] border-t border-ds-border bg-ds-surface p-4 shadow-ds"
            >
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-ds-border-strong" />
              <p className="mb-3 px-1 text-sm font-semibold text-ds-text">
                Choose a source
              </p>
              <div className="grid grid-cols-3 gap-2">
                {SOURCES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => pickSource(s)}
                    className="ds-focus flex flex-col items-center gap-2 rounded-[var(--radius-ds)] border border-ds-border bg-ds-surface-2 p-3 text-center transition-transform duration-150 hover:-translate-y-0.5 hover:border-ds-primary/40 active:scale-95"
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-full",
                        sourceTints[i % sourceTints.length]
                      )}
                    >
                      <s.icon size={20} />
                    </span>
                    <span className="text-xs font-medium leading-tight text-ds-text">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
