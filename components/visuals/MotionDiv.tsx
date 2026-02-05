'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { type ReactNode } from 'react';
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

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
