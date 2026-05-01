import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  full = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  full?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("px-6 lg:px-10", !full && "max-w-6xl mx-auto", className)}
    >
      {children}
    </section>
  );
}

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="mono-font text-xs text-muted-foreground">{index}</span>
      <span className="h-px w-8 bg-border" />
      <span className="mono-font text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
