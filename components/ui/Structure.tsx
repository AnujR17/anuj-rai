import { cn } from "@/components/utils/cn";

export function ConstructionLine({ className, orientation = "horizontal" }: { className?: string, orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      className={cn(
        "bg-neutral-200",
        orientation === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full",
        className
      )}
    />
  );
}
