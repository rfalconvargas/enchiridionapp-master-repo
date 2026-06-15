"use client";

import { useState } from "react";
import { ArrowLeftRight, Info, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import type { RailControl } from "./ControlRail";

// ---------------------------------------------------------------------------
// Simulated mode data (UI state only — see each mode's note)
// ---------------------------------------------------------------------------

const LAYERS = [
  { id: "fossil", label: "Fossil", desc: "The preserved bones as actually found — fragmentary, scattered, and distorted by time." },
  { id: "skeleton", label: "Skeleton", desc: "A reconstructed full skeleton, with gaps filled in from closely related spinosaurids." },
  { id: "body", label: "Body", desc: "Muscle, skin, and proportions wrapped over the skeleton — the living animal." },
  { id: "soft", label: "Speculative Soft Tissue", desc: "Display structures, colour, and fat that almost never fossilise — our best informed guess." },
] as const;

const RECONSTRUCTIONS = [
  { year: 1915, note: "Stromer's original: an upright, bipedal predator that dragged its tail along the ground." },
  { year: 2014, note: "Ibrahim et al.: short hindlimbs and a low, semiaquatic, near-quadrupedal body." },
  { year: 2020, note: "A tall, fin-like tail recast Spinosaurus as an active, tail-propelled swimmer." },
  { year: 2026, note: "Latest synthesis: refined skull, display crest, and revised aquatic proportions." },
] as const;

const SCALE_REFS = [
  { id: "human", label: "Human", note: "A 1.8 m human stands roughly knee-high to Spinosaurus." },
  { id: "croc", label: "Crocodile", note: "About three large saltwater crocodiles laid end to end." },
  { id: "trex", label: "T. rex", note: "Longer than Tyrannosaurus (~12 m) by around 3 metres." },
  { id: "bus", label: "School bus", note: "Roughly the length of a standard school bus (~14 m)." },
] as const;

const ANIMATIONS = [
  { id: "idle", label: "Idle", note: "Resting stance, weight balanced over the hips." },
  { id: "walk", label: "Walk", note: "A slow shoreline gait with a low-slung posture." },
  { id: "jaw", label: "Jaw open", note: "Gape display showing the conical, fish-catching teeth." },
  { id: "swim", label: "Swim hypothesis", note: "Tail-driven undulation — the contested aquatic motion." },
] as const;

const LABELS = ["Skull", "Sail", "Forelimbs"] as const;

// ---------------------------------------------------------------------------
// Small shared building blocks
// ---------------------------------------------------------------------------

function ModeNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2.5 flex items-start gap-1.5 text-xs leading-relaxed text-ds-muted">
      <Info size={13} className="mt-0.5 shrink-0 text-ds-faint" />
      <span>{children}</span>
    </p>
  );
}

function chip(isActive: boolean) {
  return cn(
    "ds-focus rounded-[var(--radius-ds-sm)] border px-3 py-2 text-xs font-medium transition-colors duration-150",
    isActive
      ? "border-ds-primary/50 bg-ds-primary/15 text-ds-accent"
      : "border-ds-border bg-ds-surface-2 text-ds-muted hover:border-ds-border-strong hover:text-ds-text"
  );
}

// ---------------------------------------------------------------------------
// ModePanel — renders the interactive UI for the focused control.
// Selection state lives here; it persists while the panel stays mounted.
// ---------------------------------------------------------------------------

export function ModePanel({ control }: { control: RailControl }) {
  const [layer, setLayer] = useState<string>("fossil");
  const [year, setYear] = useState<number>(2026);
  const [scaleRef, setScaleRef] = useState<string>("human");
  const [anim, setAnim] = useState<string>("idle");

  switch (control) {
    case "labels":
      return (
        <div>
          <div className="flex flex-wrap gap-1.5">
            {LABELS.map((l) => (
              <span
                key={l}
                className="inline-flex items-center gap-1.5 rounded-full border border-ds-primary/30 bg-ds-primary/10 px-2.5 py-1 text-[11px] font-medium text-ds-accent"
              >
                <MapPin size={11} />
                {l}
              </span>
            ))}
          </div>
          <ModeNote>
            Three anatomical markers are pinned around the model in the viewport.
          </ModeNote>
        </div>
      );

    case "layers": {
      const current = LAYERS.find((l) => l.id === layer)!;
      return (
        <div>
          <div className="grid grid-cols-2 gap-1.5">
            {LAYERS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLayer(l.id)}
                className={chip(layer === l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <ModeNote>{current.desc}</ModeNote>
        </div>
      );
    }

    case "compare":
      return (
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-[var(--radius-ds-sm)] border border-ds-border bg-ds-surface-2 p-3">
              <p className="text-[11px] uppercase tracking-wider text-ds-faint">
                Older
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ds-text">1915</p>
              <p className="mt-1 text-xs text-ds-muted">
                Upright, bipedal, tail on the ground.
              </p>
            </div>
            <div className="rounded-[var(--radius-ds-sm)] border border-ds-primary/30 bg-ds-primary/5 p-3">
              <p className="text-[11px] uppercase tracking-wider text-ds-accent">
                Current
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ds-text">2026</p>
              <p className="mt-1 text-xs text-ds-muted">
                Low-slung, semiaquatic, fin-like tail.
              </p>
            </div>
          </div>
          <ModeNote>
            Scientific reconstructions change as evidence changes — every version
            is a snapshot of the best data at the time.
          </ModeNote>
        </div>
      );

    case "timeline": {
      const current = RECONSTRUCTIONS.find((r) => r.year === year)!;
      return (
        <div>
          <div className="relative px-1">
            <div className="absolute left-3 right-3 top-[6px] h-px bg-ds-border" />
            <div className="relative flex justify-between">
              {RECONSTRUCTIONS.map((r) => {
                const isActive = r.year === year;
                return (
                  <button
                    key={r.year}
                    onClick={() => setYear(r.year)}
                    className="ds-focus flex flex-col items-center gap-1.5"
                    aria-pressed={isActive}
                  >
                    <span
                      className={cn(
                        "h-3 w-3 rounded-full border-2 transition-colors duration-150",
                        isActive
                          ? "border-ds-primary bg-ds-primary"
                          : "border-ds-border-strong bg-ds-surface"
                      )}
                    />
                    <span
                      className={cn(
                        "text-[11px] font-medium transition-colors",
                        isActive ? "text-ds-accent" : "text-ds-muted"
                      )}
                    >
                      {r.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <ModeNote>{current.note}</ModeNote>
        </div>
      );
    }

    case "scale": {
      const current = SCALE_REFS.find((s) => s.id === scaleRef)!;
      return (
        <div>
          <div className="flex flex-wrap gap-1.5">
            {SCALE_REFS.map((s) => (
              <button
                key={s.id}
                onClick={() => setScaleRef(s.id)}
                className={chip(scaleRef === s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <ModeNote>{current.note}</ModeNote>
        </div>
      );
    }

    case "animate": {
      const current = ANIMATIONS.find((a) => a.id === anim)!;
      return (
        <div>
          <div className="grid grid-cols-2 gap-1.5">
            {ANIMATIONS.map((a) => (
              <button
                key={a.id}
                onClick={() => setAnim(a.id)}
                className={chip(anim === a.id)}
              >
                {a.label}
              </button>
            ))}
          </div>
          <ModeNote>{current.note}</ModeNote>
          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-ds-faint">
            <ArrowLeftRight size={11} />
            Simulated — this model has no baked animation clips yet.
          </p>
        </div>
      );
    }

    default:
      return null;
  }
}
