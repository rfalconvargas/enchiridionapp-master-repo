import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ListChecks,
  Route,
  BookOpen,
  PenLine,
  Flame,
  FolderGit2,
  Layers,
  Trophy,
  Boxes,
  Music,
  Code2,
  Microscope,
  Film,
  Share2,
  Briefcase,
  NotebookPen,
  Compass,
} from "lucide-react";
import { SkullHero } from "@/components/landing/SkullHero";
import { ChannelBand } from "@/components/landing/ChannelBand";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Reveal } from "@/components/landing/Reveal";
import { WaitlistButton } from "@/components/landing/WaitlistButton";
import { FeedbackButton } from "@/components/FeedbackButton";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";

/* The core loop — eight steps from "I want to learn this" to "I made this." */
const HOW_IT_WORKS = [
  {
    icon: ListChecks,
    label: "Answer eight questions",
    desc: "Your Life Journeymap: what you want to build, and how good you need to get.",
  },
  {
    icon: Route,
    label: "Get a real path",
    desc: "Four weeks, three sessions a week, college-level and beyond — built for your goal.",
  },
  {
    icon: BookOpen,
    label: "Open a session",
    desc: "Specific resources, real depth, and one concrete thing to make before you close it.",
  },
  {
    icon: PenLine,
    label: "Take notes that stay",
    desc: "Everything you write lives in the session and carries into the next one.",
  },
  {
    icon: Flame,
    label: "Mark it done, keep the streak",
    desc: "Visible progress, and a reason to come back tomorrow.",
  },
  {
    icon: FolderGit2,
    label: "Connect it to real work",
    desc: "Point Enchiridion at your project folder so sessions track what you’re building.",
  },
  {
    icon: Layers,
    label: "Go deeper when you’re ready",
    desc: "Paths extend as far as the work goes. Nothing cuts off at “intro.”",
  },
  {
    icon: Trophy,
    label: "Finish with something real",
    desc: "A model, a track, a video, a shipped tool. Proof, not a certificate.",
  },
];

/* What you can point the engine at. */
const MODULES = [
  { icon: Boxes, title: "3D & Animation", desc: "Blender, rigging, paleoart, motion." },
  { icon: Music, title: "Music & Sound", desc: "Production, scoring, sound design." },
  { icon: Code2, title: "Software", desc: "Full-stack, shipping real tools." },
  {
    icon: Microscope,
    title: "Science, deep",
    desc: "Read the primary literature with ease.",
  },
];

/* Small, concrete wins — the kinds of doors the app opens. */
const OUTCOMES = [
  {
    icon: Boxes,
    title: "A rig that actually sells",
    desc: "Learn Blender rigging to a level that holds up, list the model, and watch a stranger pay for it.",
  },
  {
    icon: Film,
    title: "A video specialists thank you for",
    desc: "Go deep enough that the people who already know the subject say you got it right.",
  },
  {
    icon: Music,
    title: "A score under your own work",
    desc: "Music for your own short, game, or channel — without borrowing someone else’s track again.",
  },
  {
    icon: Code2,
    title: "A thing you shipped",
    desc: "Learn enough full-stack to put a working tool online that someone other than you uses.",
  },
  {
    icon: Share2,
    title: "A post that travels",
    desc: "Figure something out well enough to explain it, share it, and watch it go further than you expected.",
  },
  {
    icon: Briefcase,
    title: "A portfolio piece you can talk about",
    desc: "End up with work real enough to put in front of someone — and want the question.",
  },
];

/* Three tiers. Free is enough to prove it; the rest are for when it sticks. */
const TIERS = [
  {
    name: "Field Pass",
    price: "Free",
    cadence: "",
    desc: "One full Learning Path. Full depth, no time limit, no card. Enough to prove this works on you.",
    cta: "Start free",
    featured: false,
  },
  {
    name: "Expedition",
    price: "$12",
    cadence: "/month",
    desc: "Unlimited paths, every connector, and Glyfra sync when it lands. For when one path turns into a habit.",
    cta: "Join the waitlist",
    featured: true,
  },
  {
    name: "Field Station",
    price: "$29",
    cadence: "/month",
    desc: "Everything in Expedition, plus early editorial access to channel content before it publishes — and your study questions help shape what gets made.",
    cta: "Join the waitlist",
    featured: false,
  },
];

// Shared section heading.
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-ds-secondary">
      <span className="h-px w-8 bg-ds-border-strong" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
        {children}
      </span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      {/* Landing-only: fire scroll-depth milestones (25/50/75/100%). */}
      <ScrollDepthTracker />

      {/* 1 — Cinematic hero (ENCHIRIDION wordmark + skull + parallax) */}
      <SkullHero />

      <main className="ench-aurora relative overflow-hidden">
        {/* Subtle topographic dot texture */}
        <div className="ench-dots pointer-events-none absolute inset-0 opacity-70" />

        <div className="relative mx-auto flex max-w-5xl flex-col px-6 pb-4 pt-16">
          {/* 2 — Thesis: a curriculum that starts with your life */}
          <Reveal>
            <SectionEyebrow>The idea</SectionEyebrow>
            <p className="max-w-3xl text-balance text-2xl font-bold leading-snug tracking-tight text-ds-text sm:text-3xl">
              A curriculum that starts with{" "}
              <span className="text-ds-primary">your life</span>, not a syllabus.
            </p>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
              Most learning is built for someone who isn&apos;t you — a grade, a
              test, a class average. Enchiridion starts from what you&apos;re
              trying to make and how far you&apos;re willing to go to make it
              well, then builds the path session by session.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <WaitlistButton
                variant="solid"
                placement="thesis"
              >
                Build my first path
              </WaitlistButton>
              <Link
                href="#how-it-works"
                className="ds-focus inline-flex items-center gap-2 rounded-[var(--radius-ds)] border border-ds-border-strong px-5 py-3 text-sm font-semibold text-ds-text transition-colors hover:border-ds-primary hover:text-ds-accent"
                data-cta="see_how_it_works"
                data-cta-kind="secondary"
                data-cta-placement="thesis"
              >
                See how it works
              </Link>
            </div>
            <p className="mt-3 text-xs text-ds-faint">
              Free forever for your first path · full depth, no time limit, no
              card
            </p>
          </Reveal>

          {/* 2b — Channel connection (what comes after the video ends) */}
          <Reveal as="div" className="pt-12">
            <ChannelBand />
          </Reveal>

          {/* 3 — The problem: you've started this before */}
          <section id="why-it-fades" className="scroll-mt-8 py-16">
            <Reveal>
              <SectionEyebrow>Why it never stuck</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                You&apos;ve started this before. Something always ended it early.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                You&apos;ve picked things up before — a course, a tutorial, a
                stack of saved videos. Each one taught you something real, then
                ended right where it got interesting, and the next step was
                yours to guess. What faded was the momentum, never the
                curiosity.
              </p>
            </Reveal>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                "27 open tabs, zero finished",
                "A playlist that isn’t a plan",
                "Week 1 energy, week 3 silence",
                "Saved for later, never opened",
              ].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-ds-border bg-ds-surface/60 px-3.5 py-1.5 text-sm text-ds-muted"
                >
                  {label}
                </span>
              ))}
            </div>
          </section>

          {/* 4 — What it actually is (the Not X / Y / Z frame) */}
          <section id="what-it-is" className="scroll-mt-8 py-16">
            <Reveal>
              <SectionEyebrow>What this actually is</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                A daily practice that ends with you having made something.
              </h2>
              <div className="mt-6 flex flex-col gap-2">
                {[
                  "Not a course you binge and forget.",
                  "Not a chatbot that answers and moves on.",
                  "Not school — no grades, no tests, no one else’s deadline.",
                ].map((line) => (
                  <p
                    key={line}
                    className="text-pretty text-lg font-semibold leading-snug text-ds-text"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                Enchiridion turns one real ambition into a standing practice — a
                few sessions a week, each with something to read or watch and one
                concrete thing to make. You keep your notes, build a streak, and
                the project you came to build gets built along the way.
              </p>
            </Reveal>
          </section>

          {/* 5 — How it works (the core loop, eight steps) */}
          <section id="how-it-works" className="scroll-mt-8 py-16">
            <Reveal>
              <SectionEyebrow>The loop</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                From &ldquo;I want to learn this&rdquo; to &ldquo;I made
                this.&rdquo;
              </h2>
            </Reveal>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {HOW_IT_WORKS.map(({ icon: Icon, label, desc }, i) => (
                <Reveal as="li" key={label} delay={(i % 2) * 0.06}>
                  <div className="ench-card flex h-full gap-4 p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-primary/12 text-ds-accent">
                      <Icon size={18} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-ds-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-sm font-semibold text-ds-text">
                          {label}
                        </h3>
                      </div>
                      <p className="mt-1 text-pretty text-xs leading-relaxed text-ds-muted">
                        {desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* 6 — Life Journeymap (where every path begins) */}
          <section id="journeymap" className="scroll-mt-8 py-16">
            <Reveal as="div">
              <div className="overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-primary/30 bg-ds-surface/70 p-6 ds-glow sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-ds-secondary/30 bg-ds-secondary/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ds-secondary">
                  <Compass size={13} />
                  Where every path begins
                </span>
                <h2 className="mt-4 max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                  Eight questions. Then a plan that&apos;s unmistakably yours.
                </h2>
                <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                  The Life Journeymap is the first thing you do, and the thing
                  everything else is built on. Eight honest questions about what
                  you&apos;d make if no one was grading you and how far you mean
                  to take it. Your answers become the curriculum — so the path
                  follows your patterns, not a student archetype.
                </p>
                <div className="mt-6 flex flex-col gap-2 border-t border-ds-border pt-5">
                  <p className="text-pretty text-sm italic leading-relaxed text-ds-muted">
                    &ldquo;If you had infinite time and money, what would you
                    spend your life building or understanding?&rdquo;
                  </p>
                  <p className="text-pretty text-sm italic leading-relaxed text-ds-muted">
                    &ldquo;What are three to five skills you most want to
                    develop?&rdquo;
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          {/* 7 — Glyfra (the notebook, coming Oct 2026) */}
          <section id="glyfra" className="scroll-mt-8 py-16">
            <Reveal as="div">
              <div className="overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-border bg-ds-surface/70 p-6 shadow-ds sm:p-8">
                <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-ds-border-strong bg-ds-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ds-accent">
                      <NotebookPen size={13} />
                      Coming October 2026
                    </span>
                    <h2 className="mt-4 max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                      The notes you write by hand, thinking alongside you.
                    </h2>
                    <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                      Glyfra is a physical notebook with a stylus. Write the way
                      ideas actually land — by hand. Glyfra structures what you
                      wrote, links it to your active path, and surfaces it in
                      your next session. Built for anyone who thinks by writing:
                      researchers, designers, founders, animators, musicians,
                      scientists.
                    </p>
                    <p className="mt-5 text-pretty text-lg font-semibold italic text-ds-primary">
                      Paper that thinks.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* 8 — Proof: depth a specialist would respect */}
          <section id="proof" className="scroll-mt-8 py-16">
            <Reveal as="div">
              <div className="overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-primary/30 bg-ds-surface/70 ds-glow">
                <div className="relative h-36 ds-grid-bg">
                  <div className="absolute inset-0 bg-gradient-to-br from-ds-primary/25 via-ds-secondary/15 to-transparent" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/spino-skull.png"
                    alt=""
                    aria-hidden
                    className="absolute -right-4 -top-4 hidden h-44 w-auto object-contain opacity-90 [filter:drop-shadow(0_10px_30px_rgba(0,0,0,0.45))_drop-shadow(0_0_28px_rgba(94,234,212,0.28))] sm:block"
                  />
                  <div className="absolute bottom-4 left-5">
                    <p className="text-[11px] uppercase tracking-wider text-ds-accent">
                      Proof it goes deep
                    </p>
                    <h2 className="text-2xl font-bold text-ds-text sm:text-3xl">
                      Deep enough to make something a specialist respects.
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="max-w-3xl text-pretty text-sm leading-relaxed text-ds-muted">
                    The Spinosaurus path puts you in the Ibrahim neural-spine
                    data and the sail-versus-hump debate paleontologists are
                    still having. By the end you can hold a real opinion on
                    contested anatomy — and make a video, a model, or an argument
                    for an audience. That&apos;s the depth on every path.
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          {/* 9 — Outcomes (small, concrete wins) */}
          <section id="outcomes" className="scroll-mt-8 py-16">
            <Reveal>
              <SectionEyebrow>What people walk away with</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                Small, concrete wins that open doors you didn&apos;t see coming.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {OUTCOMES.map(({ icon: Icon, title, desc }, i) => (
                <Reveal as="div" key={title} delay={(i % 3) * 0.06}>
                  <div className="ench-card flex h-full flex-col p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-secondary/15 text-ds-secondary">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-3.5 text-sm font-semibold text-ds-text">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-pretty text-xs leading-relaxed text-ds-muted">
                      {desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 10 — Modules (what you can point it at) */}
          <section id="modules" className="scroll-mt-8 py-16">
            <Reveal>
              <SectionEyebrow>What you can point it at</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                One engine. Any subject you&apos;re serious about.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {MODULES.map(({ icon: Icon, title, desc }, i) => (
                <Reveal as="div" key={title} delay={(i % 4) * 0.05}>
                  <div className="ench-card flex h-full flex-col p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-primary/12 text-ds-accent">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-3.5 text-sm font-semibold text-ds-text">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-pretty text-xs leading-relaxed text-ds-muted">
                      {desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 11 — Pricing */}
          <section id="pricing" className="scroll-mt-8 py-16">
            <Reveal>
              <SectionEyebrow>Pricing</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                Start free. Go further only when you want to.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {TIERS.map((tier) => (
                <Reveal as="div" key={tier.name}>
                  <div
                    className={
                      tier.featured
                        ? "relative flex h-full flex-col rounded-[var(--radius-ds-lg)] border border-ds-primary/40 bg-ds-primary/[0.06] p-6 ds-glow"
                        : "relative flex h-full flex-col rounded-[var(--radius-ds-lg)] border border-ds-border bg-ds-surface/60 p-6"
                    }
                  >
                    {tier.featured && (
                      <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-ds-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ds-on-primary shadow-ds-glow">
                        <Sparkles size={11} /> Most popular
                      </span>
                    )}
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-ds-faint">
                      {tier.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-ds-text">
                        {tier.price}
                      </span>
                      {tier.cadence && (
                        <span className="text-sm text-ds-muted">
                          {tier.cadence}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ds-muted">
                      {tier.desc}
                    </p>
                    <WaitlistButton
                      variant={tier.featured ? "solid" : "outline"}
                      placement={`pricing_${tier.name.toLowerCase().replace(/\s+/g, "_")}`}
                      className="mt-5 w-full"
                    >
                      {tier.cta}
                    </WaitlistButton>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 12 — Final CTA */}
          <section className="flex flex-col items-center gap-5 py-20 text-center">
            <Reveal>
              <Compass size={22} className="mx-auto text-ds-accent" />
              <h2 className="mt-3 text-balance text-3xl font-bold leading-tight text-ds-text sm:text-4xl">
                Pick the thing you&apos;ve been meaning
                <br className="hidden sm:block" />{" "}
                <span className="text-ds-primary">to actually learn.</span>
              </h2>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <WaitlistButton variant="solid" placement="final_cta">
                  Build my Life Journeymap
                </WaitlistButton>
                <Link
                  href="#how-it-works"
                  className="ds-focus inline-flex items-center gap-2 rounded-[var(--radius-ds)] border border-ds-border-strong px-5 py-3 text-sm font-semibold text-ds-text transition-colors hover:border-ds-primary hover:text-ds-accent"
                  data-cta="watch_path_built"
                  data-cta-kind="secondary"
                  data-cta-placement="final_cta"
                >
                  Watch a path get built
                  <ArrowRight size={16} />
                </Link>
                <FeedbackButton variant="outline" placement="final_cta" />
              </div>
              <p className="mt-3 text-xs text-ds-faint">
                Free forever for your first path · eight questions to start
              </p>
            </Reveal>
          </section>
        </div>
      </main>

      {/* Footer — in-page nav, channel link, and the conversion CTAs */}
      <SiteFooter />
    </>
  );
}
