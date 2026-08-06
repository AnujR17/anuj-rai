import { cn } from "@/components/utils/cn";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function Display({ className, as: Component = "h1", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-4xl md:text-5xl lg:text-[4.25rem] font-medium tracking-tighter text-stone-900 leading-[1.1]", className)}
      {...props}
    />
  );
}

export function Headline({ className, as: Component = "h2", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-2xl md:text-3xl lg:text-4xl font-medium tracking-tighter text-stone-900 leading-snug", className)}
      {...props}
    />
  );
}

export function SectionHeading({ className, as: Component = "h3", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-xs uppercase tracking-[0.2em] font-medium text-stone-400", className)}
      {...props}
    />
  );
}

export function Body({ className, as: Component = "p", ...props }: TypographyProps) {
  return <Component className={cn("text-base md:text-lg text-stone-500 font-light leading-relaxed max-w-[60ch]", className)} {...props} />;
}



export function Meta({ className, as: Component = "span", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-sm text-stone-400 font-light", className)}
      {...props}
    />
  );
}

export function Annotation({ className, as: Component = "span", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("font-mono text-[11px] uppercase tracking-wider text-stone-400", className)}
      {...props}
    />
  );
}

export function Quote({ className, as: Component = "blockquote", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-xl md:text-2xl lg:text-3xl font-light italic text-stone-600 leading-snug", className)}
      {...props}
    />
  );
}
