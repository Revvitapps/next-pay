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
  duration = 1.2,
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
      ? { x: -48, y: 0 }
      : variant === 'right'
        ? { x: 48, y: 0 }
        : variant === 'down'
          ? { x: 0, y: -36 }
          : variant === 'fade'
            ? { x: 0, y: 0 }
            : { x: 0, y: 36 };

  const adjustedOffset = isMobile ? { x: offset.x * 0.55, y: offset.y * 0.55 } : offset;
  const adjustedDuration = isMobile ? Math.max(0.65, duration * 0.65) : duration;
  const viewportAmount = isMobile ? 0.18 : 0.25;

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? false : { opacity: 0, ...adjustedOffset }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: viewportAmount }}
      transition={{ duration: adjustedDuration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
