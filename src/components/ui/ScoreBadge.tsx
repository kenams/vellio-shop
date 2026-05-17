import { cn, getTrendLabel } from "@/lib/utils";

export default function ScoreBadge({ score, className }: { score: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border border-brand-accent/25 bg-brand-ivory/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
      {getTrendLabel(score)} · {score}
    </span>
  );
}
