"use client";

import {
  Tag,
  Layers,
  GitCompare,
  Clock,
  Ruler,
  Play,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type RailControl =
  | "labels"
  | "layers"
  | "compare"
  | "timeline"
  | "scale"
  | "animate";

const CONTROLS: { id: RailControl; label: string; icon: LucideIcon }[] = [
  { id: "labels", label: "Labels", icon: Tag },
  { id: "layers", label: "Layers", icon: Layers },
  { id: "compare", label: "Compare", icon: GitCompare },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "scale", label: "Scale", icon: Ruler },
  { id: "animate", label: "Animate", icon: Play },
];

/** id → icon, so other panels (e.g. the contextual mode panel) can reuse it. */
export const CONTROL_ICONS = Object.fromEntries(
  CONTROLS.map((c) => [c.id, c.icon])
) as Record<RailControl, LucideIcon>;

interface Props {
  active: Set<RailControl>;
  onToggle: (control: RailControl) => void;
}

export function ControlRail({ active, onToggle }: Props) {
  return (
    <div className="no-scrollbar flex items-stretch gap-1.5 overflow-x-auto px-1">
      {CONTROLS.map(({ id, label, icon: Icon }) => {
        const isOn = active.has(id);
        return (
          <button
            key={id}
            onClick={() => onToggle(id)}
            aria-pressed={isOn}
            className={cn(
              "ds-focus flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[var(--radius-ds-sm)] border px-1 py-2 transition duration-150 active:scale-95",
              isOn
                ? "border-ds-primary bg-ds-primary/15 text-ds-accent shadow-ds"
                : "border-ds-border bg-ds-surface-2 text-ds-muted hover:border-ds-border-strong hover:text-ds-text"
            )}
          >
            <Icon size={18} strokeWidth={2} />
            <span className="text-[11px] font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
