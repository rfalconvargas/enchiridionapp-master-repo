import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "subtle" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-ds-primary text-ds-on-primary font-semibold hover:bg-ds-accent hover:text-white shadow-[var(--shadow-ds-btn)]",
  secondary:
    "bg-ds-secondary/15 text-ds-secondary border border-ds-secondary/30 hover:bg-ds-secondary/25",
  outline:
    "border border-ds-border-strong text-ds-text hover:border-ds-primary hover:text-ds-accent",
  subtle:
    "bg-ds-surface-3 text-ds-text border border-ds-border hover:border-ds-border-strong",
  ghost: "text-ds-muted hover:text-ds-text hover:bg-ds-surface-2",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-3 text-sm rounded-[var(--radius-ds-sm)] gap-1.5",
  md: "h-11 px-4 text-sm rounded-[var(--radius-ds)] gap-2",
  lg: "h-12 px-5 text-base rounded-[var(--radius-ds)] gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "ds-focus inline-flex items-center justify-center whitespace-nowrap transition duration-150 active:scale-[0.97] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
