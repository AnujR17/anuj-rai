import { cn } from "@/components/utils/cn";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function H1({ className, as: Component = "h1", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-100", className)}
      {...props}
    />
  );
}

export function H2({ className, as: Component = "h2", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-2xl md:text-3xl font-medium tracking-tight text-zinc-100", className)}
      {...props}
    />
  );
}

export function H3({ className, as: Component = "h3", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-xl md:text-2xl font-medium tracking-tight text-zinc-100", className)}
      {...props}
    />
  );
}

export function Lead({ className, as: Component = "p", ...props }: TypographyProps) {
  return <Component className={cn("text-xl md:text-2xl text-zinc-400 font-light leading-relaxed", className)} {...props} />;
}

export function Body({ className, as: Component = "p", ...props }: TypographyProps) {
  return <Component className={cn("text-base md:text-lg text-zinc-400 font-light leading-relaxed", className)} {...props} />;
}
