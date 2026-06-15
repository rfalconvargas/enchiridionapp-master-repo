"use client";

import { Home, Box, Plus, Network, MoreHorizontal, type LucideIcon } from "lucide-react";
import { useAppState, type TabId } from "@/state/AppState";
import { cn } from "@/lib/cn";

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "learn", label: "Learn", icon: Box },
  { id: "create", label: "Create", icon: Plus },
  { id: "tree", label: "Tree", icon: Network },
  { id: "more", label: "More", icon: MoreHorizontal },
];

export function BottomNav() {
  const { activeTab, setActiveTab } = useAppState();

  return (
    <nav className="shrink-0 border-t border-ds-border bg-ds-surface/95 backdrop-blur">
      <ul className="flex items-stretch">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          const isCreate = id === "create";
          return (
            <li key={id} className="flex-1">
              <button
                onClick={() => setActiveTab(id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "ds-focus flex w-full flex-col items-center gap-1 py-2.5 transition-colors duration-150",
                  isActive ? "text-ds-accent" : "text-ds-muted hover:text-ds-text"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full transition duration-150 active:scale-90",
                    isCreate &&
                      "bg-ds-primary text-ds-on-primary shadow-ds-glow hover:bg-ds-accent",
                    !isCreate && isActive && "bg-ds-primary/15"
                  )}
                >
                  <Icon size={isCreate ? 20 : 19} strokeWidth={2} />
                </span>
                <span className="text-[10px] font-medium tracking-wide">
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
