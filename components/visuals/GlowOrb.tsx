import { cn } from '@/lib/utils';

type GlowOrbProps = {
  className?: string;
  colorClassName?: string;
};

export function GlowOrb({ className, colorClassName }: GlowOrbProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute rounded-full blur-3xl',
        colorClassName ?? 'bg-[#46a7a6]/20',
        className
      )}
    />
  );
}
