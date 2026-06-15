"use client";

import { Sprout, Lock, ChevronRight, Sparkles } from "lucide-react";
import { TREE_NODES, isNodeUnlocked, type TreeNode } from "@/data/tree";
import { useAppState } from "@/state/AppState";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

function NodeRow({
  node,
  unlocked,
  nextUnlocked,
  isLast,
  onOpen,
}: {
  node: TreeNode;
  unlocked: boolean;
  nextUnlocked: boolean;
  isLast: boolean;
  onOpen?: () => void;
}) {
  const interactive = unlocked && !!node.opensLessonId;

  const card = (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3
          className={cn(
            "text-sm font-semibold",
            unlocked ? "text-ds-text" : "text-ds-faint"
          )}
        >
          {node.label}
        </h3>
        {!unlocked && <Badge variant="neutral">Locked</Badge>}
        {interactive && (
          <span className="inline-flex shrink-0 items-center gap-0.5 text-[11px] font-semibold text-ds-accent">
            Open
            <ChevronRight size={13} />
          </span>
        )}
      </div>
      <p
        className={cn(
          "mt-0.5 text-xs",
          unlocked ? "text-ds-muted" : "text-ds-faint"
        )}
      >
        {node.detail}
      </p>
    </>
  );

  return (
    <li className="flex gap-3">
      {/* Growth spine: seed/leaf bubble + connecting stem */}
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all",
            unlocked
              ? "bg-gradient-to-br from-ds-primary to-[#8fdc7e] text-white shadow-[0_0_16px_rgba(32,199,201,0.35)]"
              : "border border-dashed border-ds-border-strong bg-ds-surface-2/50 text-ds-faint opacity-70"
          )}
        >
          {unlocked ? <Sprout size={18} /> : <Lock size={13} />}
        </span>
        {!isLast && (
          <span
            className={cn(
              "mt-1 w-1 flex-1 rounded-full",
              nextUnlocked
                ? "bg-gradient-to-b from-[#8fdc7e] to-ds-primary/30"
                : "bg-ds-border"
            )}
          />
        )}
      </div>

      {/* Node card */}
      <div className={cn("flex-1", isLast ? "" : "pb-3")}>
        {interactive ? (
          <button
            onClick={onOpen}
            className="ds-focus w-full rounded-[var(--radius-ds)] border border-ds-primary/30 bg-ds-surface px-3.5 py-2.5 text-left shadow-ds transition-transform duration-150 hover:-translate-y-0.5 hover:border-ds-primary/60 active:scale-[0.99]"
          >
            {card}
          </button>
        ) : (
          <div
            className={cn(
              "rounded-[var(--radius-ds)] border px-3.5 py-2.5",
              unlocked
                ? "border-ds-border bg-ds-surface shadow-ds"
                : "border-dashed border-ds-border bg-ds-surface-2/40 opacity-60"
            )}
          >
            {card}
          </div>
        )}
      </div>
    </li>
  );
}

export function TreeTab() {
  const { isSaved, openLesson } = useAppState();
  const saved = isSaved("spinosaurus");

  const unlockedCount = TREE_NODES.filter((n) => isNodeUnlocked(n, saved)).length;
  const total = TREE_NODES.length;

  return (
    <div className="no-scrollbar h-full overflow-y-auto p-4">
      {/* Header + growth progress */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wider text-ds-faint">Your map</p>
        <h2 className="text-lg font-bold text-ds-text">Knowledge Tree</h2>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-ds-surface-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8fdc7e] to-ds-primary transition-all duration-500"
              style={{ width: `${(unlockedCount / total) * 100}%` }}
            />
          </div>
          <span className="shrink-0 text-xs font-medium text-ds-muted">
            {unlockedCount} of {total} grown
          </span>
        </div>
      </div>

      {/* Growth map */}
      <ol>
        {TREE_NODES.map((node, i) => {
          const unlocked = isNodeUnlocked(node, saved);
          const next = TREE_NODES[i + 1];
          const nextUnlocked = next ? isNodeUnlocked(next, saved) : false;
          return (
            <NodeRow
              key={node.id}
              node={node}
              unlocked={unlocked}
              nextUnlocked={nextUnlocked}
              isLast={i === total - 1}
              onOpen={
                node.opensLessonId
                  ? () => openLesson(node.opensLessonId!)
                  : undefined
              }
            />
          );
        })}
      </ol>

      {!saved && (
        <div className="mt-2 flex items-start gap-2 rounded-[var(--radius-ds)] border border-ds-border bg-ds-surface-2 px-3 py-2.5 text-xs text-ds-muted">
          <Sparkles size={15} className="mt-0.5 shrink-0 text-ds-secondary" />
          <span>
            Save the Spinosaurus lesson from the Learn tab to grow{" "}
            <span className="font-semibold text-ds-text">Spinosauridae</span> and{" "}
            <span className="font-semibold text-ds-text">Spinosaurus</span>.
          </span>
        </div>
      )}
    </div>
  );
}
