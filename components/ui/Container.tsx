import { cn } from "@/components/utils/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Container({ className, as: Component = "div", children, ...props }: ContainerProps) {
  return (
    <Component className={cn("mx-auto max-w-5xl px-6 md:px-12 w-full", className)} {...props}>
      {children}
    </Component>
  );
}
