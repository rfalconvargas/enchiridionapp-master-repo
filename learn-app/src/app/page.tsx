import Link from "next/link";
import {
  ArrowRight,
  Box,
  GitCompare,
  Network,
  Home,
  Plus,
  MoreHorizontal,
  Sparkles,
  Check,
} from "lucide-react";
import { HeroCanvas } from "@/components/landing/HeroCanvas";
import { WaitlistButton } from "@/components/landing/WaitlistButton";
import { SkullHero } from "@/components/landing/SkullHero";
import { FeedbackButton } from "@/components/FeedbackButton";
import { SPINOSAURUS_LESSON } from "@/data/lessons";

// The three core product promises (clear, not generic).
const VALUE_PROPS = [
  {
    icon: Box,
    title: "Explore a 3D lesson",
    desc: "Orbit a real specimen and learn its anatomy hands-on, step by step.",
  },
  {
    icon: GitCompare,
    title: "Watch reconstructions change over time",
    desc: "Scrub from 1915 to 2026 and see how the science — and the model — evolved.",
  },
  {
    icon: Network,
    title: "Save discoveries to your Knowledge Tree",
    desc: "Every lesson you finish unlocks the next branch of your personal map.",
  },
];

// The five tabs of the /demo app.
const TABS = [
  { icon: Home, label: "Home", desc: "Browse 3D topics" },
  { icon: Box, label: "Learn", desc: "Orbit the model" },
  { icon: Plus, label: "Create", desc: "Turn anything into a lesson" },
  { icon: Network, label: "Tree", desc: "Grow your Knowledge Tree" },
  { icon: MoreHorizontal, label: "More", desc: "Profile & goals" },
];

export default function LandingPage() {
  const lessonSteps = SPINOSAURUS_LESSON.lessonSteps.slice(0, 4);

  return (
    <>
      {/* Cinematic skull hero (preserved from enchiridion.ailiur.com) */}
      <SkullHero />

      {/* Continuation: the friendly, app-focused landing */}
      <main className="ench-aurora relative overflow-hidden">
        {/* Subtle topographic dot texture — soft background detail only */}
        <div className="ench-dots pointer-events-none absolute inset-0 opacity-70" />

        <div className="relative mx-auto flex max-w-5xl flex-col px-6 pb-4 pt-12">
          {/* Bridge from the cinematic hero into the app pitch */}
          <div className="mb-3 flex items-center gap-2 text-ds-secondary">
            <span className="h-px w-8 bg-ds-border-strong" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
              The interactive app
            </span>
          </div>

        {/* Hero */}
        <section className="grid items-center gap-8 pb-10 pt-6 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ds-primary/30 bg-ds-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-ds-accent">
              <Sparkles size={12} />
              First lesson: Spinosaurus
            </span>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-ds-text sm:text-5xl">
              Learn complex things in{" "}
              <span className="text-ds-primary">three dimensions.</span>
            </h1>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-ds-muted">
              Enchiridion is a 3D-first learning app for prehistory and other
              visually complex topics. Explore a lesson, watch a reconstruction
              change over time, and build your own Knowledge Tree.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/demo" className="ds-focus ench-cta">
                Launch demo
                <ArrowRight size={16} />
              </Link>
              <WaitlistButton variant="outline" />
            </div>
            <p className="mt-3 text-xs text-ds-faint">
              No sign-up · runs in your browser
            </p>
          </div>

          {/* 3D flourish */}
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute inset-0 rounded-[var(--radius-ds-xl)] border border-ds-primary/20 bg-gradient-to-br from-white to-[#e3f8f1] ds-glow" />
            <div className="absolute inset-0">
              <HeroCanvas />
            </div>
          </div>
        </section>

        {/* Value props — the clear product promises */}
        <section className="grid grid-cols-1 gap-3 py-8 sm:grid-cols-3">
          {VALUE_PROPS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="ench-card ench-card-interactive p-4"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-secondary/15 text-ds-secondary">
                <Icon size={18} />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-ds-text">{title}</h3>
              <p className="mt-1 text-pretty text-xs leading-relaxed text-ds-muted">
                {desc}
              </p>
            </div>
          ))}
        </section>

        {/* Demo preview — the five app tabs */}
        <section className="py-10">
          <h2 className="text-balance text-xl font-bold text-ds-text">
            One app, five tabs
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
            {TABS.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-[var(--radius-ds)] border border-ds-border bg-ds-surface p-3 text-center shadow-ds"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ds-primary/10 text-ds-accent">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-ds-text">{label}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-ds-faint">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The first lesson: Spinosaurus */}
        <section className="py-10">
          <div className="overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-primary/30 bg-ds-surface ds-glow">
            <div className="relative h-28 ds-grid-bg">
              <div className="absolute inset-0 bg-gradient-to-br from-ds-primary/25 via-ds-secondary/15 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <p className="text-[11px] uppercase tracking-wider text-ds-accent">
                  The first lesson
                </p>
                <h2 className="text-2xl font-bold text-ds-text">Spinosaurus</h2>
                <p className="font-mono text-xs italic text-ds-muted">
                  {SPINOSAURUS_LESSON.scientificName}
                </p>
              </div>
            </div>
            <div className="grid gap-4 p-4 sm:grid-cols-2">
              <div>
                <p className="text-pretty text-sm leading-relaxed text-ds-muted">
                  {SPINOSAURUS_LESSON.summary}
                </p>
                <Link href="/demo" className="ds-focus ench-cta mt-4">
                  Start the lesson
                  <ArrowRight size={16} />
                </Link>
              </div>
              <ul className="space-y-2">
                {lessonSteps.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center gap-2.5 text-sm text-ds-text"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ds-primary/15 text-ds-accent">
                      <Check size={12} />
                    </span>
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="flex flex-col items-center gap-4 py-16 text-center">
          <h2 className="text-balance text-2xl font-bold text-ds-text">
            See it in three dimensions.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/demo" className="ds-focus ench-cta">
              Launch demo
              <ArrowRight size={16} />
            </Link>
            <WaitlistButton variant="outline" />
            <FeedbackButton variant="outline" />
          </div>
          <p className="text-xs text-ds-faint">
            Tried the demo? Your feedback shapes what we build next.
          </p>
        </section>
        </div>
      </main>
    </>
  );
}
