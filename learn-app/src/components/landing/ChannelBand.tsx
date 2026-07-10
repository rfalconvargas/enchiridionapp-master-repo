"use client";

import { Youtube, ArrowUpRight, Play } from "lucide-react";
import { CHANNEL_URL, CHANNEL_HANDLE } from "@/lib/brand";
import { track, EVENTS } from "@/lib/analytics";

/**
 * The bridge the old landing was missing: an explicit statement that this app
 * IS the interactive arm of the Enchiridion YouTube channel. Links out to the
 * channel (tracked) and reframes every video as something you can now touch.
 */
export function ChannelBand() {
  const onChannel = (placement: string) =>
    track(EVENTS.youtubeClick, { placement });

  return (
    <section
      aria-labelledby="channel-band-heading"
      className="relative overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-border bg-ds-surface/80 p-6 shadow-ds backdrop-blur sm:p-8"
    >
      <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ds-secondary/30 bg-ds-secondary/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ds-secondary">
            <Youtube size={13} />
            From the channel
          </span>
          <h2
            id="channel-band-heading"
            className="mt-3 text-balance text-2xl font-bold leading-tight text-ds-text"
          >
            Enchiridion is what comes{" "}
            <span className="text-ds-primary">after the video ends</span>.
          </h2>
          <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-ds-muted">
            Watch an episode, then follow a four-week path that goes far deeper
            than ten minutes ever could. The video starts it; the app is where
            you actually learn it. 128K subscribers, 38M views — and every video
            is the start of a path.
          </p>
        </div>

        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onChannel("channel_band")}
          className="ds-focus group inline-flex shrink-0 items-center gap-2.5 rounded-[var(--radius-ds)] border border-ds-border-strong bg-ds-surface px-5 py-3 text-sm font-semibold text-ds-text shadow-ds transition-colors hover:border-ds-primary hover:text-ds-accent"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ds-danger/12 text-ds-danger">
            <Play size={15} className="ml-0.5 fill-current" />
          </span>
          <span className="flex flex-col leading-tight">
            <span>Watch on YouTube</span>
            <span className="text-[11px] font-normal text-ds-faint">
              {CHANNEL_HANDLE}
            </span>
          </span>
          <ArrowUpRight
            size={15}
            className="text-ds-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ds-accent"
          />
        </a>
      </div>
    </section>
  );
}
