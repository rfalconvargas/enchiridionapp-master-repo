"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  User,
  Bookmark,
  Plug,
  ChevronRight,
  Github,
  Database,
  Cloud,
  Bell,
  Moon,
  Eye,
  Target,
  Check,
  Download,
  Rocket,
  Mail,
  Loader2,
  X,
} from "lucide-react";
import { TOPICS } from "@/data/topics";
import { TREE_NODES, isNodeUnlocked } from "@/data/tree";
import { useAppState } from "@/state/AppState";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { joinWaitlist } from "@/lib/supabase";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 mt-5 px-1 text-[11px] font-medium uppercase tracking-wider text-ds-faint">
      {children}
    </p>
  );
}

function Toggle({
  on,
  onClick,
  label,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "ds-focus relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150",
        on ? "bg-ds-primary" : "border border-ds-border bg-ds-surface-3"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-ds-bg transition-transform duration-150",
          on ? "translate-x-[22px]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

export function MoreTab() {
  const { savedToTree, setActiveTab } = useAppState();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false, // "Deep Time Mode" — off by default (light is default)
    reducedMotion: false,
  });
  const [themeReady, setThemeReady] = useState(false);
  const [exported, setExported] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [waitEmail, setWaitEmail] = useState("");
  const [waitLoading, setWaitLoading] = useState(false);
  const [waitError, setWaitError] = useState<string | null>(null);

  const submitWaitlist = async () => {
    setWaitError(null);
    setWaitLoading(true);
    const res = await joinWaitlist(waitEmail, "more-tab");
    setWaitLoading(false);
    if (res.ok) setJoined(true);
    else setWaitError(res.error);
  };

  // Sync the toggle from the current theme on mount (survives tab switches).
  useEffect(() => {
    if (document.documentElement.classList.contains("deep-time")) {
      setSettings((s) => ({ ...s, darkMode: true }));
    }
    setThemeReady(true);
  }, []);

  // "Dark interface" applies the optional Deep Time Mode theme.
  useEffect(() => {
    if (themeReady) {
      document.documentElement.classList.toggle("deep-time", settings.darkMode);
    }
  }, [themeReady, settings.darkMode]);

  const saved = savedToTree.includes("spinosaurus");
  const savedTopics = TOPICS.filter((t) => savedToTree.includes(t.id));
  const unlockedCount = TREE_NODES.filter((n) => isNodeUnlocked(n, saved)).length;

  const goals = [
    { label: "Finish your first lesson", hint: "Complete the Spinosaurus lesson", done: saved },
    { label: "Unlock 5 knowledge nodes", hint: `${unlockedCount} / 5 unlocked`, done: unlockedCount >= 5 },
    { label: "Save 3 lessons", hint: `${savedToTree.length} / 3 saved`, done: savedToTree.length >= 3 },
  ];

  const integrations = [
    { id: "github", label: "GitHub", detail: "Sync lesson sources", icon: Github, on: false },
    { id: "drive", label: "Google Drive", detail: "Import PDFs & notes", icon: Cloud, on: true },
    { id: "supabase", label: "Supabase", detail: "Cloud progress sync", icon: Database, on: false },
  ];

  const settingRows = [
    { key: "notifications" as const, label: "Notifications", icon: Bell },
    { key: "darkMode" as const, label: "Dark interface", icon: Moon },
    { key: "reducedMotion" as const, label: "Reduce motion", icon: Eye },
  ];

  const exportMap = () => {
    const data = {
      app: "Enchiridion",
      exportedAt: new Date().toISOString(),
      savedLessons: savedTopics.map((t) => ({ id: t.id, title: t.commonName })),
      unlockedNodes: TREE_NODES.filter((n) => isNodeUnlocked(n, saved)).map((n) => ({
        id: n.id,
        label: n.label,
      })),
    };
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "enchiridion-learning-map.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // download unavailable in this environment — still show confirmation
    }
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="no-scrollbar h-full overflow-y-auto p-4">
      {/* 1 — Profile placeholder */}
      <Card variant="glow" className="flex items-center gap-3 p-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ds-primary/15 text-ds-accent">
          <User size={26} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-ds-text">Guest Learner</h2>
          <p className="truncate text-xs text-ds-muted">No account needed</p>
          <div className="mt-1.5 flex gap-1.5">
            <Badge variant="primary">{savedToTree.length} saved</Badge>
            <Badge variant="neutral">Guest</Badge>
          </div>
        </div>
      </Card>

      {/* 2 — Saved lessons */}
      <SectionLabel>Saved lessons</SectionLabel>
      {savedTopics.length > 0 ? (
        <div className="space-y-2">
          {savedTopics.map((t) => (
            <Card
              key={t.id}
              interactive
              onClick={() => setActiveTab("learn")}
              className="flex items-center gap-3 p-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-secondary/15 text-ds-secondary">
                <Bookmark size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ds-text">
                  {t.commonName}
                </p>
                <p className="truncate font-mono text-[11px] text-ds-faint">
                  {t.scientificName}
                </p>
              </div>
              <ChevronRight size={16} className="text-ds-faint" />
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-4 text-center text-xs text-ds-muted">
          No saved lessons yet. Save the Spinosaurus lesson from the Learn tab.
        </Card>
      )}

      {/* 3 — Learning goals */}
      <SectionLabel>Learning goals</SectionLabel>
      <Card className="divide-y divide-ds-border">
        {goals.map((g) => (
          <div key={g.label} className="flex items-center gap-3 px-3.5 py-3">
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                g.done
                  ? "bg-ds-primary text-ds-on-primary"
                  : "border border-ds-border text-ds-faint"
              )}
            >
              {g.done ? <Check size={13} /> : <Target size={12} />}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-sm",
                  g.done ? "text-ds-text" : "text-ds-muted"
                )}
              >
                {g.label}
              </p>
              <p className="text-[11px] text-ds-faint">{g.hint}</p>
            </div>
            {g.done && <Badge variant="primary">Done</Badge>}
          </div>
        ))}
      </Card>

      {/* 4 — Integrations */}
      <SectionLabel>Integrations</SectionLabel>
      <Card className="divide-y divide-ds-border">
        {integrations.map(({ id, label, detail, icon: Icon, on }) => (
          <div key={id} className="flex items-center gap-3 px-3.5 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-surface-3 text-ds-muted">
              <Icon size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-ds-text">{label}</p>
              <p className="truncate text-[11px] text-ds-faint">{detail}</p>
            </div>
            <Badge variant={on ? "success" : "neutral"}>
              {on ? "Connected" : "Connect"}
            </Badge>
          </div>
        ))}
      </Card>

      {/* 5 — Export learning map */}
      <SectionLabel>Your data</SectionLabel>
      <Button
        variant="subtle"
        size="md"
        onClick={exportMap}
        className="w-full justify-start"
      >
        {exported ? (
          <Check size={16} className="text-ds-success" />
        ) : (
          <Download size={16} />
        )}
        {exported ? "Learning map exported" : "Export Learning Map"}
      </Button>

      {/* 6 — Settings */}
      <SectionLabel>Settings</SectionLabel>
      <Card className="divide-y divide-ds-border">
        {settingRows.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-center gap-3 px-3.5 py-3">
            <Icon size={17} className="text-ds-muted" />
            <span className="flex-1 text-sm text-ds-text">{label}</span>
            <Toggle
              on={settings[key]}
              label={label}
              onClick={() => setSettings((s) => ({ ...s, [key]: !s[key] }))}
            />
          </div>
        ))}
      </Card>

      {/* 7 — Join waitlist CTA */}
      <Card variant="glow" className="mt-5 p-4">
        <div className="flex items-center gap-2 text-ds-accent">
          <Rocket size={16} />
          <p className="text-sm font-semibold text-ds-text">
            Enchiridion is in early access
          </p>
        </div>
        <p className="mt-1 text-xs text-ds-muted">
          Join the waitlist to get new 3D lessons as they launch.
        </p>
        <Button
          variant="primary"
          size="md"
          onClick={() => setWaitlistOpen(true)}
          className="mt-3 w-full"
        >
          Join the Waitlist
        </Button>
      </Card>

      <div className="mt-5 flex items-center justify-center gap-1.5 pb-2 text-[11px] text-ds-faint">
        <Plug size={12} />
        Enchiridion · demo build · local state only
      </div>

      {/* Waitlist placeholder modal */}
      <AnimatePresence>
        {waitlistOpen && (
          <>
            <motion.button
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close"
              onClick={() => setWaitlistOpen(false)}
              className="absolute inset-0 z-20 bg-ds-text/40 backdrop-blur-sm"
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.16 }}
              className="absolute inset-x-4 top-1/2 z-30 -translate-y-1/2 rounded-[var(--radius-ds-lg)] border border-ds-primary/30 bg-ds-surface p-5 shadow-ds ds-glow"
            >
              <button
                onClick={() => setWaitlistOpen(false)}
                aria-label="Close"
                className="ds-focus absolute right-2 top-2 rounded-full p-2 text-ds-faint transition-colors hover:bg-ds-surface-2 hover:text-ds-text"
              >
                <X size={18} />
              </button>

              {joined ? (
                <div className="flex flex-col items-center gap-2 py-2 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ds-success/15 text-ds-success">
                    <Check size={24} />
                  </span>
                  <p className="text-sm font-semibold text-ds-text">
                    You&apos;re on the list
                  </p>
                  <p className="text-xs text-ds-muted">
                    We&apos;ll email you when new 3D lessons land.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-ds-accent">
                    <Rocket size={18} />
                    <h3 className="text-base font-bold text-ds-text">
                      Join the waitlist
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-ds-muted">
                    Be first to try new Enchiridion 3D lessons. No spam.
                  </p>
                  <div className="mt-3 flex items-center gap-2 rounded-[var(--radius-ds)] border border-ds-border bg-ds-surface-3 px-3 py-2.5">
                    <Mail size={15} className="text-ds-faint" />
                    <input
                      type="email"
                      value={waitEmail}
                      onChange={(e) => setWaitEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && submitWaitlist()}
                      placeholder="you@example.com"
                      aria-label="Email"
                      className="w-full bg-transparent text-sm text-ds-text placeholder:text-ds-faint focus:outline-none"
                    />
                  </div>
                  {waitError && (
                    <p className="mt-2 text-xs text-ds-danger">{waitError}</p>
                  )}
                  <Button
                    variant="primary"
                    size="md"
                    onClick={submitWaitlist}
                    disabled={waitLoading}
                    className="mt-3 w-full"
                  >
                    {waitLoading && <Loader2 size={16} className="animate-spin" />}
                    {waitLoading ? "Joining…" : "Notify me"}
                  </Button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
