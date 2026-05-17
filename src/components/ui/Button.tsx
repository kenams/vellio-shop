import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-graphite shadow-btn",
  secondary: "bg-white/80 text-brand border border-black/10 hover:border-brand-accent/50 hover:bg-white",
  ghost: "text-brand/65 hover:text-brand hover:bg-black/[0.04]",
};

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function Button({ children, className, variant = "primary", href, type = "button", onClick }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
