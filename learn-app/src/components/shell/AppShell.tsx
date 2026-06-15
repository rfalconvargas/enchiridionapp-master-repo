"use client";

import { motion } from "framer-motion";
import { AppStateProvider, useAppState, type TabId } from "@/state/AppState";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { HomeTab } from "@/components/tabs/HomeTab";
import { LearnTab } from "@/components/tabs/LearnTab";
import { CreateTab } from "@/components/tabs/CreateTab";
import { TreeTab } from "@/components/tabs/TreeTab";
import { MoreTab } from "@/components/tabs/MoreTab";

const TABS: Record<TabId, React.ComponentType> = {
  home: HomeTab,
  learn: LearnTab,
  create: CreateTab,
  tree: TreeTab,
  more: MoreTab,
};

function ActiveTab() {
  const { activeTab } = useAppState();
  const Tab = TABS[activeTab];

  // A keyed motion.div (no AnimatePresence/exit) means the incoming tab mounts
  // immediately on switch. mode="wait" would gate the new tab on the old tab's
  // exit animation finishing — which deadlocks whenever rAF is paused
  // (backgrounded tab, reduced motion, throttling).
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="h-full"
    >
      <Tab />
    </motion.div>
  );
}

export function AppShell() {
  return (
    <AppStateProvider>
      {/* Device-framed column: phone on mobile, centered on desktop. */}
      <div className="ench-aurora flex min-h-dvh w-full justify-center sm:items-center sm:p-6">
        <div className="flex h-dvh w-full max-w-[440px] flex-col overflow-hidden border-ds-border bg-ds-bg sm:h-[860px] sm:max-h-[92vh] sm:rounded-[var(--radius-ds-xl)] sm:border sm:shadow-ds">
          <TopBar />
          <main className="relative flex-1 overflow-hidden">
            <ActiveTab />
          </main>
          <BottomNav />
        </div>
      </div>
    </AppStateProvider>
  );
}
