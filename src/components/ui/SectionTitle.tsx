import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Badge className="mb-4">{eyebrow}</Badge>}
      <h2 className="text-balance text-4xl font-semibold leading-[0.95] text-brand sm:text-5xl lg:text-6xl">{title}</h2>
      {subtitle && <p className="mt-5 max-w-2xl text-sm leading-7 text-brand/60 sm:text-base">{subtitle}</p>}
    </div>
  );
}
