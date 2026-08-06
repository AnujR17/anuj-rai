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

export function Wide({ className, as: Component = "div", children, ...props }: ContainerProps) {
  return (
    <Component className={cn("mx-auto max-w-7xl px-6 md:px-12 w-full", className)} {...props}>
      {children}
    </Component>
  );
}

export function Full({ className, as: Component = "div", children, ...props }: ContainerProps) {
  return (
    <Component className={cn("w-full", className)} {...props}>
      {children}
    </Component>
  );
}
