import { cn } from "@/lib/utils";

export function AdminTable({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-black/10 bg-white shadow-card", className)}>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function AdminTh({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={cn("px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-brand/45", className)}>{children}</th>;
}

export function AdminTd({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn("px-4 py-4 text-sm text-brand/70", className)}>{children}</td>;
}
