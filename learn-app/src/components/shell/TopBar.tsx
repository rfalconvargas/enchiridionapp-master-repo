"use client";

import { Activity } from "lucide-react";
import { useAppState, type TabId } from "@/state/AppState";

const TITLES: Record<TabId, string> = {
  home: "Discover",
  learn: "Lesson",
  create: "Create",
  tree: "Knowledge Tree",
  more: "Profile",
};

export function TopBar() {
  const { activeTab, savedToTree } = useAppState();

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-ds-border bg-ds-surface/95 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/enchiridion-logo.png"
          alt="Enchiridion"
          className="h-8 w-8 rounded-full"
        />
        <div className="leading-tight">
          <p className="text-[11px] uppercase tracking-wider text-ds-faint">
            Enchiridion
          </p>
          <h1 className="text-sm font-semibold text-ds-text">
            {TITLES[activeTab]}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-1.5 rounded-full border border-ds-border bg-ds-surface-2 px-2.5 py-1 text-[11px] text-ds-muted">
        <Activity size={13} className="text-ds-success" />
        {savedToTree.length} saved
      </div>
    </header>
  );
}
