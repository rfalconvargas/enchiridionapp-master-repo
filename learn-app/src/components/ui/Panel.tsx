import { cn } from "@/lib/cn";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  eyebrow?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

/** A labelled surface used for the lesson / citation panels in Learn. */
export function Panel({
  title,
  eyebrow,
  icon,
  actions,
  className,
  children,
  ...props
}: PanelProps) {
  return (
    <section
      className={cn(
        "rounded-[var(--radius-ds-lg)] border border-ds-border bg-ds-surface",
        className
      )}
      {...props}
    >
      {(title || eyebrow || actions) && (
        <header className="flex items-center justify-between gap-3 border-b border-ds-border px-4 py-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {icon && <span className="text-ds-primary shrink-0">{icon}</span>}
            <div className="min-w-0">
              {eyebrow && (
                <p className="text-[11px] font-medium uppercase tracking-wider text-ds-faint">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h3 className="truncate text-sm font-semibold text-ds-text">
                  {title}
                </h3>
              )}
            </div>
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </header>
      )}
      <div className="px-4 py-3">{children}</div>
    </section>
  );
}
