import { cn } from "@/components/utils/cn";

export function ConstructionLine({ className, orientation = "horizontal" }: { className?: string, orientation?: "horizontal" | "vertical" }) {
  return (
    <div 
      className={cn(
        "bg-stone-200",
        orientation === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full",
        className
      )}
    />
  );
}

export function Measure({ text, className }: { text?: string, className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex-1 h-[1px] bg-stone-200" />
      {text && <span className="font-mono text-[10px] text-stone-300 shrink-0">{text}</span>}
    </div>
  );
}
