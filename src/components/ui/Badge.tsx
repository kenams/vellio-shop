import { cn } from "@/lib/utils";

export default function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-brand-accent/25 bg-white/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/70", className)}>
      {children}
    </span>
  );
}
