'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { type ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type MotionDivProps = {
  className?: string;
  children: ReactNode;
  delay?: number;
  duration?: number;
  variant?: 'up' | 'down' | 'left' | 'right' | 'fade';
  once?: boolean;
};

export default function MotionDiv({
  className,
  children,
  delay = 0,
  duration = 0.72,
  variant = 'up',
  once = true
}: MotionDivProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const offset =
    variant === 'left'
      ? { x: -26, y: 0 }
      : variant === 'right'
        ? { x: 26, y: 0 }
        : variant === 'down'
          ? { x: 0, y: -22 }
          : variant === 'fade'
            ? { x: 0, y: 0 }
            : { x: 0, y: 22 };

  const adjustedOffset = isMobile ? { x: offset.x * 0.5, y: offset.y * 0.5 } : offset;
  const adjustedDuration = isMobile ? Math.max(0.42, duration * 0.85) : duration;
  const viewportAmount = isMobile ? 0.12 : 0.18;

  if (isMobile || shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...adjustedOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: viewportAmount }}
      transition={{ duration: adjustedDuration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
