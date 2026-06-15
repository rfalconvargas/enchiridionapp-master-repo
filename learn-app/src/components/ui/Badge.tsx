import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "warning"
  | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-ds-primary/15 text-ds-accent border-ds-primary/30",
  secondary: "bg-ds-secondary/15 text-ds-secondary border-ds-secondary/30",
  neutral: "bg-ds-surface-3 text-ds-muted border-ds-border",
  success: "bg-ds-success/15 text-ds-success border-ds-success/30",
  warning: "bg-ds-warning/15 text-ds-warning border-ds-warning/30",
  danger: "bg-ds-danger/15 text-ds-danger border-ds-danger/30",
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
