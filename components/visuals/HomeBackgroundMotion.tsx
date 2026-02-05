'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function HomeBackgroundMotion() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 34,
    damping: 22,
    mass: 0.65
  });

  const bgX = useTransform(smoothScrollY, [0, 2000], [-90, 90]);
  const bgY = useTransform(smoothScrollY, [0, 2000], [-12, 32]);
  const bgRotate = useTransform(smoothScrollY, [0, 2000], [-2.2, 2.2]);
  const bgOpacity = useTransform(smoothScrollY, [0, 1400], [0.34, 0.26]);
  const sheenX = useTransform(smoothScrollY, [0, 1800], ['-18%', '18%']);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -inset-6"
        initial={shouldReduceMotion ? false : { opacity: 0, rotate: -8, scale: 0.92 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-image.jpeg')",
            scale: 0.94,
            rotate: shouldReduceMotion ? 0 : bgRotate,
            x: shouldReduceMotion ? 0 : bgX,
            y: shouldReduceMotion ? 0 : bgY,
            opacity: shouldReduceMotion ? 0.28 : bgOpacity
          }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(110deg, rgba(34,211,238,0.02) 10%, rgba(255,255,255,0.08) 45%, rgba(34,211,238,0.02) 75%)',
          backgroundSize: '200% 200%',
          x: shouldReduceMotion ? 0 : sheenX,
          opacity: 0.07
        }}
      />

      <div className="absolute inset-0 bg-[#05060A]/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_16%,rgba(34,211,238,0.2),transparent_42%)]" />
    </div>
  );
}
