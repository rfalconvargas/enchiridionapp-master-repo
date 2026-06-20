"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowDown, Rocket } from "lucide-react";

/**
 * Cinematic parallax skull hero — ported from the existing
 * enchiridion.ailiur.com landing (Tauri desktop app). Sits at the top of the
 * page; all CTAs lead into the /demo app. Flora-shadow loop + ENCHIRIDION
 * wordmark + Spinosaurus skull, with scroll + cursor parallax.
 */

const ZIMULA_BD = "'Zimula Trial Bd', var(--font-fredoka), sans-serif";
const ZIMULA_MED = "'Zimula Trial Med', var(--font-manrope), sans-serif";

export function SkullHero() {
  const prefersReducedMotion = useReducedMotion();

  // Scroll parallax.
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], prefersReducedMotion ? [0, 0] : [0, 80]);
  const skullScrollY = useTransform(scrollY, [0, 600], prefersReducedMotion ? [0, 0] : [0, -140]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  // Cursor parallax (spring-smoothed).
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springCfg = { stiffness: 60, damping: 18, mass: 0.6 };
  const skullX = useSpring(useTransform(pointerX, [-1, 1], [28, -28]), springCfg);
  const skullCursorY = useSpring(useTransform(pointerY, [-1, 1], [18, -18]), springCfg);
  const wordX = useSpring(useTransform(pointerX, [-1, 1], [-16, 16]), springCfg);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const onPointerMove = (e: PointerEvent) => {
      pointerX.set((e.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [prefersReducedMotion, pointerX, pointerY]);

  const cardReveal = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 32 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: prefersReducedMotion ? 0 : 0.15 + i * 0.12,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section className="relative flex h-screen min-h-[600px] w-full items-center justify-center overflow-hidden bg-[#072e2b] text-[#eafbf6]">
      {/* Layer -1: cinematic channel-art gradient (green → teal → deep) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(58% 55% at 8% -8%, rgba(155,214,73,0.26), transparent 68%), radial-gradient(62% 52% at 94% 4%, rgba(21,122,130,0.45), transparent 72%), radial-gradient(95% 70% at 50% 128%, rgba(14,143,144,0.32), transparent 72%), linear-gradient(168deg, #0e544c 0%, #082f2c 56%, #041f1e 100%)",
        }}
      />
      {/* Top nav */}
      <header className="absolute left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-12">
        <div
          style={{ fontFamily: ZIMULA_BD }}
          className="flex select-none items-center gap-2.5 text-xl font-black tracking-tighter text-[#eafbf6] md:text-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/enchiridion-logo.png"
            alt=""
            aria-hidden="true"
            className="h-8 w-8 rounded-full object-contain"
          />
          ENCHIRIDION<sup className="ml-0.5 text-[0.4em]">®</sup>
        </div>
        <Link
          href="/demo"
          aria-label="Launch the Enchiridion app"
          style={{ fontFamily: ZIMULA_BD }}
          className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#2e9e6a] to-[#14a6a8] px-5 py-3 text-xs font-black uppercase tracking-widest text-[#F4F7EC] shadow-[0_8px_28px_rgba(20,166,168,0.32)] transition-all duration-200 hover:brightness-105 active:scale-95"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/enchiridion-logo.png"
            alt=""
            aria-hidden="true"
            className="h-5 w-5 rounded-full object-contain"
          />
          <span className="hidden sm:inline">Launch Enchiridion App</span>
          <span className="sm:hidden">Launch</span>
          <Rocket
            size={14}
            strokeWidth={2.4}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </header>

      {/* Layer 0: ambient flora-shadows loop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-[0.18] mix-blend-screen"
      >
        <source src="/flora-shadows.webm" type="video/webm" />
      </video>

      {/* Layer 1: depth vignette for text legibility (deep teal) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 36%, transparent 42%, rgba(4,28,27,0.55) 100%)",
        }}
      />

      {/* Layer 2: luminous brand halo behind the skull (echoes the logo glow) */}
      <div
        className="pointer-events-none absolute z-[2] aspect-square w-[78vmin] max-w-[760px] rounded-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.34) 0%, rgba(32,199,201,0.14) 38%, transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      {/* Layer 3: backdrop wordmark */}
      <motion.div
        style={{ y: textY, x: wordX }}
        className="pointer-events-none absolute z-[3] text-center"
        aria-hidden="true"
      >
        <h1
          style={{ fontFamily: ZIMULA_BD }}
          className="select-none text-[17vw] font-black leading-none tracking-tighter text-[#5eead4] opacity-[0.14] md:text-[14vw]"
        >
          ENCHIRIDION
        </h1>
      </motion.div>

      {/* Layer 4: foreground Spinosaurus skull */}
      <motion.div
        style={{ x: skullX, y: skullCursorY }}
        className="pointer-events-none absolute z-[4] flex items-center justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          style={{ y: skullScrollY }}
          src="/spino-skull.png"
          alt="Spinosaurus mirabilis lateral cranium reconstruction"
          className="h-auto w-[130vw] max-w-[900px] select-none [filter:drop-shadow(0_24px_55px_rgba(0,0,0,0.5))_drop-shadow(0_0_42px_rgba(94,234,212,0.28))] md:w-[65vw]"
        />
      </motion.div>

      {/* Layer 10: floating bento cards */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="absolute bottom-10 left-6 right-6 z-10 mx-auto flex w-full max-w-7xl flex-col items-stretch justify-between gap-5 md:bottom-14 md:flex-row md:items-end"
      >
        {/* Left: mission card */}
        <motion.div
          custom={0}
          variants={cardReveal}
          initial="hidden"
          animate="show"
          whileHover={prefersReducedMotion ? undefined : { y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="group max-w-md rounded-2xl border border-[#5eead42e] bg-[rgba(9,46,42,0.66)] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors duration-200 hover:border-[#5eead466]"
        >
          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ee0c9]">
            Deep-time learning
          </span>
          <p
            style={{ fontFamily: ZIMULA_MED }}
            className="text-lg font-medium leading-relaxed text-[#eafbf6] md:text-xl"
          >
            See how prehistoric life is reconstructed — and watch the science
            change with every new discovery.
          </p>
          <Link
            href="/demo"
            style={{ fontFamily: ZIMULA_MED }}
            className="ds-focus mt-6 inline-flex items-center gap-2 border-t border-[#eafbf61f] pt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#eafbf6] transition-colors duration-200 hover:text-[#5eead4]"
          >
            Start exploring
            <ArrowDown size={13} strokeWidth={2.4} className="-rotate-90" />
          </Link>
        </motion.div>

        {/* Right: launch CTA card */}
        <motion.div
          custom={1}
          variants={cardReveal}
          initial="hidden"
          animate="show"
          whileHover={prefersReducedMotion ? undefined : { y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="flex flex-col justify-between gap-6 rounded-2xl border border-[#5eead42e] bg-[rgba(9,46,42,0.66)] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors duration-200 hover:border-[#5eead466] md:max-w-xs"
        >
          <div>
            <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ee0c9]">
              Runs in your browser
            </span>
            <p
              style={{ fontFamily: ZIMULA_MED }}
              className="text-base leading-relaxed text-[#d7efe9]"
            >
              Spin real fossil reconstructions in 3D — no install, no sign-up.
            </p>
          </div>
          <Link
            href="/demo"
            style={{ fontFamily: ZIMULA_BD }}
            className="ds-focus w-full rounded-xl bg-gradient-to-r from-[#2e9e6a] to-[#14a6a8] px-8 py-4 text-center text-xs font-black uppercase tracking-widest text-[#F4F7EC] shadow-[0_12px_36px_rgba(20,166,168,0.3)] transition-all duration-200 hover:brightness-105 active:scale-[0.98]"
          >
            Launch the app
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue — there's more below */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[#5eead4]"
        aria-hidden="true"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
          Scroll
        </span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
