"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Rocket, Mail, Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { joinWaitlist } from "@/lib/supabase";

const VARIANTS = {
  solid: "bg-ds-primary text-ds-on-primary shadow-ds-glow hover:bg-ds-accent",
  outline:
    "border border-ds-border-strong text-ds-text hover:border-ds-primary hover:text-ds-accent",
};

/** "Join waitlist" CTA — submits the email to Supabase (`waitlist` table). */
export function WaitlistButton({
  variant = "outline",
  className,
}: {
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "joined">("idle");
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
      setError(null);
    }, 200);
  };

  const submit = async () => {
    setError(null);
    setStatus("loading");
    const result = await joinWaitlist(email, "landing");
    if (result.ok) {
      setStatus("joined");
    } else {
      setStatus("idle");
      setError(result.error);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "ds-focus inline-flex items-center justify-center gap-2 rounded-[var(--radius-ds)] px-5 py-3 text-sm font-semibold transition-colors",
          VARIANTS[variant],
          className
        )}
      >
        Join waitlist
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute inset-0 bg-ds-text/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.16 }}
              className="relative w-full max-w-sm rounded-[var(--radius-ds-lg)] border border-ds-primary/30 bg-ds-surface p-6 shadow-ds ds-glow"
            >
              <button
                aria-label="Close"
                onClick={close}
                className="ds-focus absolute right-2 top-2 rounded-full p-2 text-ds-faint transition-colors hover:bg-ds-surface-2 hover:text-ds-text"
              >
                <X size={18} />
              </button>

              {status === "joined" ? (
                <div className="flex flex-col items-center gap-2 py-2 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ds-success/15 text-ds-success">
                    <Check size={24} />
                  </span>
                  <p className="text-base font-semibold text-ds-text">
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
                    <h3 className="text-lg font-bold text-ds-text">
                      Join the waitlist
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-ds-muted">
                    Be first to try new Enchiridion 3D lessons. No spam.
                  </p>
                  <div className="mt-4 flex items-center gap-2 rounded-[var(--radius-ds)] border border-ds-border bg-ds-surface-3 px-3 py-2.5">
                    <Mail size={15} className="text-ds-faint" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && submit()}
                      placeholder="you@example.com"
                      aria-label="Email"
                      className="w-full bg-transparent text-sm text-ds-text placeholder:text-ds-faint focus:outline-none"
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-xs text-ds-danger">{error}</p>
                  )}
                  <button
                    onClick={submit}
                    disabled={status === "loading"}
                    className="ds-focus mt-3 flex w-full items-center justify-center gap-2 rounded-[var(--radius-ds)] bg-ds-primary py-3 text-sm font-semibold text-ds-on-primary shadow-ds-glow transition-colors hover:bg-ds-accent disabled:opacity-60"
                  >
                    {status === "loading" && (
                      <Loader2 size={16} className="animate-spin" />
                    )}
                    {status === "loading" ? "Joining…" : "Notify me"}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
