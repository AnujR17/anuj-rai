import { cn } from "@/components/utils/cn";

export function Divider({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-t border-stone-200 my-16", className)} {...props} />;
}
