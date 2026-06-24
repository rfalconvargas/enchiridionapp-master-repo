"use client";

import Link from "next/link";
import { Youtube, ArrowUpRight } from "lucide-react";
import { CHANNEL_URL, CHANNEL_HANDLE, BRAND_NAME } from "@/lib/brand";
import { FeedbackButton } from "@/components/FeedbackButton";
import { WaitlistButton } from "@/components/landing/WaitlistButton";
import { track, EVENTS } from "@/lib/analytics";

/**
 * Real footer the landing was missing — in-page nav, the channel link, and the
 * two conversion CTAs repeated one last time. Anchors target the section ids set
 * on the homepage.
 */
const NAV = [
  { href: "/episodes", label: "Episode companions" },
  { href: "/reconstruction-lab", label: "Reconstruction Lab" },
  { href: "/glossary", label: "Paleo Glossary" },
  { href: "/pop-culture", label: "Accuracy Lab" },
  { href: "/lab", label: "Fossil Lab (60s)" },
  { href: "#modules", label: "Expeditions" },
  { href: "/demo", label: "Step into a world" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ds-border bg-ds-surface/60 backdrop-blur">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/enchiridion-logo.png"
                alt=""
                aria-hidden="true"
                className="h-7 w-7 rounded-full object-contain"
              />
              <span className="text-base font-bold tracking-tight text-ds-text">
                {BRAND_NAME}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ds-muted">
              A desktop learning OS — a real curriculum for anything you want to
              learn well enough to make something with.
            </p>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(EVENTS.youtubeClick, { placement: "footer" })}
              className="ds-focus mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ds-text transition-colors hover:text-ds-accent"
            >
              <Youtube size={16} className="text-ds-danger" />
              {CHANNEL_HANDLE}
              <ArrowUpRight size={13} className="text-ds-faint" />
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ds-faint">
              Explore
            </p>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="ds-focus text-sm text-ds-muted transition-colors hover:text-ds-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ds-faint">
              Stay in the loop
            </p>
            <WaitlistButton variant="solid" placement="footer" />
            <FeedbackButton variant="outline" placement="footer" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ds-border pt-6 text-xs text-ds-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {BRAND_NAME}. Built for curious minds — high-agency learning, all
            the way down.
          </p>
          <p>Learn it well enough to make something real.</p>
        </div>
      </div>
    </footer>
  );
}
