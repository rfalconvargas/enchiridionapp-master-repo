import { cn } from "@/lib/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glow";
  interactive?: boolean;
}

export function Card({
  className,
  variant = "default",
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-ds-lg)] border border-ds-border bg-ds-surface",
        variant === "elevated" && "bg-ds-surface-2 shadow-ds",
        variant === "glow" && "ds-glow border-ds-primary/30",
        interactive &&
          "cursor-pointer transition-colors duration-150 hover:border-ds-border-strong",
        className
      )}
      {...props}
    />
  );
}
